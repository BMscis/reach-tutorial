<details>
<summary>
<h3>

Suggested Solution.
</h3>

We can suggest a `bid` function that allows the `Bidder` to place a bid from the frontend using the `API` interface.
</summary>
<p>

```javascript

// Any subsequent bidder.
const Bidder = API('Bidder', {
    //Bidder interface.
    bid: Fun([UInt], Tuple(UInt,Address, UInt)),
});

```

</p>
</details>