#### NFT AUCTION

### Install and Initialize

### Implementation

___index.rsh___
```javascript

'reach 0.1';

export const main = Reach.App(() => {
    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
    });
    const Bidder = API('Bidder', {
        //Implement bidder interact interface here.
    });
    init();
});

load:(https://github.com/BMscis/reach-tutorial/blob/c015831fc80c393577be2d39427e826ead32b3e7/Documentation/Tutorial/p1/index.rsh)

```

Let's go through the code to see what is happening.

+ Line 1 indicates that this is a Reach program.
You'll always have this at the top of every program.
+ Line 3 defines the main export from the program.
When you compile, this is what the compiler will look at.
+ Lines 4 through 6 specifies the a **Participant** creator for this application, _Creator_.
+ Line 7 through 9 specifies an **API** called 'Bidder'. We are going to learn about API's later in the tutorial.
+  Line 10 marks the deployment of the the Reach program, which allows the program to start doing things.

## Reach Expression
- [Participant](https://docs.reach.sh/rsh/appinit/#rsh_Participant)
        
    A Participant in Reach represent a dictionary that: 
    + Contains all functions that must be provided to the backend by the frontend.
    + Represents a unique user of the contract.

    For instance, the contract above,

    ```javascript

    const Creator = Participant('Creator', {
        //Implement Creator interact interface here.
    });

    ```

    The Creator will be the initializer of the contract. Any frontend user that wants to deploy the contract will be the Creator.
    The Creator can be any variable name but can only be called once during the lifetime of the contract.

Let's take a look at how the implimentation of this contract will look in the frontend.

___index.mjs___
```javascript

import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();
const startingBalance = stdlib.parseCurrency(100);
const accCreator = await stdlib.newTestAccount(startingBalance);
const ctcDeployer = accCreator.contract(backend);

await ctcDeployer.participants.Creator({
    // Specify Creator interact interface here
})

```

```javascript

load:/p1/index.rsh

```
What's going on:

+ Line 1 imports the Reach standard library loader.
+ Line 2 imports your backend, which `./reach compile` will produce.

> `./reach compile` will compile `index.rsh` above to `index.main.mjs` and will output the file to `build/index.main.mjs`.

+ Line 4 loads the [standard library](https://docs.reach.sh/frontend/#ref-frontends-js-loader) dynamically based on the [`REACH_CONNECTOR_MODE`](https://docs.reach.sh/tool/#cmd_REACH_CONNECTOR_MODE) environment variable.

+ Line 5 defines a quantity of network tokens as the starting balance for each test account.
+ Lines 6 creates a test account with initial endowments for the Creator.
This will only work on the Reach-provided developer testing network.

+ Line 7 has the Creator, deploy the application.
+ Line 9 will wait for instructions from the backend.

This is now enough for Reach to compile and run our program. Let's try by running

```cmd
$ ./reach run
```

Reach should now build and launch a Docker container for this application.
Since the application doesn't do anything, you'll just see a lot of diagnostic messages though, so that's not very exciting.

:::note
The entire process that we just went through can be automated by running 
```cmd
$ ./reach init
```
 when you start your next project!

### Nft Auction

In the next step, we'll implement the logic of _Nft Auction_ and our application will start doing something!
In order to implement the **Creator** the user will have to provide the following:
+ An NFT token to be auctioned.
+ A starting price for the auction.
+ A duration for the auction.

Lets create a variable that does just that.

```javascript
Object
(
    {
        nftId: Token,
        minBid: UInt,
        lenInBlocks: UInt,
    }
)
```

## Reach Types
- [Token](https://docs.reach.sh/compute/types/#rsh_Token) 
> Refers to a token in the network.

- [UInt](https://docs.reach.sh/compute/types/#rsh_UInt) 

> Refers to a unsigned integer.

In order for the frontend to interact with the object, we need to define an async function that returns the object.

___index.rsh___

```javascript
Fun (
    [], // Takes no argument
    Object({
        nftId: Token,
        minBid: UInt,
        lenInBlocks: UInt,
    }) // Returns an object
),
```
This is a reach function that takes no arguments and returns an object.

The **Creator** will be responsible for providing NFT data from the frontend. So lets add this function to the Creators interface and call it getSale.

___index.rsh___

```javascript

const Creator = Participant('Creator', {
    getSale: Fun([], Object({
        nftId: Token,
        minBid: UInt,
        lenInBlocks: UInt,
    })),
});

```

This is how the Creator will interact with the function in the javascript frontend.

___index.mjs___

```javascript

const params = { 
    nftId:nftId,
    minBid:minBid,
    lenInBlocks:lenInBlocks,
 };

await ctcCreator.participants.Creator({
    // Specify Creator interact interface here
    getSale: () => {
        return params;
    }
})

```
