<details>
<summary>
<h3>

Adding a `Bidder` Interfaces.
</h3>

The `Bidder` is an [API](https://docs.reach.sh/rsh/appinit/#rsh_API) that allows the frontend to interact with the backend.
</summary>
<p>

> This is how the function looks.

```javascript
//++ Add this function to the Bidder interface.

bid: Fun([UInt], Tuple(UInt,Address, UInt)),
```
This is how it looks.

[index.rsh](p3/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
        //++ Add getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //++ Add auctionReady function.
        auctionReady: Fun([], Null),

        //++ Add seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //++ Add showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //++ Add this function to the Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();
});
```

Let's break down the `bid()` function :
- It takes in a `[UInt]` from the frontend, which is the bid amount.
- It returns a `Tuple(UInt,Address, UInt)` from the backend, which we will implement later.

</p>
</details>