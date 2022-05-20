<details>
<summary>
<h4>

Transferring Ownership of the NFT
</h4>

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