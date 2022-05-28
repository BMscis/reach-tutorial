'reach 0.1';

export const main = Reach.App(() => {
    const Auctioneer = Participant('Auctioneer', {
        ...hasConsoleLogger,
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        //timeout: Fun([], Null),
        auctionReady: Fun([], Null),
        seeBid: Fun([Address, UInt], Null),
        showOutcome: Fun([Address, UInt], Null),
    });
    const Bidder = API('Bidder', {
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    init();
    
    Auctioneer.interact.log(2)
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
    Auctioneer.interact.log(3)
    Auctioneer.publish(nftId, minBid, lenInBlocks);
    Auctioneer.interact.log(4)
    const amt = 1;
    commit();
    Auctioneer.interact.log(5)
    Auctioneer.pay([[amt, nftId]]);
    Auctioneer.interact.log(6)
    Auctioneer.interact.auctionReady();
    Auctioneer.interact.log(7)
    assert(balance(nftId) == amt, "balance of NFT is wrong");
    const end = lastConsensusTime() + lenInBlocks;
    const [
        highestBidder, 
        lastPrice,
        isFirstBid,
    ] = parallelReduce([Auctioneer, minBid, true])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
        .while(lastConsensusTime() <= end)
        .api(Bidder.bid,
            ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
            ((bid) => bid),
            ((bid, notify) => {
                require(bid > lastPrice, "bid is too low");
                notify([bid,highestBidder, lastPrice]);
                if ( ! isFirstBid ) {
                    transfer(lastPrice).to(highestBidder);
                }
                Auctioneer.interact.seeBid(this, bid);
                return [this, bid, false];
            })
        ).timeout(absoluteTime(end), () => {
            //Auctioneer.interact.timeout();
            Auctioneer.publish()
            return [highestBidder, lastPrice, isFirstBid]; 
        });

        transfer(amt, nftId).to(highestBidder);
        if ( ! isFirstBid ) { transfer(lastPrice).to(Auctioneer); }
        Auctioneer.interact.showOutcome(highestBidder, lastPrice);
    commit();
    exit();
});