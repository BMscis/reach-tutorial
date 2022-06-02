<details>
<summary>
<h4>

[Consensus Step](https://docs.reach.sh/rsh/consensus/)
</h4>

A consensus steps occurs on the blockchain network for all participants to see.
</summary>
<p>

After the `init()` reach is always in a `local step`. In order to achieve 
consensus, we need to call [consensus functions](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) :

- [Publish](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) can be used to deploy information to the contract and will push the contract into a consensus state.
- [Pay](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout), which is paying fees to the contract will also push the contract into a consensus state.

Since we now know the `nftId`, `minBid`, and `lenInBlocks`, we can publish this information onto the contract.

```javascript
Auctioneer.publish(nftId, minBid, lenInBlocks);
```

In order to get back into a local step and allow the Auctioneer to send the NFT into the contract, we will use [`commit`](https://docs.reach.sh/rsh/consensus/#rsh_commit) which pushes the reach into a local step.

We will also specify the number of tokens to send to the contract. We will set the amount to one since it is a unique NFT, then pay it to the contract.

```javascript
const amt = 1;

commit();

Auctioneer.pay([[amt, nftId]]);

Auctioneer.interact.auctionReady();
```
Then finally, we will `interact` with the frontend to notify the `Auctioneer` that the auction is ready.
> This is how [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/5.AddingAConsensusStep/index.rsh) looks like.

```javascript
'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Auctioneer = Participant('Auctioneer', {
        //getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //auctionReady function.
        auctionReady: Fun([], Null),

        //seeBid function.
        seeBid: Fun([Address, UInt], Null),

        //showOutcome function.
        showOutcome: Fun([Address, UInt], Null),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        // Add this function to the Bidder interface.
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    
    init();

    //declassify function.
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    // Add publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    // Add NFT amount.
    const amt = 1;

    // Add step into local-step.
    commit();

    // Add send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    // Add notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();
});
```

</p>
</details>