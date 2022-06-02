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
        //Bidder interface.
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