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

- ***Creating the Interface***

    1. [***Create an `index.rsh` and copy the following code.***](p1/index.rsh)

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

        - [***Create an `index.mjs` file and add the following code.***](p1/index.mjs)

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

    2. [***Adding the `Creator` Interfaces.***](p2/index.rsh)

        In the next step, we'll add the creator interface that will interact with
        the frontend.

        - ***Creator***
        > Deployer and Creator are used interchangeably.

        - In order to implement the **Auction** the `Creator` will have to provide the following :

            > + An NFT token to be auctioned.
            > + A starting price for the auction.
            > + A duration for the auction.

        - Once the `Creator` provides this information, any `Bidder` can view the deployed contract on the blockchain.

        [***Let's add a function `getSale` in `index.rsh` that does just that.***](p2/index.rsh)

        1. The `Creator` will be responsible for providing NFT data from the frontend. So let's add this function to the Creators interface and call it `getSale()`.
        
            ```javascript
            //Add this function to the Creator interface.
            getSale: Fun([], Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })),
            ```
        2. We also need to allow the Creator to see each bid in the auction.
    
            ```javascript

                seeBid: Fun([Address, UInt], Null),

            ```
            > SeeBid sends a `Bidder` `Address` and the latest bid `UInt` to the frontend.

        3. Finally, we will also allow the creator to see the outcome of the auction.

            ```javascript
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
        Let's decipher the `getSale()` function :
        - `Fun([], UInt)` is a Reach function that takes no arguments and returns a UInt.

        - `Object({nftId: Token,minBid: UInt,lenInBlocks: UInt,})` is a Reach object that has the following properties :
            - `nftId` is `Type` token.
            - `minBid` is `Type` UInt.
            - `lenInBlocks` is `Type` UInt.

        - Therefore, the `getSale()` function will be called by the backend, and it will expect the frontend to return an `Object` with the following properties :
            - `nftId`.
            - `minBid`.
            - `lenInBlocks`.

        This is how the Creator will interact with the function in the javascript frontend.

        [___index.mjs___](p2/index.mjs)

        > Add this to index.mjs

            ```javascript
            import { loadStdlib } from '@reach-sh/stdlib';
            import * as backend from './build/index.main.mjs';

            const stdlib = loadStdlib();
            const startingBalance = stdlib.parseCurrency(100);
            const accCreator = await stdlib.newTestAccount(startingBalance);
            const ctcCreator = accCreator.contract(backend);

            //++ Add params.
            const params = { 
                nftId:nftId,
                minBid:minBid,
                lenInBlocks:lenInBlocks,
            };

            await ctcCreator.participants.Creator({
                // ++ Add get sale.
                getSale: () => {
                    return params;
                }
            })
            ```
            - As you can see, the `getSale()` returns the `params` object.

    3. [***Adding the `Bidder` Interfaces.***](p3/index.rsh)

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
            //getSale function.
            getSale: Fun([], Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })),
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

    4. 

    
## Reach API

[APIs](https://docs.reach.sh/rsh/appinit/#rsh_API) are functions that can be called by the frontend
unlike **Participants** which are awaited by the backend.

