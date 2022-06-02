<details>
<summary>
<h4>

Adding a [Participant](https://docs.reach.sh/model/#term_participant)
</h4>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DApp and is associated with an account on the consensus network.

</summary>
<p>

A **Participant** is a class that represent an account connected to the contract as well as a user connected to the frontend.

```javascript
const Auctioneer = Participant('Auctioneer', {
        //Implement Auctioneer interact interface here.
});
```
***In this instance :***

- We are creating a `Participant` class called `Auctioneer`. 
- The `Auctioneer` will be the deployer of the contract onto the blockchain.

> Let's add the `Auctioneer` into `index.rsh`.

[`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/1.AddingAParticipant/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {

    // Add Auctioneer.
    const Auctioneer = Participant('Auctioneer', {
        //Implement Auctioneer interact interface here.
    });

    init();
});
```
> Note that functions added onto the Participant can only be called by the backend.

</p>
</details>