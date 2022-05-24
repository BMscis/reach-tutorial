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
    // get sale function.
    getSale: () => {
        return params;
    },
    // seeBid function.
    seeBid: (who, amt) => {
        let newBidder = stdlib.formatAddress(who)
        let newBid = stdlib.formatCurrency(amt)
        console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
    },
    // showOutcome function.
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