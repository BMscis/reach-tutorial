<details>
<summary>
<h3>

Creating a NFT with [launchtoken](https://docs.reach.sh/frontend/#js_launchToken)

</h3>

Adding a NFT to our [`index.mjs`]((https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/3.CreatingANFT/index.mjs)) file.
</summary>
<p>

If we take a look at `index.rsh` we see that the `Auctioneer`.`getSale` function expects a `nftId`, a `minBid` and `lenInBlocks` as parameters.

> Reach Standard Library provides a [`launchToken`](https://docs.reach.sh/frontend/#js_launchToken) function that can handle creating a network token.

```javascript
const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });
```
Let's decipher the parameters:
- `Account` = `launchToken` expects the account of the auctioneer of the token. In our instance, `accCreator` is the auctioneer of the token.
- `name` = `launchToken` expects the name of the token. In our instance, `bumple` is the name of the token.
- `sym` = `launchToken` expects the symbol of the token. In our instance, `NFT` is the symbol of the token.
- `opts` = `launchToken` expects an object of options if any. In our instance, `{ supply: 1 }` is the option since we only require unique instance of the NFT.

</p>
</details>

