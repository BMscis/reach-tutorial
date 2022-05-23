'reach 0.1';

export const main = Reach.App(() => {
    
    // Deployer of the contract.
    const Creator = Participant('Creator', {
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
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    //publish contract.
    Creator.publish(nftId, minBid, lenInBlocks);

    //nft amount.
    const amt = 1;

    //step into local-step.
    commit();

    //send nft to contract.
    Creator.pay([[amt, nftId]]);

    //notify frontend that contract is ready.
    Creator.interact.auctionReady();

    //++ Add assertion to check nft balance
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    //++ Add checkpoint to set last publish time.
    const lastConsensus = lastConsensusTime();

    //++ Add blocktime to set auction duration.
    const end = lastConsensus + lenInBlocks;
});