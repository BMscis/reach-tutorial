<details>
<summary>
<h4>

Making Blockchain [Computations](https://docs.reach.sh/rsh/compute/#rsh_assert)

</h4>

Here we will `assert` that the contract balance and consensus time has changed.
</summary>
<p>

Reach provides various checks that we can use to check the current state of the contract.

We can use reach [assert](https://docs.reach.sh/rsh/compute/#rsh_assert) to check whether the `amt` we paid above has been reflected.

```javascript
assert(balance(nftId) == amt, "balance of NFT is wrong");
```
- Here we are using a [balance](https://docs.reach.sh/rsh/compute/#rsh_balance) primitive to check the balance of the NFT. if we call `balance()` without a passing a parameter, we will get the balance of the contract.

Also, we will check the [last consensus time](https://docs.reach.sh/rsh/compute/#rsh_lastConsensusTime). Last consensus time checks the last time the contract was in consensus : The last time the contract used a `publish` or `pay` step.

```javascript
const lastConsensus = lastConsensusTime();
```
- This is how we use the [last consensus time](https://docs.reach.sh/rsh/compute/#rsh_lastConsensusTime) primitive to check the last consensus time.

We can also set the length of the auction by taking the last consensus time and adding lenInBlocks to it.

```javascript
const end = lastConsensus + lenInBlocks;
```

</p>
</details>