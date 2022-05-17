'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
        //++
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
    });

    // Any subsequent bidder.
    const Bidder = API('Bidder', {
        //Implement bidder interact interface here.
    });
    init();
});