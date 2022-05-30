<details>
<summary>
<h1>

[NFT AUCTION](https://github.com/BMscis/reach-tutorial/) WITH [REACH](https://docs.reach.sh/#reach-top)lang.
</h1>

Implementing an NFT auction with REACH on Algorand and Ethereum.
</summary>
<p>
<ul>
<li>
<details>
<summary>
<h2>
Introduction.
</h2>

What we are going to make.
</summary>
<p>

<ol>
<li>
<details>
<summary>
<h3>

Walk Through.
</h3>

Let's summarize what we will be implementing.
</summary>
<p>

1. A `Auctioneer` will initialize the contract and provide three variables:

    - An NFT Token.
    - An initial bid.
    - A time limit.

2. Once these variables are provided, the `Auctioneer` will then publish the contract onto the blockchain.

3. Thereafter, a `Bidder` will be able to connect to the contract and view the `token_id`, `initial_bid`, and `time_limit`.

4. If the `Bidder` accepts the wager, the `Bidder` will place a bid and call the backend.

5. The auction will continue until time-lapse hits.

6. At timeout :
    - The winner will receive the NFT.
    - The `Auctioneer` will receive the highest bid.
    - All `Bidders` who lost the auction will receive their funds back.

> NOTE :
> The `Auctioneer` is anyone who deploys the contract.

> The `Auctioneer` is a participant class that can take any acceptable variable name.

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
<h2>
Implementing the Backend.
</h2>

Let's see how we'll implement the reach backend.
</summary>
<p>

<ol>
<li>
<details>
<summary>
<h3>
        
Adding Reach [Expressions](https://docs.reach.sh/rsh/appinit/#ref-programs-appinit-exprs).
        
</h3>

Here we are going to add the various reach [initialization](https://docs.reach.sh/rsh/appinit/#init) options.
</summary>
<p>

<ol>
<li>

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

</li>
<li>

<details>
<summary>
<h4>

Adding a [Participant](https://docs.reach.sh/model/#term_participant)
</h4>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DApp and is associated with an account on the consensus network.

</summary>
<p>

A **Participant** is a class that represent an account connected to the contract as well as a user connected to the frontend.

```javascript
const Auctioneer = Participant('Auctioneer', {
        //Implement Auctioneer interact interface here.
});
```
***In this instance :***

- We are creating a `Participant` class called `Auctioneer`. 
- The `Auctioneer` will be the deployer of the contract onto the blockchain.

</p>
</details>

</li>

<li>
<details>
<summary>
<h4>

Adding it all to [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/1.AddingAParticipant/index.rsh)
</h4>

Let's add what we have so far into [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/1.AddingAParticipant/index.rsh).
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {

    //++ Add Auctioneer.
    const Auctioneer = Participant('Auctioneer', {
        //Implement Auctioneer interact interface here.
    });

    init();
});
```
> Note that functions added onto the Participant can only be called by the backend.
</p>
</li>
<li>

<details>
<summary>
<h4>

Adding a `Participant` Interface.
</h4>

In the next step, we'll add the auctioneer interface that will interact with
the frontend.

</summary>
<p>

- In order to implement the **Auction** the `Auctioneer` will have to  provide the following :

    > + An NFT token to be auctioned.
    > + A starting price for the auction.
    > + A duration for the auction.

- Once the `Auctioneer` provides this information, any `Bidder` can view the deployed contract on the blockchain.

***Let's add a function `getSale` in `index.rsh` that does just that.***

1. The `Auctioneer` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.
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

2. Once the contract has been published onto the blockchain, we will need to notify the `Auctioneer`'s frontend that the auction is ready to be deployed.

    ```javascript
    //++ Add auctionReady function.
    auctionReady: Fun([], Null)
    ```
3. We also need to allow the Auctioneer to see each bid in the auction.

    - SeeBid sends a `Bidder`.`Address` and the latest bid `UInt` to the frontend.

    ```javascript
    //++ Add seeBid function.
    seeBid: Fun([Address, UInt], Null),
    ```

4. Finally, we will also allow the auctioneer to see the outcome of the auction.

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
    const Auctioneer = Participant('Auctioneer', {
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

</p>
</details>

</li>
<li>

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

Let's break down the `bid()` function :
- It takes in a `[UInt]` from the frontend, which is the bid amount.
- It returns a `Tuple(UInt,Address, UInt)` from the backend, which we will implement later.

</p>
</details>

</li>

<li>
<details>
<summary>
<h4>

Adding it all into [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/3.AddingABidderInterface/index.rsh)
</h4>

Adding the interfaces into the contract.
</summary>
<p>

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/3.AddingABidderInterface/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();
});
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

Working with [Reach Steps](https://docs.reach.sh/rsh/step/).
</h3>
</summary>
<p>
<ol>
<li>

<details>
<summary>
<h4>

[Local Step](https://docs.reach.sh/rsh/step/)
</h4>

A local step refers to an action taken by a single `Participant` outside the blockchain.

Each reach program is in a [local step](https://docs.reach.sh/rsh/local/) after `initialization`.
</summary>
<p>

Since we are building a NFT-auction, we need a NFT to be auctioned. 

As described in the beginning, we will need :

- Nft Id
- Nft price
- Auction duration

All this information will be provided by the `Auctioneer` `Participant`. To make sure that the `Auctioneer` is the only one who can provide this information, we will use a `Local Step` to do so.

`Reach` provides us with an [`only`](https://docs.reach.sh/rsh/step/#ref-programs-only-step) method that we can use to do so.

```javascript
Auctioneer.only(() => {
    const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
});
```
Let's break it down:
- `Auctioneer.only(() => {...})` is a `Local Step` that only allows the `Auctioneer` to access the `getSale()` function we created above.

- `{nftId, minBid, lenInBlocks}` is the declassified `Object` that is returned from the `getSale()` function.

- The [declassify](https://docs.reach.sh/rsh/local/#declassify) function makes the return value known.

- The [interact](https://docs.reach.sh/rsh/local/#interact) function notifies the frontend and awaits for a response.

Now that we have the `nftId`, `minBid`, and `lenInBlocks`, we can publish this information onto the contract.

> Let's add this to [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh).

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //++ Add declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
});
```
</p>
</details>

</li>
<li>

<details>
<summary>
<h4>

[Consensus Step](https://docs.reach.sh/rsh/consensus/)
</h4>

A consensus steps occurs on the blockchain network for all participants to see.
</summary>
<p>

After the `init()` reach is always in a `local step`. In order to achieve 
consensus, we need to call [consensus functions](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) :

- [Publish](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) can be used to deploy information to the contract and will push the contract into a consensus state.
- [Pay](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout), which is paying fees to the contract will also push the contract into a consensus state.

Since we now know the `nftId`, `minBid`, and `lenInBlocks`, we can publish this information onto the contract.

```javascript
Auctioneer.publish(nftId, minBid, lenInBlocks);
```

In order to get back into a local step and allow the Auctioneer to send the NFT into the contract, we will use [`commit`](https://docs.reach.sh/rsh/consensus/#rsh_commit) which pushes the reach into a local step.

We will also specify the number of tokens to send to the contract. We will set the amount to one since it is a unique NFT, then pay it to the contract.

```javascript
const amt = 1;

commit();

Auctioneer.pay([[amt, nftId]]);

Auctioneer.interact.auctionReady();
```
Then finally, we will `interact` with the frontend to notify the `Auctioneer` that the auction is ready.

> This is how [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/5.AddingAConsensusStep/index.rsh) looks like.

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //++ Add publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //++ Add NFT amount.
    const amt = 1;

    //++ Add step into local-step.
    commit();

    //++ Add send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    //++ Add notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();
});
```

</p>
</details>

</li>
<li>
<details>
<summary>
<h4>

Using Reach [Checks](https://docs.reach.sh/rsh/compute/#rsh_assert)

</h4>

Here we will `assert` that the contract balance and consensus time has changed.
</summary>
<p>

Reach provides various checks that we can use to check the current state of the contract.

We can use reach [assert](https://docs.reach.sh/rsh/compute/#rsh_assert) to check wether the `amt` we paid above has been reflected.

```javascript
assert(balance(nftId) == amt, "balance of NFT is wrong");
```
- Here we are using a [balance](https://docs.reach.sh/rsh/compute/#rsh_balance) primitive to check the balance of the NFT. if we call `balance()` without a passing a parameter, we will get the balance of the contract.

Also, we will check the [last consensus time](https://docs.reach.sh/rsh/compute/#rsh_lastConsensusTime). Last consensus time checks the last time the contract was in consensus : The last time the contract used a `publish` or `pay` step.

```javascript
const lastConsensus = lastConsensusTime();
```
- This is how we use the [last consensus time](https://docs.reach.sh/rsh/compute/#rsh_lastConsensusTime) primitive to check the last consensus time.

We can also set the length of the auction by taking the last consensus time and adding lenInBlocks to it.

```javascript
const end = lastConsensus + lenInBlocks;
```

</p>
</details>
</li>

<li>
<details>
<summary>
<h4>

Adding it all into [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/6.AddingReachChecks/index.rsh)
</h4>

This is how your [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/6.AddingReachChecks/index.rsh) should look like.
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //NFT amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();

    //++ Add assertion to check NFT balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    //++ Add checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    //++ Add blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;
});
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

Adding [Parallel Reduce](https://docs.reach.sh/rsh/consensus/#parallelreduce).

</h3>

Here we implement a [parallel reduce](https://docs.reach.sh/rsh/consensus/#parallelreduce) to run the auction until auction time runs out.
</summary>
<p>

1. All `Bidder`s will be competing against each other to make the highest bid while simultaneously racing against the auction time. 

2. We will use a `while` loop that keeps the auction active as long as the auction time is not over.

3. Every time a bidder bids higher than the previous bid price, the previous bidder will be reimbursed.

4. At the end, the parallel reduce will force a single result.

Let's see how this will look.

<p>
<ol>
<li>
<details>
<summary>
<h4>

Adding parallel reduce.
</h4>

We first create a list that will be used in the parallel reduce.
</summary>

```javascript
const [highestBidder, lastPrice, isFirstBid] = [0, 0, 0];
```
- Every round of the loop, we will be checking and setting the highest bid, the highest bidder address and whether it is the first bid.

> Since the `Auctioneer` will be the first bidder, we will set the `highestBidder` to the `Auctioneer` address. Set the `lastPrice` to the `minBid` and `isFirstBid` to `true`.

```javascript
const [highestBidder, lastPrice, isFirstBid] = [Auctioneer, minBid, true];
```

> Now let's plug this into the `parallelReduce` function.

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
```
</details>
</li>
<li>
<details>
<summary>
<h4>

Adding an [Invariant](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce.invariant)
</h4>
</summary>

A while loop can execute a block of code as long as a specified condition is true. Thus, the invariant value should be a `true` value that is set at the start of a loop and changes only when the auction is done.

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
    .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
```
- Here, the invariant is true as long as the balance of the NFT is equal to one, thus the contract still holds the NFT.

- It also checks whether it is the first bid or not. If so then the contract balance is 0, otherwise the contract balance is equal to the last bid price.

</details>
</li>

<li>
<details>
<summary>
<h4>

Using a [while](https://docs.reach.sh/rsh/consensus/#while) loop.
</h4>

A while loop will run until the last consensus time is less than the end time.
</summary>

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
    .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
    .while(lastConsensusTime() < end)
```

While the loop is `true`, let's accept bids. Parallel reduce uses `components` to allow `participants` and `api`'s to individually access functions.

</details>
</li>
    
<li>
<details>
<summary>
<h4>

Using an [`API`](https://docs.reach.sh/rsh/consensus/#p_27)
</h4>

Here, we use [`.api()`](https://docs.reach.sh/rsh/consensus/#p_27) to allow bidders to place bids.
</summary>


- An `API_EXPR` is used to access the `Bidder` API `bid` function.

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
        Auctioneer.interact.seeBid(this, bid);
        return [this, bid, false];
    })
)
```

- Here we are using [require](https://docs.reach.sh/rsh/consensus/#rsh_require) to ensure that the bid is higher than the last placed bid.

- We will `notify` the bidder frontend of the `bid` placed, the `highestBidder` and the `lastPrice`.

- We are checking if `isFirstBid` is `false`. If it is, we will reimburse the `lastPrice` back to the last bidder.

- We are also interaction with the `Auctioneer` frontend to notify it of the bid.

- We finally return the `bidder`, the `bid` and setting `isFirstBid` to false.

</details>
</li>

<li>
<details>
<summary>
<h4>

Setting auction [timeout](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce.timeout).
</h4>

Reach `timeout` will be called once the auction time reaches. `timeout` takes a parameter `blocktime` and a function once the timeout is reached.
</summary>

```javascript

.timeout(absoluteTime(end), () => {
    Auctioneer.publish()
    return [highestBidder, lastPrice, isFirstBid]; 
});
```

- [absoluteTime](https://docs.reach.sh/rsh/compute/#rsh_absoluteTime) gets the absolute time of the blockchain.

- Once the auction time ends, the `Auctioneer` will `publish` the information onto the blockchain and returns the `highestBidder`, `lastPrice` and `isFirstBid`.

This is how the full parallel reduce looks.

</details>
</li>

<li>
<details>
<summary>
<h4> 
Putting the auction together.
</h4>
</summary>

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
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
    Auctioneer.interact.seeBid(this, bid);
    return [this, bid, false];
})
).timeout(absoluteTime(end), () => {
    Auctioneer.publish()
    return [highestBidder, lastPrice, isFirstBid]; 
});
```

</details>
</li>

<li>
<details>
<summary>
<h4>

Adding it all into [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/7.AddingParallelReduce/index.rsh).
</h4>

This is how your [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/7.AddingParallelReduce/index.rsh) should be looking like.
</summary>
<p>

```javascript

'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //NFT amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();

    // assertion to check NFT balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    // checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    // blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;

    //++ Add parallel reduce
    const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
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
        Auctioneer.interact.seeBid(this, bid);
        return [this, bid, false];
    })
    ).timeout(absoluteTime(end), () => {
        Auctioneer.publish()
        return [highestBidder, lastPrice, isFirstBid]; 
    });
});

```
</p>
</details>
</ol>
</p>
</details>
</li>
<li>
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

Then we transfer the highest bid, to the `Auctioneer` of the NFT.

```javascript
if ( ! isFirstBid ) { transfer(lastPrice).to(Auctioneer); }
```
Finally, we notify the `Auctioneer` frontend of the auction results.

```javascript
Auctioneer.interact.showOutcome(highestBidder, lastPrice);
```
`commit` back to a local state and `exit` the contract.

```javascript
commit();

exit();
```

</p>
</details>
</li>

<li>
<details>
<summary>
<h3>

Here's the complete [Backend](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/7.AddingParallelReduce/index.rsh)
</h3>

This is how your final [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Full/index.rsh) should be looking like.
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //NFT amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();

    // assertion to check NFT balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    // checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    // blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;

    // parallel reduce
    const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
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
        Auctioneer.interact.seeBid(this, bid);
        return [this, bid, false];
    })
    ).timeout(absoluteTime(end), () => {
        Auctioneer.publish()
        return [highestBidder, lastPrice, isFirstBid]; 
    });

    // Transfer
    if ( ! isFirstBid ) { transfer(lastPrice).to(Auctioneer); }

    // auctioneer show outcome.
    Auctioneer.interact.showOutcome(highestBidder, lastPrice);

    // step to local-step.
    commit();

    // exit contract.
    exit();
});
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
<h2>

Implementing the Frontend.
</h2>

Let's see how we'll connect the backend the frontend.
</summary>
<p>

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

Adding a `Auctioneer` `Participant` Test Account.
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

Creating a NFT with [launchtoken](https://docs.reach.sh/frontend/#js_launchToken)

</h3>

Adding an NFT to our [`index.mjs`]((https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/3.CreatingANFT/index.mjs)) file.
</summary>
<p>

If we take a look at `index.rsh` we see that the `Auctioneer`.`getSale` function expects a `nftId`, a `minBid` and `lenInBlocks` as parameters.

> Reach Standard Library provides a [`launchToken`](https://docs.reach.sh/frontend/#js_launchToken) function that can handle creating a network token.

```javascript
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });
```
Let's decipher the parameters :
- `Account` = `launchToken` expects the account of the auctioneer of the token. In our instance, `accCreator` is the auctioneer of the token.
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

`getSale` function requires three parameters : `nftId`, `minBid` and `lenInBlocks`.
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

Let's create a test account for the `Bidder` `api` just as we did with the `Auctioneer`.

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


In order to connect the `Bidder` `API` to the backend, we need to get the contract `address` that was created by the `Auctioneer` :

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


We are going to put all our `Bidders` into an `async` function and allow each `Bidder` to connect to the backend contract. But before we do that, let's look at how an actor other than the `Auctioneer`/Deployer connects to the backend contract.

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

- `const startBidders` will be called by the Auctioneer once the auction is ready.

-  `let bid = minBid;`

- `const runBidder()`

- `const inc = stdlib.parseCurrency(Math.random() * 10);` uses reach to generate a random number between 0 and 10.

- `bid = bid.add(inc);` adds the random number to the current bid to create a unique bid for each `Bidder`.

- `const accBidder = await stdlib.newTestAccount(startingBalance);` creates a new account for the `Bidder`.

- `accBidder.setDebugLabel(who);` sets the debug label for the `Bidder`, with a unique `Bidder` name.

- `await accBidder.tokenAccept(nftId);` allows the `Bidder` accepts the NFT from the Auctioneer.

- `bidders.push([who, accBidder]);` adds the `Bidder` name and `Bidder` account to the `const bidders = [];` array we created.

- `const ctc = accBidder.contract(backend, ctcCreator.getInfo());` connects the `Bidder` to the contract deployed by the `Auctioneer` by using reach standard library function 
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
        Auctioneer.interact.seeBid(this, bid);
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

Remember the auctioneer interface, we are going to add the `startBidders` function onto the `Auctioneer.auctionReady` function so that once the auction is ready, we can start the auction.

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
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Auctioneer sees that the auction is ready.");
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


We are going to put all our `Bidders` into an `async` function and allow each `Bidder` to connect to the backend contract. But before we do that, let's look at how an actor other than the `Auctioneer`/Deployer connects to the backend contract.

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

- `const startBidders` will be called by the Auctioneer once the auction is ready.

-  `let bid = minBid;`

- `const runBidder()`

- `const inc = stdlib.parseCurrency(Math.random() * 10);` uses reach to generate a random number between 0 and 10.

- `bid = bid.add(inc);` adds the random number to the current bid to create a unique bid for each `Bidder`.

- `const accBidder = await stdlib.newTestAccount(startingBalance);` creates a new account for the `Bidder`.

- `accBidder.setDebugLabel(who);` sets the debug label for the `Bidder`, with a unique `Bidder` name.

- `await accBidder.tokenAccept(nftId);` allows the `Bidder` accepts the NFT from the Auctioneer.

- `bidders.push([who, accBidder]);` adds the `Bidder` name and `Bidder` account to the `const bidders = [];` array we created.

- `const ctc = accBidder.contract(backend, ctcCreator.getInfo());` connects the `Bidder` to the contract deployed by the `Auctioneer` by using reach standard library function 
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
        Auctioneer.interact.seeBid(this, bid);
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

Remember the auctioneer interface, we are going to add the `startBidders` function onto the `Auctioneer.auctionReady` function so that once the auction is ready, we can start the auction.

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
    },
    // ++ Add startBidders function.
    auctionReady: () => {
        console.log("Auctioneer sees that the auction is ready.");
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

// NFT asset.
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

// connect account to backend contract.
const ctcCreator = accCreator.contract(backend);

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

// setting up the `Auctioneer` interface.
await ctcCreator.participants.Auctioneer({
    //  get sale function.
    getSale: () => {
        return params;
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

```
</p>
</details>
</li>
</ol>

</p>
</details>
</li>
</ul>
</p>
</details>