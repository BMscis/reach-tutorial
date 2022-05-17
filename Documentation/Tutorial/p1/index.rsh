'reach 0.1';

export const main = Reach.App(() => {
    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
    });
    const Bidder = API('Bidder', {
        //Implement bidder interact interface here.
    });
    init();
});