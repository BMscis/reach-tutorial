<details>
<summary>
<h3>

[Consensus Step](https://docs.reach.sh/rsh/consensus/)
</h3>

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