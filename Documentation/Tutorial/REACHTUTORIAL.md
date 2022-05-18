# NFT AUCTION
In this tutorial, we will deploy a reach contract that will be imported from the frontend (javascript).
:large_orange_diamond:
1. :large_orange_diamond: A `Creator` will initialize the contract and provide three variables:

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

## Creating the Interface

1. > :large_orange_diamond: ### Create an `index.rsh` and copy the following code.
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

2. > :large_orange_diamond: ### Create an `index.mjs` file and add the following code.
    ___
    [___index.mjs___](p1/index.mjs)

    ```javascript
    import { loadStdlib } from '@reach-sh/stdlib';
    import * as backend from './build/index.main.mjs';

    const stdlib = loadStdlib();
    const startingBalance = stdlib.parseCurrency(100);
    const accCreator = await stdlib.newTestAccount(startingBalance);
    const ctcCreator = accCreator.contract(backend);

    await ctcCreator.participants.Creator({
        // Specify Creator interact interface here
    })
    ```

    - ***What's going on :*** 

        + `loadStdlib` imports the Reach standard library loader.

        + '`backend` imports your backend, which `./reach compile` will produce.

        - `./reach compile` will compile `index.rsh` above to `index.main.mjs` and will output the file to `build/index.main.mjs`.


        + `const stdlib` loads the [standard library](https://docs.reach.sh/frontend/#ref-frontends-js-loader) dynamically based on the [`REACH_CONNECTOR_MODE`](https://docs.reach.sh/tool/#cmd_REACH_CONNECTOR_MODE) environment variable.

        + `const startingBalance` defines a quantity of network tokens as the starting balance for each test account.

        + `const accCreator` creates a test account with initial endowments for the Creator.

            > - This will only work on the Reach-provided developer testing network.

        + `const ctcDeployer` has the Creator, deploy the application.

        + `await ctcDeployer.participants.Creator` will wait for instructions from the backend.

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

3. > :large_orange_diamond: ### Adding the `Creator` Interfaces.
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

4. > :large_orange_diamond: ### Adding the `Bidder` Interfaces.
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

## Interacting with the Blockchain

> A [Reach Step](https://docs.reach.sh/rsh/step/) occurs after the `init()` function is called.

1. > :large_orange_diamond: ### Reach Steps
    - There are two kinds of steps :

    - > [Local Steps](https://docs.reach.sh/rsh/local/) 

        - Local steps are not processed by the blockchain. They are can only be accessed locally.

    - > [Consensus Step](https://docs.reach.sh/rsh/consensus/)

        - Consensus steps are processed by the blockchain. They are executed in the consensus network.

2. > :large_orange_diamond: ### Interacting with the `Creator`.

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

3.> :large_orange_diamond: ### Adding it all into `index.rsh`

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
    Creator.publish(nftId, minBid, lenInBlocks);

    const amt = 1;

    commit();

    Creator.pay([[amt, nftId]]);

    Creator.interact.auctionReady();

    });

    ```
## Reach API

[APIs](https://docs.reach.sh/rsh/appinit/#rsh_API) are functions that can be called by the frontend
unlike **Participants** which are awaited by the backend.

