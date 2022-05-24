<details>
<summary>
<h3>

Adding a `Creator` `Participant` Test Account.
</h3>

Let's add a test account to our [`index.mjs`]((https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/frontend/2/2.AddingAParticipantTestAccount/index.mjs)) file.
</summary>
<p>

We will use reach standard library to create a test account with a starting balance of 100 network tokens.

```javascript
//++Add generate starting balance
const startingBalance = stdlib.parseCurrency(100);

//++Add create test account
const accCreator = await stdlib.newTestAccount(startingBalance);
```

</p>
</details>