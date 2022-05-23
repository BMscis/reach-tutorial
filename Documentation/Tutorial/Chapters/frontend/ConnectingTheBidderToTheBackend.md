<details>
<summary>
<h4>

Connecting the `Bidder` `API` to the Backend.

</h4>
</summary>
<p>

1. Connecting to the Contract.

    In order to connect the `Bidder` `API` to the backend, we need to get the contract `address` that was created by the `Creator` :

    ```javascript
    // remeber this line
    const ctcCreator = accCreator.contract(backend);
    ```
    > Reach provides a [`ctc.getInfo`](https://docs.reach.sh/frontend/#js_getInfo) function that returns the contract address.

    ```javascript
    const ctc = accBidder.contract(backend, ctcCreator.getInfo());
    ```
    - Here we are calling the `accBidder.contract` function and passing the backend and contract address.

2. Accepting the token.

    The `Bidder` must also allow their account to accept the NFT Token.
    Reach provides a [`tokenAccept](https://docs.reach.sh/frontend/#js_tokenAccepted) function that does just that.

    ```javascript
    await acc.tokenAccept(nftId);
    ```
    - Here we are calling the `tokenAccept` function and passing the `nftId` of the token.
</p>
</details>

