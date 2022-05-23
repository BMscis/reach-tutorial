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
const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
});
```
***In this instance :***

- We are creating a `Participant` class called `Creator`. 
- The `Creator` will be the deployer of the contract onto the blockchain.

</p>
</details>

</li>

<li>
<details>
<summary>
<h4>

Adding it all to [___index.rsh___](AddingAParticipant/index.rsh)
</h4>

Let's add what we have so far into [`index.rsh`](AddingAParticipant/index.rsh).
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {

    //++ Add Creator.
    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
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

[___index.rsh___](AddingAParticipantInterface/index.rsh)

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

Adding it all into [index.rsh](AddingAQBidderInterface/index.rsh)
</h4>

Adding the interfaces into the contract.
</summary>
<p>

[index.rsh](AddingAQBidderInterface/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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

Since we are building a nft-auction, we need a nft to be auctioned. 

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

> Let's add this to [`index.rsh`](AddingARLocalStep/index.rsh).

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
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

> This is how [`index.rsh`](AddingATConsensusStep/index.rsh) looks like.

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //++ Add publish contract.
    Creator.publish(nftId, minBid, lenInBlocks);

    //++ Add nft amount.
    const amt = 1;

    //++ Add step into local-step.
    commit();

    //++ Add send nft to contract.
    Creator.pay([[amt, nftId]]);

    //++ Add notify frontend that contract is ready.
    Creator.interact.auctionReady();
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
- Here we are using a [balance](https://docs.reach.sh/rsh/compute/#rsh_balance) primitive to check the balance of the nft. if we call `balance()` without a passing a parameter, we will get the balance of the contract.

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

Adding it all into [`index.rsh`](AddingReachChecks/index.rsh)
</h4>

This is how your [`index.rsh`](AddingReachChecks/index.rsh) should look like.
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Creator.publish(nftId, minBid, lenInBlocks);

    //nft amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send nft to contract.
    Creator.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Creator.interact.auctionReady();

    //++ Add assertion to check nft balance
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

> Since the `Creator` will be the first bidder, we will set the `highestBidder` to the `Creator` address. Set the `lastPrice` to the `minBid` and `isFirstBid` to `true`.

```javascript
const [highestBidder, lastPrice, isFirstBid] = [Creator, minBid, true];
```

> Now let's plug this into the `parallelReduce` function.

```javascript
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
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
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
    .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
```
- Here, the invariant is true as long as the balance of the NFT is equal to one, thus the contract still holds the nft.

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
const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Creator, minBid, true])
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
    Creator.publish()
    return [highestBidder, lastPrice, isFirstBid]; 
});
```

- [absoluteTime](https://docs.reach.sh/rsh/compute/#rsh_absoluteTime) gets the absolute time of the blockchain.

- Once the auction time ends, the `Creator` will `publish` the information onto the blockchain and returns the `highestBidder`, `lastPrice` and `isFirstBid`.

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
```

</details>
</li>

<li>
<details>
<summary>
<h4>

Adding it all into [`index.rsh`](AddingSParallelReduce/index.rsh).
</h4>

This is how your [`index.rsh`](AddingSParallelReduce/index.rsh) should be looking like.
</summary>
<p>

```javascript

'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Creator.publish(nftId, minBid, lenInBlocks);

    //nft amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send nft to contract.
    Creator.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Creator.interact.auctionReady();

    // assertion to check nft balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    // checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    // blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;

    //++ Add parallel reduce
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
</li>

<li>
<details>
<summary>
<h3>

Here's the complete [Backend](AddingSParallelReduce/index.rsh)
</h3>

This is how your final [`index.rsh`](Full/index.rsh) should be looking like.
</summary>
<p>

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Creator.publish(nftId, minBid, lenInBlocks);

    //nft amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send nft to contract.
    Creator.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Creator.interact.auctionReady();

    // assertion to check nft balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    // checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    // blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;

    // parallel reduce
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

    // Transfer
    if ( ! isFirstBid ) { transfer(lastPrice).to(Creator); }

    // creator show outcome.
    Creator.interact.showOutcome(highestBidder, lastPrice);

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