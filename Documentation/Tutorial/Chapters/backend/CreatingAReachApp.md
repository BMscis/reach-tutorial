<details>
<summary>
<h4>

Creating a [Reach App](https://docs.reach.sh/rsh/module/#rsh_Reach.App)

</h4>
</summary>
<p>

**Reach.App** will contain all the code that we will need to create our contract.
> Let's add this into an `index.rsh` file.
```javascript
'reach 0.1';

export const main = Reach.App(() => {
    //setoptions
})

init();
```
***Let's go through the code to see what is happening.***
+ `reach 0.1;` indicates that this is a Reach program. You'll always have this at the top of every program.

+ `export const main` defines the main export from the program. When you compile, this is what the compiler will look at.

+  `init()` marks the deployment of the Reach program, which allows the program to start doing things.

</p>
</details>