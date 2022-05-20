<details>
<summary>
<h3>

[Local Step](https://docs.reach.sh/rsh/step/)
</h3>

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