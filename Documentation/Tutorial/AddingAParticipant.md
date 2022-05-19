<details>
<summary>
<h3>

Adding a [Participant](https://docs.reach.sh/model/#term_participant)
</h3>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DApp and is associated with an account on the consensus network.

</summary>
<p>

A **Participant** is a class that represent an account connected to the contract as well as a user connected to the fronteend.

```javascript
const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
});
```
***In this instance :***

- We are creating a `Participant` class called `Creator`. 
- The `Creator` will be the deployer of the contract onto the blockchain.

    Let's add the `Creator` into `index.rsh`.

[___index.rsh___](p1/index.rsh)

```javascript
'reach 0.1';

export const main = Reach.App(() => {

    //setoptions.
    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
    });

    init();
});
```
> Note that functions added onto the Participant can only be called by the backend.

</p>
</details>