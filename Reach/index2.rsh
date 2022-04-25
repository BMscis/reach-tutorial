'reach 0.1';
const CState = UInt
const common = {
    seeBid: Fun([Address, UInt], Null),
    showOutcome: Fun([Address, UInt], Null),
    timeout: Fun([], Null),
    giveTime: Fun([UInt], Null),
}
export const main = Reach.App(() => {
    const Creator = Participant('Creator', {
        ...hasConsoleLogger,
        ...common,
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),

        auctionReady: Fun([], Null),
    });
    const Bidder = API('Bidder', {
        bid: Fun([UInt], Tuple(Address,UInt,Address, UInt)),
    })
    init();
    //consensus
    Creator.interact.log(2)
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
    Creator.interact.log(3)
    Creator.publish(nftId, minBid, lenInBlocks);

    Creator.interact.log(4)
    const amt = 1;
    //local
    commit();
    Creator.interact.giveTime(lastConsensusTime());
    Creator.interact.log(5)
    Creator.pay([[amt, nftId]]);
    Creator.interact.log(6)
    Creator.interact.auctionReady();
    Creator.interact.log(7)

    assert(balance(nftId) == amt, "balance of NFT is wrong")

    const end = lastConsensusTime() + lenInBlocks;

    const [timeRemaining, keepGoing] = makeDeadline(end);
    const [
        highestBidder, 
        lastPrice,
        isFirstBid,
    ] = parallelReduce([Creator, minBid, true])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
        .while(keepGoing())
        .api(Bidder.bid,
            ((bid) => { assume(bid > lastPrice, "bid is too low"); }),
            ((bid) => bid),
            ((bid, notify) => {
                require(bid > lastPrice, "bid is too low");
                notify([this,bid, highestBidder, lastPrice]);
                if ( ! isFirstBid ) {
                    transfer(lastPrice).to(highestBidder);
                }
                const who = this;
                Creator.interact.seeBid(who, bid);
                return [who, bid, false];
            })
        )
        .timeout(absoluteTime(end), () => {
            Creator.interact.log(8)
            Creator.interact.timeout();
            Creator.publish();
            return [highestBidder, lastPrice, isFirstBid]; 
        });
        transfer(amt, nftId).to(highestBidder);
        if ( ! isFirstBid ) { transfer(lastPrice).to(Creator); }
        Creator.interact.showOutcome(highestBidder, lastPrice);
    commit();
    exit();
});