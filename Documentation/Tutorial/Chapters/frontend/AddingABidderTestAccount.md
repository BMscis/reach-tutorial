<details>
<summary>
<h3>

Adding a `Bidder` Test Account.
</h3>
</summary>
<p>

Let's create a test account for the `Bidder` `api` just as we did with the `Creator`.

```javascript
// ++ Add test currrency.
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accBidder = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>