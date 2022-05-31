import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = await loadStdlib("ALGO");
const startingBalance = stdlib.parseCurrency(100);

console.log(`Creating test account for Auctioneer`);
const accCreator = await stdlib.newTestAccount(startingBalance);
let count = 0
console.log(`Having auctioneer create testing NFT`);
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });
const nftId = theNFT.id;
const minBid = stdlib.parseCurrency(2);
const lenInBlocks = 10;
const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
 };

let done = false;
const bidders = [];
const startBidders = async () => {
    let bid = minBid;
    const runBidder = async (who) => {
        const inc = stdlib.parseCurrency(Math.random() * 10);
        bid = bid.add(inc);

        const acc = await stdlib.newTestAccount(startingBalance);
        acc.setDebugLabel(who);
        
        await acc.tokenAccept(nftId);
        bidders.push([who, acc]);
        const ctc = acc.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(acc));

        //console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        //console.log(`${who} balance before is ${await getBal()}`);
        try {
            //const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);
            //console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}. with ${stdlib.formatCurrency(latestBid)}`);
            console.log("Lodging")
        } catch (e) {
            //console.log(`${who} failed to bid, because is too high`);
            console.log("Lodging")
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

const ctcCreator = accCreator.contract(backend);
await ctcCreator.participants.Auctioneer({
    getSale: () => {
        return params;
    },
    auctionReady: () => {
        console.log("Auction ready");
        //startBidders();
    },
    seeBid: (who, amt) => {
        console.log(`Auctioneer saw that ${stdlib.formatAddress(who)} bid ${stdlib.formatCurrency(amt)}.`);
    },
    showOutcome: (winner, amt) => {
        console.log(`Auctioneer saw that ${stdlib.formatAddress(winner)} won with ${stdlib.formatCurrency(amt)}`);
    },
    log: (log) => {
        let logg = JSON.parse(log)
        console.log(`Logger logs: `,logg);
    }
});

for ( const [who, acc] of bidders ) {
    const [ amt, amtNFT ] = await stdlib.balancesOf(acc, [null, nftId]);
    console.log(`${who} has ${stdlib.formatCurrency(amt)} ${stdlib.standardUnit} and ${amtNFT} of the NFT`);
}
done = true;