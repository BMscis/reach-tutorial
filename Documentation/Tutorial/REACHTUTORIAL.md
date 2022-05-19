# NFT AUCTION
In this tutorial, we will deploy a reach contract that will be imported from the frontend (javascript).

1. A `Creator` will initialize the contract and provide three variables:

    - An NFT Token.
    - An initial bid.
    - A time limit.

2. Once these variables are provided, the `Creator` will then publish the contract onto the blockchain.

3. Thereafter, a `Bidder` will be able to connect to the contract and view the `token_id`, `initial_bid`, and `time_limit`.

4. If the `Bidder` accepts the wager, the `Bidder` will place a bid and call the backend.

5. The auction will continue until time-lapse hits.

6. At timeout :
    - The winner will receive the NFT.
    - The `Creator` will receive the highest bid.
    - All `Bidders` who lost the auction will receive their funds back.

> NOTE :
> The `Creator` is anyone who deploys the contract.

> The `Creator` is a participant class that can take any acceptable variable name.

# Implementation

<details>
    <summary>
    <h2>Creating the Interface</h2>
    </summary>
    <p>

1. > ### Create an `index.rsh` and copy the following code.
    ___

    [___index.rsh___](p1/index.rsh)

    ```javascript
    'reach 0.1';

    export const main = Reach.App(() => {

        // Deployer of the contract.
        const Creator = Participant('Creator', {
            //Implement Creator interact interface here.
        });

        // Any subsequent bidder.
        const Bidder = API('Bidder', {
            //Implement bidder interact interface here.
        });
        init();
    });
    ```

    - ***Let's go through the code to see what is happening.***

        + `reach 0.1;` indicates that this is a Reach program. You'll always have this at the top of every program.

        + `export const main` defines the main export from the program. When you compile, this is what the compiler will look at.

        + `const Creator` specifies a `**Participant** class`  , `_Creator_`, who is the deployer of the contract.

        + `const Bidder` specifies an `**API**` class called `Bidder`. We are going to learn about API's later in the tutorial.

        +  `init()` marks the deployment of the Reach program, which allows the program to start doing things.

            > The `Creator` and `Bidder` constants above the `init()` function are what the backend expects the frontend to implement. 

    ___

3. > ### Adding the `Creator` Interfaces.

    ___

    In the next step, we'll add the creator interface that will interact with
    the frontend.

    - ***Creator***
        > Deployer and Creator are used interchangeably.

    - In order to implement the **Auction** the `Creator` will have to provide the following :

        > + An NFT token to be auctioned.
        > + A starting price for the auction.
        > + A duration for the auction.

    - Once the `Creator` provides this information, any `Bidder` can view the deployed contract on the blockchain.

    ***Let's add a function `getSale` in `index.rsh` that does just that.***

    1. The `Creator` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.
        ```javascript
        //++ Add getSale function.
        getSale: Fun([], Object({
            nftId: Token,
            minBid: UInt,
            lenInBlocks: UInt,
        })),
        ```
        Let's decipher the `getSale()` function :
        > - `Fun([], UInt)` is a Reach function that takes no arguments and returns a UInt.

        > - `Object({nftId: Token,minBid: UInt,lenInBlocks: UInt,})` is a Reach object that has the following properties :
        
        > - `nftId` is `Type` token.
        > - `minBid` is `Type` UInt.
        > - `lenInBlocks` is `Type` UInt.

    - Therefore, the `getSale()` function will be called by the backend, and it will expect the frontend to return an `Object` with the following properties :
        - `nftId`.
        - `minBid`.
        - `lenInBlocks`.

    This is how the Creator will interact with the function in the javascript frontend.

    2. Once the contract has been published onto the blockchain, we will need to notify the `Creator`'s frontend that the auction is ready to be deployed.

        ```javascript
        //++ Add auctionReady function.
        auctionReady: Fun([], Null)
        ```
    3. We also need to allow the Creator to see each bid in the auction.

        - SeeBid sends a `Bidder` `Address` and the latest bid `UInt` to the frontend.

        ```javascript
        //++ Add seeBid function.
        seeBid: Fun([Address, UInt], Null),
        ```

    4. Finally, we will also allow the creator to see the outcome of the auction.

        ```javascript
            //++ Add showOutcome function.
            seeOutcome: Fun([], Object({
                winner: Address,
                bid: UInt,
            })),
        ```
        > `SeeOutcome` sends the winner `Address` and the bid `UInt` to the frontend.
    
    Let's add these function into the `index.rsh` file

    [___index.rsh___](p2/index.rsh)

    > Add this to index.rsh.

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
            //Implement bidder interact interface here.
        });
        init();
    });
    ```
    ___

4. > ### Adding the `Bidder` Interfaces.

    ___

    The `Bidder` is an [API](https://docs.reach.sh/rsh/appinit/#rsh_API) that allows the frontend to interact with the backend.

    > This is how the function looks.

    ```javascript
    //++ Add this function to the Bidder interface.

    bid: Fun([UInt], Tuple(UInt,Address, UInt)),
    ```
    This is how it looks.

    [index.rsh](p3/index.rsh)

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
    });
    ```
    
    Let's break down the `bid()` function :
    - It takes in a `[UInt]` from the frontend, which is the bid amount.
    - It returns a `Tuple(UInt,Address, UInt)` from the backend, which we will implement later.

    </p>
</details>

<details>
    <summary>
        <h2>Interacting with the Blockchain</h2>
    </summary>
    <p>

> A [Reach Step](https://docs.reach.sh/rsh/step/) occurs after the `init()` function is called.

1. > ### Reach Steps

    ___

    - There are two kinds of steps :

    - > [Local Steps](https://docs.reach.sh/rsh/local/) 

        - Local steps are not processed by the blockchain. They are can only be accessed locally.

    - > [Consensus Step](https://docs.reach.sh/rsh/consensus/)

        - Consensus steps are processed by the blockchain. They are executed in the consensus network.

    ___

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

    [index.rsh](p4/index.rsh)

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

2. > ### Adding a test account.
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

        > Before we do that, we need to implement the `Creator` interface that we defined in [`index.rsh`](p4/index.rsh).

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

        Ass you recall, the `seeBid` function from the [`backend`](p4/index.rsh) sends an `Address` and a `UInt` to the frontend.

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
    7. Adding it all up, this is how the [`index.mjs`](p4/index.mjs) interface looks.

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

