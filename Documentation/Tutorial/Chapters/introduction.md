<details>
<summary>
<h3>

Walk Through.
</h3>

Let's summarize what we will be implementing.
</summary>
<p>

1. A `Auctioneer` will initialize the contract and provide three variables:

    - A NFT Token.
    - An initial bid.
    - A time limit.

2. Once these variables are provided, the `Auctioneer` will then publish the contract onto the blockchain.

3. Thereafter, a `Bidder` will be able to connect to the contract and view the `token_id`, `initial_bid`, and `time_limit`.

4. If the `Bidder` accepts the wager, the `Bidder` will place a bid and call the backend.

5. The auction will continue until time-lapse hits.

6. At timeout :
    - The winner will receive the NFT.
    - The `Auctioneer` will receive the highest bid.
    - All `Bidders` who lost the auction will receive their funds back.

> NOTE :
> The `Auctioneer` is anyone who deploys the contract.

> The `Auctioneer` is a participant class that can take any acceptable variable name.

</p>
</details>