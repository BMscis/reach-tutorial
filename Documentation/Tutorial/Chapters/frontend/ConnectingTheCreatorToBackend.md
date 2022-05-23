<details>
<summary>
<h4>

Connecting the `Creator` `Participant` to the Backend.

</h4>
</summary>
<p>
Now we will connect the test account to the backend.

```javascript
const ctcCreator = accCreator.contract(backend);
```
> `accCreator.contract(backend);` returns a ***Reach Contract*** that contains the contract address.

2. We can now connect to the backend `Creator` interface with : 

```javascript
await ctcCreator.participants.Creator({
    // Specify Creator interact interface here
})
```
> `await ctcCreator.participants.Creator` will connect the backend `Creator` interface with the `accCreator`.

> Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](AddingARLocalStep/index.rsh).

3. Implementing the `getSale` function.

- `getSale` function requires three parameters : `nftId`, `minBid` and `lenInBlocks`.

```javascript
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
lenInBlocks = 10;
```
- We are getting the `nftId` from the NFT we created earlier.
- The minimum bid is 2 network tokens.
- The number of blocks before the auction ends is 10.

```javascript
const params = { 
nftId:nftId,
minBid:minBid,
lenInBlocks:lenInBlocks,
};
```
- Since the `getSale` function expects an object, we need to create an object with the parameters.

4. Adding `getSale` to the interface.

```javascript
await ctcCreator.participants.Creator({
    // ++ Add get sale function.
    getSale: () => {
        return params;
    },
})
```
5. Adding `seeBid` function to the frontend.

Ass you recall, the `seeBid` function from the [`backend`](AddingARLocalStep/index.rsh) sends an `Address` and a `UInt` to the frontend.

```javascript
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
})
```

6. The `showOutcome` function will notify the frontend, when the contract is ready to begin the auction.

```javascript
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

```
7. Adding it all up, this is how the [`index.mjs`](AddingARLocalStep/index.mjs) interface looks.

```javascript
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
```

</p>
</details>

