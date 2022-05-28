'reach 0.1';

export const main = Reach.App(() => {

    //++ Add Auctioneer.
    const Auctioneer = Participant('Auctioneer', {
        //Implement Auctioneer interact interface here.
    });

    init();
});