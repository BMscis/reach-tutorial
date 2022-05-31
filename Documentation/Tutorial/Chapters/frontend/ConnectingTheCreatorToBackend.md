<details>
<summary>
<h3>

Connecting the `Auctioneer` `Participant` to the Backend.

</h3>

Let's see how to connect the `Auctioneer` `Participant` to the backend and add it into our [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/4.ConnectingTheCreatorToTheBackend/index.mjs).
</summary>
<p>

<ol>
<li>
<details>
<summary>
<h4>
Connecting the test account to the backend.
</h4>

Now we will connect the test account to the backend.
</summary>
<p>

```javascript
//++ Add connect account to backend contract.
const ctcCreator = accCreator.contract(backend);
```
> `accCreator.contract(backend);` returns a ***Reach Contract*** that contains the contract address.
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>
Connecting to the Interface.
</H4>

We can now connect to the backend `Auctioneer` interface with :
</summary>
<p>

```javascript
//++ Add setting up the `Auctioneer` interface.
await ctcCreator.participants.Auctioneer({
    // Specify Auctioneer interact interface here
})
```
> `await ctcCreator.participants.Auctioneer` will connect the backend `Auctioneer` interface with the `accCreator`.

> Before we do that, we need to implement the `Auctioneer` interface that we defined in [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh).
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Implementing the `getSale` function.
</H4>

`getSale` function requires three parameters: `nftId`, `minBid` and `lenInBlocks`.
</summary>
<p>

```javascript
//++ Add NFT params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
let lenInBlocks = 10;
```
- We are getting the `nftId` from the NFT we created earlier.
- The minimum bid is 2 network tokens.
- The number of blocks before the auction ends is 10.


```javascript
//++ Add putting them in an object.
const params = { 
nftId:nftId,
minBid:minBid,
lenInBlocks:lenInBlocks,
};
```
> Since the `getSale` function expects an object, we need to create an object with the parameters.
    
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Adding `getSale` to the interface.
</H4>

Let's add the `params` object to the `Auctioneer` interface.
</summary>
<p>

```javascript
//++ Add setting up the `Auctioneer` interface.
await ctcCreator.participants.Auctioneer({
    // ++ Add get sale function.
    getSale: () => {
        return params;
    },
})
```
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Adding `seeBid` function to the frontend.
</H4>

Connecting the `Auctioneer` `Participant` to the frontend.
</summary>
<p>

Ass you recall, the `seeBid` function from the [`backend`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh) sends an `Address` and a `UInt` to the frontend.

```javascript
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
})
```
    
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Adding the `showOutcome` function to the frontend.
</H4>

Connecting the `Auctioneer` `Participant` to the frontend.
</summary>
<p>

The `showOutcome` function will notify the frontend, when the contract is ready to begin the auction.

```javascript
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

```
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Summing it all up.
</H4>

Adding it all to [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/4.ConnectingTheCreatorToTheBackend/index.mjs).
</summary>
<p>

Adding it all up, this is how the [`index.rhs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh) interface looks.

```javascript
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
```
</p>
</details>
</li>

</ol>
</p>
</details>