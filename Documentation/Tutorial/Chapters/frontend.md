<details>
<summary>
<h3>

Importing the dependencies.

</h3>
</summary>
<p>

We need to import the [Reach Standard Library](https://docs.reach.sh/frontend/#js_stdlib.withDisconnect) module for Javascript.

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

<details>
<summary>
<h3>

Adding a `Creator` `Participant` Test Account.
</h3>
</summary>
<p>

We will use the stdlib to create a test account with a starting balance of 100 network tokens.

```javascript
// generate starting balance
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accCreator = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>

<details>
<summary>
<h3>

Creating a nft with [launchtoken](https://docs.reach.sh/frontend/#js_launchToken)

</h3>
</summary>
<p>

If we take a look at `index.rsh` we see that the `Creator`.`getSale` function expects an `nftId`, a `minBid` and `lenInBlocks` as parameters.

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

<details>
<summary>
<h3>

Connecting the `Creator` `Participant` to the Backend.

</h3>
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

> Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh).

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

Ass you recall, the `seeBid` function from the [`backend`](4.AddingALocalStep/index.rsh) sends an `Address` and a `UInt` to the frontend.

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
7. Adding it all up, this is how the [`index.mjs`](4.AddingALocalStep/index.mjs) interface looks.

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
