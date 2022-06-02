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

    //publish contract.
    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //NFT amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send NFT to contract.
    Auctioneer.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Auctioneer.interact.auctionReady();

    // Add assertion to check NFT balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    // Add checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    // Add blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;
});