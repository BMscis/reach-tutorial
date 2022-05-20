<details>
<summary>
<h4>

Adding a test account.
</h4>
</summary>
<p>

We will use the stdlib to create a test account with a starting balance of 100 network tokens.

```javascript
// generate starting balance
const startingBalance = stdlib.parseCurrency(100);
// create test account
const accCreator = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>