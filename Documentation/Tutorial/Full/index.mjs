// Import reach stdlib
import { loadStdlib } from '@reach-sh/stdlib';

// Import contract backend
import * as backend from './build/index.main.mjs';

// Load stdlib
const stdlib = loadStdlib();

// generate starting balance
const startingBalance = stdlib.parseCurrency(100);

// create test account
const accAuctioneer = await stdlib.newTestAccount(startingBalance);

// NFT asset.
const theNFT = await stdlib.launchToken(accAuctioneer, "bumple", "NFT", { supply: 1 });

// connect account to backend contract.
const ctcAuctioneer = accAuctioneer.contract(backend);

// NFT params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
let lenInBlocks = 10;

// putting them in an object.
const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
};

//++ Add Bidder Interface.
let done = false;
const bidders = [];
const startBidders = async () => {
    let bid = minBid;
    const runBidder = async (who) => {
        const inc = stdlib.parseCurrency(Math.random() * 10);
        bid = bid.add(inc);

        const accBidder = await stdlib.newTestAccount(startingBalance);
        accBidder.setDebugLabel(who);
        
        await accBidder.tokenAccept(nftId);
        bidders.push([who, accBidder]);
        const ctc = accBidder.contract(backend, ctcAuctioneer.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));

        console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        try {
            console.log(`${who}`)
            //const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);
            //console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}. with ${stdlib.formatCurrency(latestBid)}`);
        } catch (e) {
            console.log(`${who} failed to bid, because the bid is too high`);
        }
        console.log(`${who} balance after is ${await getBal()}`);
    };

    await runBidder('Alice');
    await runBidder('Bob');
    await runBidder('Claire');
    while ( ! done ) {
        await stdlib.wait(1);
    }
};

// setting up the `Auctioneer` interface.
await ctcAuctioneer.participants.Auctioneer({
    //  get sale function.
    getSale: () => {
        return params;
    },
    timeOut: (abs, firstEnd, newEnd,lastCon, lC) => {
        console.log(`Abs:${abs} , FE:${firstEnd}, NE${newEnd}, lastCon${lastCon}, LC${lC}`)
    },
    //  seeBid function.
    seeBid: (who, amt) => {
        let newBidder = stdlib.formatAddress(who)
        let newBid = stdlib.formatCurrency(amt)
        console.log(`Auctioneer saw that ${newBidder} bid ${newBid}.`);
    },
    //  showOutcome function.
    showOutcome: (winner, amt) => {
        let newWinner = stdlib.formatAddress(winner)
        let newAmt = stdlib.formatCurrency(amt)
        console.log(`Auctioneer saw that ${newWinner} won with ${newAmt}`)
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Auctioneer sees that the auction is ready.");
        startBidders();
    } 
})

for ( const [who, acc] of bidders ) {
    const [ amt, amtNFT ] = await stdlib.balancesOf(acc, [null, nftId]);
    console.log(`${who} has ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit} and ${amtNFT} of the NFT`);
}
console.log("IAM HERE+++++++++++++++++++++")
done = true;
console.log("NOW IAM HERE-----------------")