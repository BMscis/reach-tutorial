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

        // assertion to check NFT balance
        assert(balance(nftId) == amt, "balance of NFT is wrong");

        // checkpoint to set last publish time.
        const lastConsensus = lastConsensusTime();

        // blocktime to set auction duration.
        const end = lastConsensus + lenInBlocks;

        // parallel reduce
        const [highestBidder, lastPrice, isFirstBid] = parallelReduce([Auctioneer, minBid, true])
        .invariant(balance(nftId) == amt && balance() == (isFirstBid ? 0 : lastPrice))
        .while(lastConsensusTime() < end)
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
            Auctioneer.publish()
            return [highestBidder, lastPrice, isFirstBid]; 
        });

        // Add Transfer NFT
        transfer(amt, nftId).to(highestBidder);

        // Transfer Amount
        if ( ! isFirstBid ) { transfer(lastPrice).to(Auctioneer); }

        // auctioneer show outcome.
        Auctioneer.interact.showOutcome(highestBidder, lastPrice);

        // step to local-step.
        commit();

        // exit contract.
        exit();
    });