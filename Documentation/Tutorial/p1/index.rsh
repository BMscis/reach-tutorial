'reach 0.1';

export const main = Reach.App(() => {
    const Deployer = Participant('Deployer', {
        //Implement Deployer interact interface here.
    });
    const Bidder = API('Bidder', {
        //Implement bidder interact interface here.
    });
    init();
});