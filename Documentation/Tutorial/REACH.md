# NFT AUCTION
In this tutorial, we will deploy a reach contract that will be imported from the frontend (javascript).

1. A `Creator` will initialize the contract and provide three variables:

    - An NFT Token.
    - An initial bid.
    - A time limit.

2. Once these variables are provided, the `Creator` will then publish the contract onto the blockchain.

3. There after, a `Bidder` will be able to connect to the contract and view the `token_id`, `initial_bid`, and `time_limit`.

4. If the `Bidder` accepts the wager, the `Bidder` will place a bid and call the backend.

5. The auction will continue until time-lapse hits.

6. At timeout :
    - The winner will receive the NFT.
    - The `Creator` will receive the highest bid.
    - All `Bidders` who lost the auction will receive their funds back.

> NOTE :
> The `Creator` is anyone who deploys the contract.

> The `Creator` is a participant class that can take any acceptable variable name.

## Implementation

 1. [***Create an `index.rsh` and copy the following code.***](AddingAParticipant/index.rsh)

    [`index.rsh`](https://raw.githubusercontent.com/BMscis/reach-tutorial/Documentation/Tutorial/Chapters/backend/AddingAParticipant/index.rsh)

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

    - ***Reach Expression***
        + [Participant](https://docs.reach.sh/rsh/appinit/#rsh_Participant)
        
            A Participant in Reach represent a class that: 
            - Contains all functions that must be provided to the backend by the frontend.

            - Represents a unique user of the contract.

            > - The functions and variable represented in the Participant class will represent a user interface that the frontend will interact with.

        For instance, the contract above,

        ```javascript

        const Creator = Participant('Creator', {
            //Implement Creator interact interface here.
        });

        ```

        The Creator is initializer of the contract. Any frontend user that wants to deploy the contract will be the Creator.

        The Creator can be any variable name but can only be called once during the lifetime of the contract.

 2. [***Create an `index.mjs` file and add the following code.***](AddingAParticipant/index.mjs)

    [___index.mjs___](AddingAParticipant/index.mjs)

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

- ***Adding the `Creator` Interface.***

    In the next step, we'll add the creator interface that will interact with
    the frontend.

    - ***Creator***
    > Deployer and Creator are used interchangeably.

    - In order to implement the **Auction** the `Creator` will have to provide the following :

        > + An NFT token to be auctioned.
        > + A starting price for the auction.
        > + A duration for the auction.

    - Once the `Creator` provides this information, any `Bidder` can view the deployed contract on the blockchain.

3. [***Let's add a variable in `index.rsh` that does just that.***](AddingAParticipantInterface/index.rsh)

    1. First we will create an object that stores the `nftId`, `minBid` and `time-laps`

        ```javascript
        Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })
        ```

        - ***Reach Types***
            - [Token](https://docs.reach.sh/compute/types/#rsh_Token) 
                > Refers to a token in the network.

            - [UInt](https://docs.reach.sh/compute/types/#rsh_UInt) 

                > Refers to an unsigned integer.

    2. In order for the frontend to interact with the object, we need to define an `async` function that returns the object.

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

    3. The `Creator` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.

        ```javascript
        const Creator = Participant('Creator', {
            //++
            getSale: Fun([], Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })),
        });
        ```

        This is how the Creator will interact with the function in the javascript frontend.

        [___index.mjs___](AddingAParticipantInterface/index.mjs)

        ```javascript
        //++
        const params = { 
            nftId:nftId,
            minBid:minBid,
            lenInBlocks:lenInBlocks,
        };

        await ctcCreator.participants.Creator({
            // ++
            getSale: () => {
                return params;
            }
        })
        ```

- ***Adding the `Bidder` Interface.***

    The `Bidder` is an API

## Reach API

[APIs](https://docs.reach.sh/rsh/appinit/#rsh_API) are functions that can be called by the frontend
unlike **Participants** which are awaited by the backend.

