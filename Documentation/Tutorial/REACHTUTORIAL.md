

# Implementation
<details>
<summary>
<h2>
        
Adding Reach [Expressions](https://docs.reach.sh/rsh/appinit/#ref-programs-appinit-exprs).
        
</h2>

Here we are going to add the various reach [initialization](https://docs.reach.sh/rsh/appinit/#init)  options.
</summary>
<p>
</p>
</details>

<details>
<summary>
<h2>

Working with [Reach Steps](https://docs.reach.sh/rsh/step/).

</h2>
</summary>
<p>

> A [Reach Step](https://docs.reach.sh/rsh/step/) occurs after the `init()` function is called.

1. > ### Reach Steps

    - There are two kinds of steps :

    - > [Local Steps](https://docs.reach.sh/rsh/local/) 

        - Local steps are not processed by the blockchain. They are can only be accessed locally.

    - > [Consensus Step](https://docs.reach.sh/rsh/consensus/)

        - Consensus steps are processed by the blockchain. They are executed in the consensus network.


2. > ### Interacting with the `Creator`.

    ___

    We need to interact with the `Creator` to get the `tokenId`, `bid`, and `timeLapse`.
    We will need to use the `getSale` function to get this from the `Creator`.
    Since we want the `Creator` alone to access this function, we will use **Reach** [`only`](https://docs.reach.sh/rsh/step/) function.

    Here's how that will look.

    ```javascript
    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
    ```
    Let's break it down:
    - `Creator.only(() => {...})` is a `Local Step` that only allows the `Creator` to access the `getSale()` function.

    - `{nftId, minBid, lenInBlocks}` is the declassified `Object` that is returned from the `getSale()` function.

    - The [declassify](https://docs.reach.sh/rsh/local/#declassify) function makes the return value known.

    - The [interact](https://docs.reach.sh/rsh/local/#interact) function notifies the frontend and awaits for a response.

    Now that we have the `nftId`, `minBid`, and `lenInBlocks`, we can publish  this information onto the contract.

    ```javascript
    Creator.publish(nftId, minBid, lenInBlocks);
    ```
    - `Creator`.[publish](https://docs.reach.sh/rsh/step/#publish---pay---when--and--timeout) is a consensus step which lets the `Creator` publish the `nftId`, `minBid`, and `lenInBlocks` onto the blockchain.

    Since we are deploying an NFT which should be unique, we will set the total amount to 1.
    Then we will send the nft onto the contract for holding.

    ```javascript
    const amt = 1;

    commit();

    Creator.pay([[amt, nftId]]);

    Creator.interact.auctionReady();
    ```

    Here's what's going on :
    - The `amt` represents the number of nft's we are sending to the contract.

    - The [`commit();`](https://docs.reach.sh/rsh/consensus/#rsh_commit) function is a ***step*** that ends the current ***consensus step*** and sets the current state of the contract into a ***local step***.

    - `Creator.pay([[amt, nftId]])` is a step which lets the `Creator` pay the `amt` of the `nftId` to the deployed contract.

    - `Creator.interact.auctionReady();` notifies the `Creator`'s frontend that the auction is ready.

    ___

3. > ### Adding it all into `index.rsh`

    ___

    This is how `index.rsh` looks.

    [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh)

    ```javascript
    'reach 0.1';

    export const main = Reach.App(() => {
        
        // Deployer of the contract.
        const Creator = Participant('Creator', {
            //++ Add getSale function.
            getSale: Fun([], Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })),
            //++ Add auctionReady function.
            auctionReady: Fun([], Null),

            //++ Add seeBid function.
            seeBid: Fun([Address, UInt], Null),

            //++ Add showOutcome function.
            showOutcome: Fun([Address, UInt], Null),
        });

        // Any subsequent bidder.
        const Bidder = API('Bidder', {
            //++ Add this function to the Bidder interface.
            bid: Fun([UInt], Tuple(UInt,Address, UInt)),
        });
        
        init();

    Creator.only(() => {
        const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
    });
    
    Creator.publish(nftId, minBid, lenInBlocks);

    const amt = 1;

    commit();

    Creator.pay([[amt, nftId]]);

    Creator.interact.auctionReady();

    });

    ```
    </p>
</details>

<details>
    <summary>
        <h2>
            Connecting the Frontend
        </h2>
    </summary>

> Let's see how the frontend will connect with the backend. We are going to use Javascript to create a user interface that will interact with the `Creator` and the `Bidder`.

1. > ### Importing dependencies.

    ___

    1. We need to import the [Reach Standard Library](https://docs.reach.sh/frontend/#js_stdlib.withDisconnect) module for Javascript.

        ```javascript
        import { loadStdlib } from '@reach-sh/stdlib';
        ```
        > `loadStdlib` is a function that will load the standard library dynamically based on the [`REACH_CONNECTOR_MODE`](https://docs.reach.sh/tool/#cmd_REACH_CONNECTOR_MODE) environment variable.

        > You can also pass in a `REACH_CONNECTOR_MODE` variable directly to `loadStdlib` if you want to override the default.

        ```javascript
        // connector can be 'ETH', 'ALGO', or 'CFX'
        const stdlib = await loadStdlib("ALGO");
        ```
    2. We also need to import the backend.

        - Once we run :
        ```shell
        ./reach compile
        ```
        Reach will transpile the `index.rsh` file to `index.main.mjs` and output it to `build/index.main.mjs`. The `index.main.mjs` file will contain all the code we need to interact with our backend contract. We can now import `index.main.mjs` into our application

        ```javascript
        import * as backend from './build/index.main.mjs';
        ```
    ___

2. > ### Adding a `Creator` `Participant`  Test Account.
    ___

    We will use the stdlib to create a test account with a starting balance of 100 network tokens.

    ```javascript
    // generate starting balance
    const startingBalance = stdlib.parseCurrency(100);
    // create test account
    const accCreator = await stdlib.newTestAccount(startingBalance);
    ```
    ___

3. > ### Creating an NFT.
    ___
    
    If we take a look at `index.rsh` we see that the `Creator`.`getSale` function expects an `nftId`, a `minBid` and `lenInBlocks` as parameters.

    > Reach Standard Library provides a [`launchToken`](https://docs.reach.sh/frontend/#js_launchToken) function that can handle creating a network token.

    ```javascript
    const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });
    ```
    Let's decipher the parameters :
    - `Account` = `launchToken` expects the account of the creator of the token. In our instance, `accCreator` is the creator of the token.
    - `name` = `launchToken` expects the name of the token. In our instance, `bumple` is the name of the token.
    - `sym` = `launchToken` expects the symbol of the token. In our instance, `NFT` is the symbol of the token.
    - `opts` = `launchToken` expects an object of options if any. In our instance, `{ supply: 1 }` is the option since we only require unique instance of the NFT.
    ___

4. > ### Connecting the Test Account to the Backend
    ___

    1. Now we will connect the test account to the backend.

        ```javascript
        const ctcCreator = accCreator.contract(backend);
        ```
        > `accCreator.contract(backend);` returns a ***Reach Contract*** that contains the contract address.
    
    2. We can now connect to the backend `Creator` interface with : 

        ```javascript
        await ctcCreator.participants.Creator({
            // Specify Creator interact interface here
        })
        ```
        > `await ctcCreator.participants.Creator` will connect the backend `Creator` interface with the `accCreator`.

        > Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/4.AddingALocalStep/index.rsh).

    3. Implementing the `getSale` function.

        - `getSale` function requires three parameters : `nftId`, `minBid` and `lenInBlocks`.

        ```javascript
        const nftId = theNFT.id
        const minBid = stdlib.parseCurrency(2);
        lenInBlocks = 10;
        ```
        - We are getting the `nftId` from the NFT we created earlier.
        - The minimum bid is 2 network tokens.
        - The number of blocks before the auction ends is 10.

        ```javascript
        const params = { 
        nftId:nftId,
        minBid:minBid,
        lenInBlocks:lenInBlocks,
        };
        ```
        - Since the `getSale` function expects an object, we need to create an object with the parameters.

    4. Adding `getSale` to the interface.

        ```javascript
        await ctcCreator.participants.Creator({
            // ++ Add get sale function.
            getSale: () => {
                return params;
            },
        })
        ```
    5. Adding `seeBid` function to the frontend.

        Ass you recall, the `seeBid` function from the [`backend`](4.AddingALocalStep/index.rsh) sends an `Address` and a `UInt` to the frontend.

        ```javascript
        await ctcCreator.participants.Creator({
            // ++ Add get sale function.
            getSale: () => {
                return params;
            },
            // ++ Add seeBid function.
            seeBid: (who, amt) => {
                let newBidder = stdlib.formatAddress(who)
                let newBid = stdlib.formatCurrency(amt)
                console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
            },
        })
        ```

    6. The `showOutcome` function will notify the frontend, when the contract is ready to begin the auction.

        ```javascript
        await ctcCreator.participants.Creator({
            // ++ Add get sale function.
            getSale: () => {
                return params;
            },
            // ++ Add seeBid function.
            seeBid: (who, amt) => {
                let newBidder = stdlib.formatAddress(who)
                let newBid = stdlib.formatCurrency(amt)
                console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
            },
            // ++ Add showOutcome function.
            showOutcome: (winner, amt) => {
                let newWinner = stdlib.formatAddress(winner)
                let newAmt = stdlib.formatCurrency(amt)
                console.log(`Creator saw that ${newWinner} won with ${newAmt}`)
            }
        })

        ```
    7. Adding it all up, this is how the [`index.mjs`](4.AddingALocalStep/index.mjs) interface looks.

        ```javascript
        import { loadStdlib } from '@reach-sh/stdlib';
        import * as backend from './build/index.main.mjs';

        // connector can be 'ETH', 'ALGO', or 'CFX'
        const stdlib = loadStdlib();


        // generate starting balance
        const startingBalance = stdlib.parseCurrency(100);
        // create test account
        const accCreator = await stdlib.newTestAccount(startingBalance);

        const theNFT = await stdlib.launchToken(accCreator, "bumple", "NFT", { supply: 1 });

        const ctcCreator = accCreator.contract(backend);

        await ctcCreator.participants.Creator({
            // ++ Add get sale function.
            getSale: () => {
                return params;
            },
            // ++ Add seeBid function.
            seeBid: (who, amt) => {
                let newBidder = stdlib.formatAddress(who)
                let newBid = stdlib.formatCurrency(amt)
                console.log(`Creator saw that ${newBidder} bid ${newBid}.`);
            },
            // ++ Add showOutcome function.
            showOutcome: (winner, amt) => {
                let newWinner = stdlib.formatAddress(winner)
                let newAmt = stdlib.formatCurrency(amt)
                console.log(`Creator saw that ${newWinner} won with ${newAmt}`)
            }
        })
        ```
    This is now enough for Reach to compile and run our program. Let's try by running

    ```cmd
    $ ./reach run
    ```

    Reach should now build and launch a Docker container for this application. Since the application doesn't do anything, you'll just see a lot of diagnostic messages though, so that's not very exciting.


    > The entire process that we just went through can be automated by running 
    > ```cmd
    > $ ./reach init
    >```
    >You can try this when you start your next project!

    ___
</details>

    

## Reach API

[APIs](https://docs.reach.sh/rsh/appinit/#rsh_API) are functions that can be called by the frontend
unlike **Participants** which are awaited by the backend.

