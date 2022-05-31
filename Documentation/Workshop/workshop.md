# NFT AUCTION

In this workshop we will design an application that allows a participant to put up their NFT for auction.

## Problem Analysis

The first step in any program design is to perform a problem analysis working backwards from the problem we want to solve to what we will need to solve it. We also have to assess the constraints and work within the margins of the tools we will use to solve the problem.

In our case, let's ask the questions we will need:

1. ### Who is involved in this application ?

    - Since it's an auction, we will have a minimum of two participants :
        > An `Auctioneer`
        > A `Bidder`

    - **For the `Auctioneer` we will ask a couple of questions :**

        1. What information does the `Auctioneer` know at the start of the program ?

            > The NFT being auctioned.
        
            > The starting bid of the NFT.

            > The amount of time the auction will take.

        2. What information are they going to discover and use ?

            > When the auction is ready.

            > When a `Bidder` places a bid.

            > When the auction is over.

        3. What transactions will they have to execute ?

            > The `Auctioneer` will have to deploy the contract.

            > The `Auctioneer` will also transfer the NFT to the contract.

            > The `Auctioneer` will receive the winning bid.

    - **Let's ask similar questions for the `Bidder` :**

        1. What information does the `Bidder` know at the start of the program ?

            > The `Bidder` will not know anything until they connect to the contract.

        2. What information are they going to discover and use ?

            > The `Bidder` will discover, the NFT being auctioned.

            > The `Bidder` will discover whether their bid is higher than the last placed bid.
            
            > The `Bidder` will also discover whether they won the auction.


        3. What transactions will they have to execute ?

            > The `Bidder` will pay to place a bid.

            > The `Bidder` will be reimbursed once if they lost the auction.

            > The `Bidder` will receive the NFT if they won the auction.


## Data Definitions

Once we have defined our problem analysis, it's time to convert the information into data that can be parsed by Reach language.

We can deduce the data types from the problem analysis by asking ourselves some questions :

1. ***What data types will be used to represent the information ?***

    > We can use reach [Types](https://docs.reach.sh/rsh/compute/#ref-programs-types) as guidance to choose which types we can use to represent our data.

    1. What data type will represent the `Auctioneer` ?

        - The `Auctioneer` and the `Bidder` will require their states to persist over time. Therefore, they will be represented by a reach [`participant`](https://docs.reach.sh/model/#term_participant).

        1. #### [Auctioneer]()

        The auctioneer will represent a [participant](https://docs.reach.sh/model/#term_participant) interface who will be provided with functions depending on the information they know or need to know :

        - If the `Auctioneer` knows the NFT being auctioned, they will need to [`interact`](https://docs.reach.sh/rsh/local/#rsh_interact) with the frontend to get this information into the backend.

        - If the `Auctioneer` learns something new, then it will be passed as a `argument` to a `function`.

        - If the participant provides something later, then it will be passed as a `return` value from a `function`.

    2. What data type will represent the `Bidder` ?

        - The bidder on the other hand, will also represent a [participant](https://docs.reach.sh/model/#term_participant) interface.

        1. #### [Bidder]()

        However, since we expect multiple bidders, and expect them to race to get the highest bid, Reach provides a [race](https://docs.reach.sh/rsh/step/#race) expression that does just that. 

        Since we need to represent multiple bidders and expect them to race by placing a bid, we will use Reach [API](https://docs.reach.sh/model/#term_API). Reach [API](https://docs.reach.sh/model/#term_API) represents multiple participants so that any other participant other than the auctioneer can call the bid function.


    3. What data type will be used to represent the "NFT" ?

        - The NFT will be represented as a mintable token. Reach [Types](https://docs.reach.sh/rsh/compute/#ref-programs-types) provide a [Token](https://docs.reach.sh/rsh/compute/#rsh_Token) `type` that can be used to represent a mintable token.

    4. What data type will be used to represent the "bid" ?

        - The bid will be represented as a [`UInt`](https://docs.reach.sh/rsh/compute/#rsh_UInt) that will be used to represent the amount of tokens that the bidder is willing to pay.
    
    5. What data type will be used to represent the "time" ?

        - Since the time will be measured in block height, we will use a [`UInt`](https://docs.reach.sh/rsh/compute/#rsh_UInt) to represent the time.

    6. What data type will be used to represent a `bidder` or a `winner` ?

        - The winner will be represented as an [`Address`](https://docs.reach.sh/rsh/compute/#rsh_Address) interface.

## Function Definitions

As we said, we expect the `Auctioneer` and the `Bidder` to interact with the frontend and the backend. This means we expect them to have a means of fetching and storing state. We can define the functions that will be used to interact with the frontend and the backend.

1. ***What functions will be used to pass information from the frontend to the backend ?***

    1. #### [Auctioneer]() interact

        1. How will the auctioneer pass the NFT from the frontend to the contract ?

        2. How will the auctioneer pass the minimum bid from the frontend to the contract ?

        3. How will the auctioneer pass the auction duration from the frontend to the contract ?

        > The auctioneer will have to interact with the frontend to get the information it needs to run the auction.

        <details>
        <summary>
        <h3>

        Suggested Solution.
        </h3>

        We can suggest a `getSale` function that awaits the frontend to send the NFT id, the minimum bid and the auction duration.
        </summary>
        <p>

        ```javascript

        // Deployer of the contract.
        const Auctioneer = Participant('Auctioneer', {
            //getSale function.
            getSale: Fun([], Object({
                nftId: Token,
                minBid: UInt,
                lenInBlocks: UInt,
            })),
        });

        ```

        </p>
        </details>

    2. #### [Bidder]()

        1. How will the bidder pass the bid from the frontend to the contract ?

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


2. ***What functions will be used to make the participants learn new information ?***

    > As we said, every time a participant learns new information, they will be passed as an argument to a `function` which is expected by their frontend.

    1. #### How will the [Auctioneer]() learn new information.

        1. How will the auctioneer learn the auction is ready ?

        <details>
        <summary>
        <h3>

        Suggested Solution.
        </h3>

        We can suggest an `auctionReady` function that alerts the auctioneers' frontend that the auction is ready.
        </summary>
        <p>

        ```javascript

        // Deployer of the contract.
            const Auctioneer = Participant('Auctioneer', {
                //auctionReady function.
                auctionReady: Fun([], Null),
            });
        ```

        </p>
        </details>

        2. How will the auctioneer learn when a bid is placed ?

        <details>
        <summary>
        <h3>

        Suggested Solution.
        </h3>

        We can suggest an `seeBid` function that shows the auctioneers' frontend that a bid has been placed by sending a `bid` and an [`Address`](https://docs.reach.sh/rsh/compute/#rsh_Address).
        </summary>
        <p>

        ```javascript

        // Deployer of the contract.
            const Auctioneer = Participant('Auctioneer', {
                //seeBid function.
                seeBid: Fun([Address, UInt], Null),
            });
        ```

        </p>
        </details>

        3. How will the auctioneer learn that the auction is over ?

        <details>
        <summary>
        <h3>

        Suggested Solution.
        </h3>

        We can suggest a `timeout` function that alerts the auctioneers` frontend that the auction is over.
        </summary>
        <p>

        ```javascript

        // Deployer of the contract.
            const Auctioneer = Participant('Auctioneer', {
                //timeout function.
                timeout: Fun([], Null),
            });
        ```

        </p>
        </details>

        > The auctioneer will learn new information in the course of the auction, and we need to find a way of communicating this information.

        > The auctioneer will have to have corresponding functions on their frontend to receive `arguments` passed by the backend.

    2. #### How will the [Bidder]() learn new information.

        
