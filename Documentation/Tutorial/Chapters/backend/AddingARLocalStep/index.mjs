import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

// connector can be 'ETH', 'ALGO', or 'CFX'
const stdlib = loadStdlib();


// generate starting balance
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accCreator = await stdlib.newTestAccount(startingBalance);

const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

const ctcCreator = accCreator.contract(backend);

await ctcCreator.participants.Creator({
    // ++ Add get sale function.
    getSale: () => {
        return params;
    },
    // ++ Add seeBid function.
    seeBid: (who, amt) => {
        let newBidder = stdlib.formatAddress(who)
        let newBid = stdlib.formatCurrency(amt)
        console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
    },
    // ++ Add showOutcome function.
    showOutcome: (winner, amt) => {
        let newWinner = stdlib.formatAddress(winner)
        let newAmt = stdlib.formatCurrency(amt)
        console.log(`Creator saw that ${newWinner} won with ${newAmt}`)
    }
})