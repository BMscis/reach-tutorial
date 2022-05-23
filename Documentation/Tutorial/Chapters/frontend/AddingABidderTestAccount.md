<details>
<summary>
<h4>

Adding a `Bidder` Test Account.
</h4>
</summary>
<p>

Let's create a test account for the `Bidder` `api` just as we did with the `Creator`.

```javascript
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accBidder = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>