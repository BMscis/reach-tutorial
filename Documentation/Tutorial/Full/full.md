<details>
<summary>
<h1>

[NFT AUCTION WITH REACH](https://docs.reach.sh/#reach-top)
</h1>

In this tutorial, we will deploy a reach contract that will be imported from the frontend (javascript).

</summary>
<p>

Let's summarize what we will be implementing.

1. A `Creator` will initialize the contract and provide three variables:

    - An NFT Token.
    - An initial bid.
    - A time limit.

2. Once these variables are provided, the `Creator` will then publish the contract onto the blockchain.

3. Thereafter, a `Bidder` will be able to connect to the contract and view the `token_id`, `initial_bid`, and `time_limit`.

4. If the `Bidder` accepts the wager, the `Bidder` will place a bid and call the backend.

5. The auction will continue until time-lapse hits.

6. At timeout :
    - The winner will receive the NFT.
    - The `Creator` will receive the highest bid.
    - All `Bidders` who lost the auction will receive their funds back.

> NOTE :
> The `Creator` is anyone who deploys the contract.

> The `Creator` is a participant class that can take any acceptable variable name.
</p>
</details>

<details>
<summary>
<h2>

Implementing the backend.
</h2>

We create and  `index.rsh` file that will house the reach contract.
</summary>
<p>

<details>
<summary>
<h3>
        
Adding Reach [Expressions](https://docs.reach.sh/rsh/appinit/#ref-programs-appinit-exprs).
        
</h3>

Here we are going to add the various reach [initialization](https://docs.reach.sh/rsh/appinit/#init)  options.
</summary>
<p>

<details>
<summary>
<h4>

Creating a [Reach App](https://docs.reach.sh/rsh/module/#rsh_Reach.App)

</h4>
</summary>
<p>

**Reach.App** will contain all the code that we will need to create our contract.
> Let's add this into an `index.rsh` file.
```javascript
'reach 0.1';

export const main = Reach.App(() => {
    //setoptions
})

init();
```
***Let's go through the code to see what is happening.***
+ `reach 0.1;` indicates that this is a Reach program. You'll always have this at the top of every program.

+ `export const main` defines the main export from the program. When you compile, this is what the compiler will look at.

+  `init()` marks the deployment of the Reach program, which allows the program to start doing things.

</p>
</details>

<details>
<summary>
<h4>

Adding a [Participant](https://docs.reach.sh/model/#term_participant)
</h4>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DApp and is associated with an account on the consensus network.

</summary>
<p>

A **Participant** is a class that represent an account connected to the contract as well as a user connected to the fronteend.

```javascript
const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
});
```
***In this instance :***

- We are creating a `Participant` class called `Creator`. 
- The `Creator` will be the deployer of the contract onto the blockchain.

    Let's add the `Creator` into `index.rsh`.

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingAParticipant/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {

    //setoptions.
    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
    });

    init();
});
```
> Note that functions added onto the Participant can only be called by the backend.

</p>
</details>

<details>
<summary>
<h4>

Adding a `Participant` Interface.
</h4>

In the next step, we'll add the creator interface that will interact with
the frontend.

</summary>
<p>

- In order to implement the **Auction** the `Creator` will have to  provide the following :

    > + An NFT token to be auctioned.
    > + A starting price for the auction.
    > + A duration for the auction.

- Once the `Creator` provides this information, any `Bidder` can view the deployed contract on the blockchain.

***Let's add a function `getSale` in `index.rsh` that does just that.***

1. The `Creator` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.
    ```javascript
    //++ Add getSale function.
    getSale: Fun([], Object({
        nftId: Token,
        minBid: UInt,
        lenInBlocks: UInt,
    })),
    ```
    Let's decipher the `getSale()` function :
    > - `Fun([], UInt)` is a Reach function that takes no arguments and returns a UInt.

    > - `Object({nftId: Token,minBid: UInt,lenInBlocks: UInt,})` is a Reach object that has the following properties :
    
    > - `nftId` is `Type` token.
    > - `minBid` is `Type` UInt.
    > - `lenInBlocks` is `Type` UInt.

- Therefore, the `getSale()` function will be called by the backend, and it will expect the frontend to return an `Object` with the following properties :
    - `nftId`.
    - `minBid`.
    - `lenInBlocks`.

2. Once the contract has been published onto the blockchain, we will need to notify the `Creator`'s frontend that the auction is ready to be deployed.

    ```javascript
    //++ Add auctionReady function.
    auctionReady: Fun([], Null)
    ```
3. We also need to allow the Creator to see each bid in the auction.

    - SeeBid sends a `Bidder`.`Address` and the latest bid `UInt` to the frontend.

    ```javascript
    //++ Add seeBid function.
    seeBid: Fun([Address, UInt], Null),
    ```

4. Finally, we will also allow the creator to see the outcome of the auction.

    ```javascript
    //++ Add showOutcome function.
    seeOutcome: Fun([], Object({
        winner: Address,
        bid: UInt,
    })),
    ```
    > `SeeOutcome` sends the winner `Address` and the bid `UInt` to the frontend.

Let's add these function into the `index.rsh` file.

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingAParticipantInterface/index.rsh)

> Add this to index.rsh.

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
        //++ Add getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //++ Add auctionReady function.
        auctionReady: Fun([], Null),

        //++ Add seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //++ Add showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    init();
});
```
___


</p>
</details>

<details>
<summary>
<h4>

Adding a `Bidder` Interface.
</h4>

The `Bidder` is an [API](https://docs.reach.sh/rsh/appinit/#rsh_API) that allows the frontend to interact with the backend.
</summary>
<p>

> This is how the function looks.

```javascript
//++ Add this function to the Bidder interface.

bid: Fun([UInt], Tuple(UInt,Address, UInt)),
```
This is how it looks.

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingAQBidderInterface/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
        //++ Add getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //++ Add auctionReady function.
        auctionReady: Fun([], Null),

        //++ Add seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //++ Add showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //++ Add this function to the Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();
});
```

Let's break down the `bid()` function :
- It takes in a `[UInt]` from the frontend, which is the bid amount.
- It returns a `Tuple(UInt,Address, UInt)` from the backend, which we will implement later.

</p>
</details>



</p>
</details>

<details>
<summary>
<h3>

Working with [Reach Steps](https://docs.reach.sh/rsh/step/).
</h3>
</summary>
<p>

<details>
<summary>
<h4>

[Local Step](https://docs.reach.sh/rsh/step/)
</h4>

A local step refers to an action taken by a single `Participant` outside the blockchain.

Each reach program is in a [local step](https://docs.reach.sh/rsh/local/) after `initialization`.
</summary>
<p>

Since we are building an nf-auction, we need a nft to be auctioned. 

As described in the beginning, we will need :

- Nft Id
- Nft price
- Auction duration

All this information will be provided by the `Creator` `Participant`. To make sure that the `Creator` is the only one who can provide this information, we will use a `Local Step` to do so.

`Reach` provides us with an [`only`](https://docs.reach.sh/rsh/step/#ref-programs-only-step) method that we can use to do so.

```javascript
Creator.only(() => {
    const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
});
```
Let's break it down:
- `Creator.only(() => {...})` is a `Local Step` that only allows the `Creator` to access the `getSale()` function we created above.

- `{nftId, minBid, lenInBlocks}` is the declassified `Object` that is returned from the `getSale()` function.

- The [declassify](https://docs.reach.sh/rsh/local/#declassify) function makes the return value known.

- The [interact](https://docs.reach.sh/rsh/local/#interact) function notifies the frontend and awaits for a response.

Now that we have the `nftId`, `minBid`, and `lenInBlocks`, we can publish this information onto the contract.
</p>
</details>

<details>
<summary>
<h4>

[Consensus Step](https://docs.reach.sh/rsh/consensus/)
</h4>

A consensus steps occurs on the blockchain network for all participants to see.
</summary>
<p>

</p>
</details>

After the `init()` reach is always in a `local step`. In order to achieve 
consensus, we need to call [consensus functions](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) :

- [Publish](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) can be used to deploy information to the contract and will push the contract into a consensus state.
- [Pay](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout), which is paying fees to the contract will also push the contract into a consensus state.

Since we now know the `nftId`, `minBid`, and `lenInBlocks`, we can publish this information onto the contract.

```javascript
Creator.publish(nftId, minBid, lenInBlocks);
```

In order to get back into a local step and allow the Creator to send the nft into the contract, we will use [`commit`](https://docs.reach.sh/rsh/consensus/#rsh_commit) which pushes the reach into a local step.

We will also specify the number of tokens to send to the contract. We will set the amount to one since it is a unique nft, then pay it to the contract.

```javascript
const amt = 1;

commit();

Creator.pay([[amt, nftId]]);

Creator.interact.auctionReady();
```
Then finally, we will `interact` with the frontend to notify the `Creator` that the auction is ready.


</p>
</details>

<details>
<summary>
<h3>

Adding [Parallel Reduce](https://docs.reach.sh/rsh/consensus/#parallelreduce).

</h3>

Here we implement a [parallel reduce](https://docs.reach.sh/rsh/consensus/#parallelreduce) to run the auction until auction time runs out.
</summary>
<p>

1. All `Bidder`s will be competing against each other to make the highest bid while simultaneously racing against the auciton time. 

2. We will use a while loop that keeps the auction active as long as the auction time is not over.

3. Every time a bidder bids higher than the previous bid price, the previous bidder will be reimbursed.

4. At the end, the parallel reduce will force a single result.

Let's see how this will look.

> We first create a list that will be used in the parallel reduce.

```javascript
const [highestBidder, lastPrice, isFirstBid] = [0, 0, 0];
```
- Every round of the loop, we will be checking and setting the highest bid, the highest bidder address and whether it is the first bid.

> Since the `Creator` will be the first bidder, we will set the `highestBidder` to the `Creator` address. Set the `lastPrice` to the `minBid` and `isFirstBid` to `true`.

```javascript
const [highestBidder, lastPrice, isFirstBid] = [Creator, minBid, true];
```

> Now let's plug this into the `parallelReduce` function.

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
```
1. [Invariant](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce.invariant)

    A while loop can execute a block of code as long as a specified condition is true. Thus, the invariant value should be a `true` value that is set at the start of a loop and changes only when the auction is done.

    ```javascript
    const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
    ```
    - Here, the invariant is true as long as the balance of the NFT is equal to one, thus the contract still holds the nft.
    - It also checks whether it is the first bid or not. If so then the contract balance is 0, otherwise the contract balance is equal to the last bid price.

2. [while](https://docs.reach.sh/rsh/consensus/#while)

    A while loop will run until the last consensus time is less than the end time.

    ```javascript
    const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
        .while(lastConsensusTime() < end)
    ```
    While the loop is `true`, let's accept bids. Parallel reduce uses `components` to allow `participants` and `api`'s to individually access functions.

3. [`API's`](https://docs.reach.sh/rsh/consensus/#p_27)

    Here, we use [`.api()`](https://docs.reach.sh/rsh/consensus/#p_27) to allow bidders to place bids.

    - An `API_EXPR` is used to access the `Bidder` api `bid` function.

    ```javascript
    .api(Bidder.bid ....
    ```
    - An [`ASSUME_EXPR`] evaluates a claim that resolves to true.

    ```javascript
    .api(Bidder.bid,
    ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
    ```
    > Here we are testing whether the bid is higher than the last price.

    - `PAY_EXPR` is used to pay the wager to the contract.

    ```javascript
    .api(Bidder.bid,
    ((bid) => { assume(bid > lastPrice, "bid is too low"); })
    ((bid) => bid),
    ```

    - `CONSENSUS_EXPR` is used to update the consensus state of the contract to notify the bidder of the bid.

    ```javascript
    .api(Bidder.bid,
        ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
        ((bid) => bid),
        ((bid, notify) => {
            require(bid > lastPrice, "bid is too low");
            notify([bid,highestBidder, lastPrice]);
            if ( ! isFirstBid ) {
                transfer(lastPrice).to(highestBidder);
            }
            Creator.interact.seeBid(this, bid);
            return [this, bid, false];
        })
    )
    ```
    - Here we are using [require](https://docs.reach.sh/rsh/consensus/#rsh_require) to ensure that the bid is higher than the last placed bid.

    - We will `notify` the bidder frontend of the `bid` placed, the `highestBidder` and the `lastPrice`.

    - We are checking if `isFirstBid` is `false`. If it is, we will reimburse the `lastPrice` back to the last bidder.

    - We are also interaction with the `Creator` frontend to notify it of the bid.

    - We finally return the `bidder`, the `bid` and setting `isFirstBid` to false.

4. Setting auction [timeout](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce.timeout).

    Reach `timeout` will be called once the auction time reaches. `timeout` takes a parameter `blocktime` and a function once the timeout is reached.

    ```javascript
    .timeout(absoluteTime(end), () => {
        Creator.publish()
        return [highestBidder, lastPrice, isFirstBid]; 
    });
    ```

    - [absoluteTime](https://docs.reach.sh/rsh/compute/#rsh_absoluteTime) gets the absolute time of the blockchain.
    - Once the auction time ends, the `Creator` will `publish` the information onto the blockchain and returns the `highestBidder`, `lastPrice` and `isFirstBid`.

This is how the full parallel reduce looks.

```javascript

const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
    .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
    .while(lastConsensusTime() < end)
    .api(Bidder.bid,
    ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
    ((bid) => bid),
    ((bid, notify) => {
        require(bid > lastPrice, "bid is too low");
        notify([bid,highestBidder, lastPrice]);
        if ( ! isFirstBid ) {
            transfer(lastPrice).to(highestBidder);
        }
        Creator.interact.seeBid(this, bid);
        return [this, bid, false];
    })
    ).timeout(absoluteTime(end), () => {
        Creator.publish()
        return [highestBidder, lastPrice, isFirstBid]; 
    });

</p>
</details>

<details>
<summary>
<h3>

Setting up onwership [Transfer](https://docs.reach.sh/rsh/consensus/#rsh_transfer)
</h3>

Transferring the NFT to the winner of the auction.
</summary>
<p>

[Transfer](https://docs.reach.sh/rsh/consensus/#transfer) is a consensus step that transfers ownership of contract tokens.

After the contract has determined the winner of the auction, we transfer the NFT to the winner.

```javascript
transfer(amt, nftId).to(highestBidder);
```

Then we transfer the highest bid, to the `Creator` of the nft.

```javascript
if ( ! isFirstBid ) { transfer(lastPrice).to(Creator); }
```
Finally, we notify the `Creator` frontend of the auction results.

```javascript
Creator.interact.showOutcome(highestBidder, lastPrice);
```
`commit` back to a local state and `exit` the contract.

```javascript
commit();
exit();
```
</p>
</details>

</p>
</details>

<details>
<summary>
<h2>

Implementing the frontend.
</h2>

We create an `index.mjs` file to use as a frontend test.
</summary>
<p>

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

Adding a `Creator` `Participant`  Test Account.
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

> Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingARLocalStep/index.rsh).

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

</p>
</details>