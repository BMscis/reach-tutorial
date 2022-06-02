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