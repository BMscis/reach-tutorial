'reach 0.1';

export const main = Reach.App(() => {
    const Auctioneer = Participant('Auctioneer', {
        ...hasConsoleLogger,
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        setNewOwner: Fun([Address, UInt], Null),
    });
    const Bidder = API('Bidder', {
        bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    });
    const Logger = Events({
        showBid: [Bytes(7),Address, UInt],
        auctionTime: [Bytes(11),UInt],
        contractState: [Bytes(13),Bytes(8)],
        showOutcome: [Bytes(11), Address, UInt],
        timesUp: [Bytes(7)],
    })
    init();

    //log
    Auctioneer.interact.log(1)
    
    Auctioneer.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });

    Auctioneer.publish(nftId, minBid, lenInBlocks);

    //log
    Logger.contractState("contractState","NFTpubli")

    const amt = 1;

    commit();

    //log
    Auctioneer.interact.log(2)

    Auctioneer.pay([[amt, nftId]]);

    

    //Log
    Logger.contractState("contractState","Checkbal")
    assert(balance(nftId) == amt, "balance of NFT is wrong");

    const end = lastConsensusTime() + lenInBlocks;

    //log
    Logger.contractState("contractState","auctionR")

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
                Logger.showBid("showBid",this, bid);

                Logger.auctionTime("auctionTime",end - thisConsensusTime());

                return [this, bid, false];
            })
        ).timeout(absoluteTime(end), () => {
          Auctioneer.publish()
          return [highestBidder, lastPrice, isFirstBid]; 
        });
        
        transfer(amt, nftId).to(highestBidder);
        
        Logger.timesUp("timesUp");

        if ( ! isFirstBid ) { transfer(lastPrice).to(Auctioneer); }

        Logger.showOutcome("showOutcome",highestBidder, lastPrice);

        Auctioneer.interact.setNewOwner(highestBidder, lastPrice);

    commit();
    exit();
});