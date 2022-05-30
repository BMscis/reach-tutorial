// Import reach stdlib
import { loadStdlib } from '@reach-sh/stdlib';

// Import contract backend
import * as backend from './build/index.main.mjs';

// Load stdlib
const stdlib = loadStdlib();

// generate starting balance
const startingBalance = stdlib.parseCurrency(100);

// create test account
const accCreator = await stdlib.newTestAccount(startingBalance);

// NFT asset.
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

//++ Add connect account to backend contract.
const ctcCreator = accCreator.contract(backend);

//++ Add NFT params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
let lenInBlocks = 10;

//++ Add putting them in an object.
const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
};

//++ Add setting up the `Auctioneer` interface.
await ctcCreator.participants.Auctioneer({
    // ++ Add get sale function.
    getSale: () => {
        return params;
    },
    // ++ Add seeBid function.
    seeBid: (who, amt) => {
        let newBidder = stdlib.formatAddress(who)
        let newBid = stdlib.formatCurrency(amt)
        console.log(`Auctioneer saw that ${newBidder} bid ${newBid}.`);
    },
    // ++ Add showOutcome function.
    showOutcome: (winner, amt) => {
        let newWinner = stdlib.formatAddress(winner)
        let newAmt = stdlib.formatCurrency(amt)
        console.log(`Auctioneer saw that ${newWinner} won with ${newAmt}`)
    }
})