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