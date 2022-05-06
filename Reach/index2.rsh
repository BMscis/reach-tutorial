'reach 0.1';

export const main = Reach.App(() => {
    const Creator = Participant('Creator', {
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
    
    Creator.interact.log(2)
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
    Creator.interact.log(3)
    Creator.publish(nftId, minBid, lenInBlocks);
    Creator.interact.log(4)
    const amt = 1;
    commit();
    Creator.interact.log(5)
    Creator.pay([[amt, nftId]]);
    Creator.interact.log(6)
    Creator.interact.auctionReady();
    Creator.interact.log(7)
    assert(balance(nftId) == amt, "balance of NFT is wrong");
    //const lastCons = lastConsensusTime();
    const end = lastConsensusTime() + lenInBlocks;
    //const [ timeRemaining, keepGoing ] = makeDeadline(end);
    const [
        highestBidder, 
        lastPrice,
        isFirstBid,
        endTime,
    ] = parallelReduce([Creator, minBid, true, end])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
        .while(lastConsensusTime() <= endTime)
        .api(Bidder.bid,
            ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
            ((bid) => bid),
            ((bid, notify) => {
                require(bid > lastPrice, "bid is too low");
                notify([bid,highestBidder, lastPrice]);
                if ( ! isFirstBid ) {
                    transfer(lastPrice).to(highestBidder);
                }
                Creator.interact.seeBid(this, bid);
                return [this, bid, false, endTime];
            })
        ).timeout(absoluteTime(endTime), () => {
            //Creator.interact.timeout();
            Creator.interact.log(0)
            Creator.interact.log(endTime)
            Creator.interact.log(0)
            Creator.interact.log(lastConsensusTime())
            Creator.publish();
            if(isFirstBid) {
                Creator.interact.log(200)
                Creator.interact.log(isFirstBid)
                return [highestBidder, lastPrice, isFirstBid, endTime + lenInBlocks];
            }else{
                Creator.interact.log(100)
                return [highestBidder, lastPrice, isFirstBid,endTime]; 
            }
        });

        transfer(amt, nftId).to(highestBidder);
        if ( ! isFirstBid ) { transfer(lastPrice).to(Creator); }
        Creator.interact.showOutcome(highestBidder, lastPrice);
    commit();
    exit();
});