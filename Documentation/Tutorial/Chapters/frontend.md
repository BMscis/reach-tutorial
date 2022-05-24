<ol>
<li>
<details>
<summary>
<h3>

Importing the dependencies.

</h3>

We need to import the [Reach Standard Library](https://docs.reach.sh/frontend/#js_stdlib.withDisconnect) module for JavaScript.
</summary>
<p>


```javascript
import { loadStdlib } from '@reach-sh/stdlib';
```
> `loadStdlib` is a function that will load the standard library dynamically based on the [`REACH_CONNECTOR_MODE`](https://docs.reach.sh/tool/#cmd_REACH_CONNECTOR_MODE) environment variable.

> You can also pass in a `REACH_CONNECTOR_MODE` variable directly to `loadStdlib` if you want to override the default.

```javascript
// connector can be 'ETH', 'ALGO', or 'CFX'
const stdlib = await loadStdlib("ALGO");
```

We also need to import the backend.

- Once we run :
```shell
./reach compile
```
Reach will transpile the `index.rsh` file to `index.main.mjs` and output it to `build/index.main.mjs`. The `index.main.mjs` file will contain all the code we need to interact with our backend contract. We can now import `index.main.mjs` into our application

```javascript
import * as backend from './build/index.main.mjs';
```
</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Adding code to [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/1.ImportingDependencies/index.mjs).
</h3>

Let's add what we have done so far into the [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/1.ImportingDependencies/index.mjs).
</summary>
<p>

> This is how it looks.

```javascript
//++ Add Import reach stdlib
import { loadStdlib } from '@reach-sh/stdlib';

//++ Add Import contract backend
import * as backend from './build/index.main.mjs';

//++ Add Load stdlib
const stdlib = loadStdlib();
```
</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Adding a `Creator` `Participant` Test Account.
</h3>

Let's add a test account to our [`index.mjs`]((https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/2.AddingAParticipantTestAccount/index.mjs)) file.
</summary>
<p>

We will use reach standard library to create a test account with a starting balance of 100 network tokens.

```javascript
//++Add generate starting balance
const startingBalance = stdlib.parseCurrency(100);

//++Add create test account
const accCreator = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Creating a nft with [launchtoken](https://docs.reach.sh/frontend/#js_launchToken)

</h3>

Adding an nft to our [`index.mjs`]((https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/3.CreatingANFT/index.mjs)) file.
</summary>
<p>

If we take a look at `index.rsh` we see that the `Creator`.`getSale` function expects a `nftId`, a `minBid` and `lenInBlocks` as parameters.

> Reach Standard Library provides a [`launchToken`](https://docs.reach.sh/frontend/#js_launchToken) function that can handle creating a network token.

```javascript
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });
```
Let's decipher the parameters :
- `Account` = `launchToken` expects the account of the creator of the token. In our instance, `accCreator` is the creator of the token.
- `name` = `launchToken` expects the name of the token. In our instance, `bumple` is the name of the token.
- `sym` = `launchToken` expects the symbol of the token. In our instance, `NFT` is the symbol of the token.
- `opts` = `launchToken` expects an object of options if any. In our instance, `{ supply: 1 }` is the option since we only require unique instance of the NFT.

</p>
</details>        
</li>
<li>

<details>
<summary>
<h3>

Connecting the `Creator` `Participant` to the Backend.

</h3>

Let's see how to connect the `Creator` `Participant` to the backend and add it into our [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/4.ConnectingTheCreatorToTheBackend/index.mjs).
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

We can now connect to the backend `Creator` interface with :
</summary>
<p>

```javascript
//++ Add setting up the `Creator` interface.
await ctcCreator.participants.Creator({
    // Specify Creator interact interface here
})
```
> `await ctcCreator.participants.Creator` will connect the backend `Creator` interface with the `accCreator`.

> Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh).
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Implementing the `getSale` function.
</H4>

`getSale` function requires three parameters : `nftId`, `minBid` and `lenInBlocks`.
</summary>
<p>

```javascript
//++ Add nft params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
lenInBlocks = 10;
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

Let's add the `params` object to the `Creator` interface.
</summary>
<p>

```javascript
//++ Add setting up the `Creator` interface.
await ctcCreator.participants.Creator({
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

Connecting the `Creator` `Participant` to the frontend.
</summary>
<p>

Ass you recall, the `seeBid` function from the [`backend`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh) sends an `Address` and a `UInt` to the frontend.

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
    
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Adding the `showOutcome` function to the frontend.
</H4>

Connecting the `Creator` `Participant` to the frontend.
</summary>
<p>

The `showOutcome` function will notify the frontend, when the contract is ready to begin the auction.

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

// nft asset.
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

//++ Add connect account to backend contract.
const ctcCreator = accCreator.contract(backend);

//++ Add nft params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
lenInBlocks = 10;

//++ Add putting them in an object.
const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
};

//++ Add setting up the `Creator` interface.
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
</li>

</ol>
</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Adding a `Bidder` Test Account.
</h3>

This how a bidder test account will look like.
</summary>
<p>

Let's create a test account for the `Bidder` `api` just as we did with the `Creator`.

```javascript
// ++ Add test currrency.
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accBidder = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Connecting the `Bidder` `API` to the Backend.

</h3>

This is how the `Bidder` will interact with the contract.
</summary>
<p>

<ol>
<li>
<details>
<summary>
<H4>

Connecting to the Contract.
</H4>

Let's connect the `Bidder` to the backend.
</summary>
<p>


In order to connect the `Bidder` `API` to the backend, we need to get the contract `address` that was created by the `Creator` :

```javascript
// remember this line
const ctcCreator = accCreator.contract(backend);
```
> Reach provides a [`ctc.getInfo`](https://docs.reach.sh/frontend/#js_getInfo) function that returns the contract address.

```javascript
const ctc = accBidder.contract(backend, ctcCreator.getInfo());
```
- Here we are calling the `accBidder.contract` function and passing the backend and contract address.
</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Accepting the token.
</H4>

The `Bidder` will have to accept the token in order transact with the contract.
</summary>
<p>


The `Bidder` must also allow their account to accept the NFT Token.
Reach provides a [`tokenAccept`](https://docs.reach.sh/frontend/#js_tokenAccepted) function that does just that.

```javascript
await acc.tokenAccept(nftId);
```
- Here we are calling the `tokenAccept` function and passing the `nftId` of the token.
</p>
</details>
</li>

<li>
<details>
<summary>
<h3>

Adding A Bidder Interface.
</h3>

We are now ready to add a `Bidder` interface to the frontend to test the auction.
</summary>
<ol>

<li>
<details>
<summary>
<H4>

Adding an Auction Function.
</H4>

Creating test bidders.
</summary>
<p>


We are going to put all our `Bidders` into an `async` function and allow each `Bidder` to connect to the backend contract. But before we do that, let's look at how an actor other than the `Creator`/Deployer connects to the backend contract.

```javascript

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
        const ctc = accBidder.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));

        console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        try {
            const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);
            console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}. with ${stdlib.formatCurrency(latestBid)}`);
        } catch (e) {
            console.log(`${who} failed to bid, because ${e} is too high`);
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

```
- `let done = false;` will be used to call wait on the contract until the auction is over.

- `const bidders = [];`

- `const startBidders` will be called by the Creator once the auction is ready.

-  `let bid = minBid;`

- `const runBidder()`

- `const inc = stdlib.parseCurrency(Math.random() * 10);` uses reach to generate a random number between 0 and 10.

- `bid = bid.add(inc);` adds the random number to the current bid to create a unique bid for each `Bidder`.

- `const accBidder = await stdlib.newTestAccount(startingBalance);` creates a new account for the `Bidder`.

- `accBidder.setDebugLabel(who);` sets the debug label for the `Bidder`, with a unique `Bidder` name.

- `await accBidder.tokenAccept(nftId);` allows the `Bidder` accepts the NFT from the Creator.

- `bidders.push([who, accBidder]);` adds the `Bidder` name and `Bidder` account to the `const bidders = [];` array we created.

- `const ctc = accBidder.contract(backend, ctcCreator.getInfo());` connects the `Bidder` to the contract deployed by the `Creator` by using reach standard library function 
[`getInfo()`](https://docs.reach.sh/frontend/#js_getInfo).
- `const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));` gets `Bidder` balance from the `Bidder` account.

- `console.log("${who} decides to bid ${stdlib.formatCurrency(bid)}.");` prints the `Bidder` name and the bid they are going to make.

- `console.log("${who} balance before is ${await getBal()}");` prints the `Bidder` name and the balance before the bid.

- `try {` we will use a try statement because the `backend` `Bidder.bid` function checks whether the bid is larger than the last bid and returns an error if it's not larger.

> Backend
    ```javascript
    assume(bid > lastPrice, "bid is too low");
    require(bid > lastPrice, "bid is too low");
    ```
- `const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);` calls the `backend` `Bidder.bid` function and `await`s the `latestBid`, `lastBidder`, and the `lastBid` from the backend. 

> Backend
    ```javascript
    ((bid, notify) => {
        require(bid > lastPrice, "bid is too low");
        notify([bid,highestBidder, lastPrice]);
        if ( ! isFirstBid ) {
            transfer(lastPrice).to(highestBidder);
        }
        Creator.interact.seeBid(this, bid);
        return [this, bid, false];
    })
    ```
- `console.log("${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}.");` prints the `Bidder` name and the `Bidder` name of the last `Bidder` who bid.

- `console.log("${who} failed to bid, because ${e} is too high");`. If the bid is to low, the `try` statement will catch the error from the backend.

- `console.log("${who} balance after is ${await getBal()}");` prints the `Bidder` name and the balance after the bid.

To test the auction, let's add three `Bidder`s, **Alice**, **Bob**, and **Claire**.

```javascript
    await runBidder('Alice');
    await runBidder('Bob');
    await runBidder('Claire');
```

</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Running the Auction
</H4>

How will we run the auction ?
</summary>
<p>

Remember the creator interface, we are going to add the `startBidders` function onto the `Creator.auctionReady` function so that once the auction is ready, we can start the auction.

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
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Creator sees that the auction is ready.");
        startBidders();
    } 
})
```

</p>
</details>
</li>
</ol>
</details><details>
<summary>
<h3>

Adding A Bidder Interface.
</h3>

We are now ready to add a `Bidder` interface to the frontend to test the auction.
</summary>
<ol>

<li>
<details>
<summary>
<H4>

Adding an Auction Function.
</H4>

Creating test bidders.
</summary>
<p>


We are going to put all our `Bidders` into an `async` function and allow each `Bidder` to connect to the backend contract. But before we do that, let's look at how an actor other than the `Creator`/Deployer connects to the backend contract.

```javascript

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
        const ctc = accBidder.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));

        console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        try {
            const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);
            console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}. with ${stdlib.formatCurrency(latestBid)}`);
        } catch (e) {
            console.log(`${who} failed to bid, because ${e} is too high`);
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

```
- `let done = false;` will be used to call wait on the contract until the auction is over.

- `const bidders = [];`

- `const startBidders` will be called by the Creator once the auction is ready.

-  `let bid = minBid;`

- `const runBidder()`

- `const inc = stdlib.parseCurrency(Math.random() * 10);` uses reach to generate a random number between 0 and 10.

- `bid = bid.add(inc);` adds the random number to the current bid to create a unique bid for each `Bidder`.

- `const accBidder = await stdlib.newTestAccount(startingBalance);` creates a new account for the `Bidder`.

- `accBidder.setDebugLabel(who);` sets the debug label for the `Bidder`, with a unique `Bidder` name.

- `await accBidder.tokenAccept(nftId);` allows the `Bidder` accepts the NFT from the Creator.

- `bidders.push([who, accBidder]);` adds the `Bidder` name and `Bidder` account to the `const bidders = [];` array we created.

- `const ctc = accBidder.contract(backend, ctcCreator.getInfo());` connects the `Bidder` to the contract deployed by the `Creator` by using reach standard library function 
[`getInfo()`](https://docs.reach.sh/frontend/#js_getInfo).
- `const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));` gets `Bidder` balance from the `Bidder` account.

- `console.log("${who} decides to bid ${stdlib.formatCurrency(bid)}.");` prints the `Bidder` name and the bid they are going to make.

- `console.log("${who} balance before is ${await getBal()}");` prints the `Bidder` name and the balance before the bid.

- `try {` we will use a try statement because the `backend` `Bidder.bid` function checks whether the bid is larger than the last bid and returns an error if it's not larger.

> Backend
    ```javascript
    assume(bid > lastPrice, "bid is too low");
    require(bid > lastPrice, "bid is too low");
    ```
- `const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);` calls the `backend` `Bidder.bid` function and `await`s the `latestBid`, `lastBidder`, and the `lastBid` from the backend. 

> Backend
    ```javascript
    ((bid, notify) => {
        require(bid > lastPrice, "bid is too low");
        notify([bid,highestBidder, lastPrice]);
        if ( ! isFirstBid ) {
            transfer(lastPrice).to(highestBidder);
        }
        Creator.interact.seeBid(this, bid);
        return [this, bid, false];
    })
    ```
- `console.log("${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}.");` prints the `Bidder` name and the `Bidder` name of the last `Bidder` who bid.

- `console.log("${who} failed to bid, because ${e} is too high");`. If the bid is to low, the `try` statement will catch the error from the backend.

- `console.log("${who} balance after is ${await getBal()}");` prints the `Bidder` name and the balance after the bid.

To test the auction, let's add three `Bidder`s, **Alice**, **Bob**, and **Claire**.

```javascript
    await runBidder('Alice');
    await runBidder('Bob');
    await runBidder('Claire');
```

</p>
</details>
</li>

<li>
<details>
<summary>
<H4>

Running the Auction
</H4>

How will we run the auction ?
</summary>
<p>

Remember the creator interface, we are going to add the `startBidders` function onto the `Creator.auctionReady` function so that once the auction is ready, we can start the auction.

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
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Creator sees that the auction is ready.");
        startBidders();
    } 
})
```

</p>
</details>
</li>
</ol>
</details>
</li>
</ol>
</p>
</details>
</li>
<li>
<details>
<summary>
<h3>

Adding it all up.
</h3>

Let's add what we have done so far into an [`index.mjs`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/7.AddingBidderInterface/index.mjs).
</summary>
<p>

We have covered alot, but you don't have to understand everything. Let's try to run the auction and see what happens.

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

// nft asset.
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

// connect account to backend contract.
const ctcCreator = accCreator.contract(backend);

// nft params expected by the `getSale` function.
const nftId = theNFT.id
const minBid = stdlib.parseCurrency(2);
lenInBlocks = 10;

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
        const ctc = accBidder.contract(backend, ctcCreator.getInfo());
        const getBal = async () => stdlib.formatCurrency(await stdlib.balanceOf(accBidder));

        console.log(`${who} decides to bid ${stdlib.formatCurrency(bid)}.`);
        console.log(`${who} balance before is ${await getBal()}`);
        try {
            const [ latestBid,lastBidder, lastBid ] = await ctc.apis.Bidder.bid(bid);
            console.log(`${who} out bid ${lastBidder} who bid ${stdlib.formatCurrency(lastBid)}. with ${stdlib.formatCurrency(latestBid)}`);
        } catch (e) {
            console.log(`${who} failed to bid, because ${e} is too high`);
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

// setting up the `Creator` interface.
await ctcCreator.participants.Creator({
    //  get sale function.
    getSale: () => {
        return params;
    },
    //  seeBid function.
    seeBid: (who, amt) => {
        let newBidder = stdlib.formatAddress(who)
        let newBid = stdlib.formatCurrency(amt)
        console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
    },
    //  showOutcome function.
    showOutcome: (winner, amt) => {
        let newWinner = stdlib.formatAddress(winner)
        let newAmt = stdlib.formatCurrency(amt)
        console.log(`Creator saw that ${newWinner} won with ${newAmt}`)
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Creator sees that the auction is ready.");
        startBidders();
    } 
})

```
</p>
</details>
</li>
</ol>