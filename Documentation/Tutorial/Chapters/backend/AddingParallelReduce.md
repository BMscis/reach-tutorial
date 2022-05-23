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
</ol>
</p>