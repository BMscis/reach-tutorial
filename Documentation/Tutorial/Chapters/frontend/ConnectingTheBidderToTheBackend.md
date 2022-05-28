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
</ol>
</p>
</details>