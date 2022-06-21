<details>
<summary>
<h4>

Adding a `Participant` Interface.
</h4>

In the next step, we'll add the auctioneer interface that will interact with
the frontend.

</summary>
<p>

- In order to implement the **Auction** the `Auctioneer` will have to  provide the following:

    > + AN NFT token to be auctioned.
    > + A starting price for the auction.
    > + A duration for the auction.

- Once the `Auctioneer` provides this information, any `Bidder` can view the deployed contract on the blockchain.

***Let's add a function `getSale` in `index.rsh` that does just that.***

1. The `Auctioneer` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.
    ```javascript
    // Add getSale function.
    getSale: Fun([], Object({
        nftId: Token,
        minBid: UInt,
        lenInBlocks: UInt,
    })),
    ```
    Let's decipher the `getSale()` function:
    > - `Fun([], UInt)` is a Reach function that takes no arguments and returns a UInt.

    > - `Object({nftId: Token,minBid: UInt,lenInBlocks: UInt,})` is a Reach object that has the following properties:
    
    > - `nftId` is `Type` token.
    > - `minBid` is `Type` UInt.
    > - `lenInBlocks` is `Type` UInt.

- Therefore, the `getSale()` function will be called by the backend, and it will expect the frontend to return an `Object` with the following properties:
    - `nftId`.
    - `minBid`.
    - `lenInBlocks`.

2. Once the contract has been published onto the blockchain, we will need to notify the `Auctioneer`'s frontend that the auction is ready to be deployed.

    ```javascript
    // Add auctionReady function.
    auctionReady: Fun([], Null)
    ```
3. We also need to allow the Auctioneer to see each bid in the auction.

    - SeeBid sends a `Bidder`.`Address` and the latest bid `UInt` to the frontend.

    ```javascript
    // Add seeBid function.
    seeBid: Fun([Address, UInt], Null),
    ```

4. Finally, we will also allow the auctioneer to see the outcome of the auction.

    ```javascript
    // Add showOutcome function.
    seeOutcome: Fun([], Object({
        winner: Address,
        bid: UInt,
    })),
    ```
    > `SeeOutcome` sends the winner `Address` and the bid `UInt` to the frontend.

Let's add this function into the `index.rsh` file.

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingAParticipantInterface/index.rsh)

> Add this to index.rsh.

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        // Add getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        // Add auctionReady function.
        auctionReady: Fun([], Null),

        // Add seeBid function.
        seeBid: Fun([Address, UInt], Null),

        // Add showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    init();
});
```

</p>
</details>