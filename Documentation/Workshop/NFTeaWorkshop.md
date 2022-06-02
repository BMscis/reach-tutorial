# [NFT WORKSHOP WITH REACH](#nft-workshop-with-reach)
<details>
<summary>

# [Introduction](#introduction)
</summary>

Welcome to my NFT auction workshop! This workshop will teach you the basics of programming a NFT auction using the reach programming language. Reach is a powerful and easy to use programming language that is perfect for creating NFT auctions. This workshop will cover the following topics:

1. Common Terminologies.

1. Define the use case and requirements for the DApp.

2. Choose a suitable blockchain platform on which to build the DApp.

3. Develop the DApp using the chosen blockchain platform’s programming language and tools.


I hope you enjoy this workshop!

In this workshop, we will be introducing the NFT auction workshop and the reach programming language.
> The purpose of the workshop is to walk you through the thought process that went into developing the DApp. If you are looking for a step-by-step approach, please refer to the [NFT Auction Tutorial](https://github.com/BMscis/reach-tutorial/blob/workshop/Documentation/Tutorial/Full/full.md).

</details>
<details>

<summary>

# [Common Terminologies](#common-terminologies)
</summary>

  ## [What is an auction?]()

  An auction is a process of buying and selling goods or services by offering them up for bid, taking bids, and then selling the item to the highest bidder.

  ## [What is a NFT?]()
  A NFT is a non-fungible token. This means that each NFT is unique and not interchangeable with any other NFT.

  ## [What is a DApp?]()

  A DApp is a type of decentralized application that is governed by a set of rules encoded on the blockchain.

  ## [What is a smart contract?]()

  A smart contract is a computer program that runs on the blockchain and automatically executes transactions when certain conditions are met.

  ## [What is a token?]()

  A token is a digital asset that is used to represent a stake in a decentralized application. Tokens can be used to purchase goods and services, or to participate in governance.

  ## [What is a blockchain?]()

  A blockchain is a distributed database that is used to store data in a secure and tamper-proof way. Blockchains are used to power decentralized applications.
</details>
<details>
<summary>

## [Defining the Use Case and Requirements](#defining-the-use-case-and-requirements)  

</summary>
<p>
<ul>
<li>

## Use Cases

A NFT auction is a mechanism for exchanging NFTs between participants. The use case is to allow two or more parties to trade NFTs without the need for a third-party intermediary. The requirements are that the auction be secure, transparent, and efficient.
</li>
<li>

## Requirements.

- You will need [Reach Programming language](https://docs.nftworkshop.com/en/latest/getting-started.html) installed on your computer. We are going to use Reach for our backend contract.

- One of the advantages of Reach is that it can support multiple blockchains and can be compiled to [different programming languages](https://docs.reach.sh/guide/rpc/#guide-rpc). For simplicity we will use [Reach in JavaScript](https://docs.reach.sh/frontend/#ref-frontends). This means we will need [NodeJs](https://nodejs.org/en/) installed.
</li>
</ul>
</p>
</details>

<details>
<summary>

## [Choosing a Blockchain Platform](#choosing-a-blockchain-platform)       
</summary>
<p>

Reach is a programming language that supports multiple blockchains, including Algorand, Ethereum, and Conflux. This allows developers to create applications that can interact with multiple blockchain networks. This makes Reach a powerful tool for building cross-chain applications.

What this means is that we can write just one contract and let Reach deal with the complexities of deploying it to multiple blockchains.

You can learn more about that here:

👉 [Using Reach with multiple blockchains](https://docs.reach.sh/networks/#ref-network-algo)
</p>
</details>

<details>
<summary>

## [Developing the DApp](#developing-the-dapp)       

Developing the DApp using Problem Analysis and Problem Design.
</summary>
<p>

<details>
<summary>

### Problem Analysis

Now that we have a basic understanding of the concepts we need to know, we can start to ask some critical questions.
</summary>
<p>

As a programmer we need to understand the problem that we are trying to solve. Here's a run through of the questions that pop up in my head.

1. What is the purpose of the auction?

> The purpose is to create a DApp that autonomously runs a safe and secure auction that allows users to buy and sell items.

2. What is the value of the NFT being auctioned?

> The value of the NFT is determined by the owner of the NFT.

3. What is the minimum bid?

> For simplicity, we can use the asset price as the minimum bid.

4. What is the duration of the auction?

> The duration of the auction can be fixed or can be determined by the deployer of the DApp.

5. How will the auction be conducted?

> The auction will be conducted by the DApp itself.

6. What is the NFT being auctioned?

> Again, for simplicity, we will limit the auctioned NFT's to images.

7. How many bidders are there?

> Ideally, we would love to have as many bidders as possible.

10. When is the auction over?

> The auction will be over when the auction duration has elapsed.

11. How will the auction be secured?

> The auction will be secured using Reach programming language.
</p>

These questions are pertinent to the development of an internal conversation. However, 
because we are developing a DApp, we can reframe the problem by limiting the questions 
to defining the data that we expect the DApp to handle:

<details>
<summary>

#### Performing Data Analysis.

Turning the information, we know to data.
</summary>
<p>
<ol>
<li>


##### What information does the DApp need to track?


- The NFT being auctioned.

- The NFT price.

- The NFT amount.

- The auction duration.

- The NFT owner.

- The last bid.

- The latest bid.

- Bidder Address.
</li>
<li>


##### What information does the DApp need to display?


Each participant in the auction will require the following information:

- The NFT being auctioned.

- The NFT price.

- The NFT amount.

- The auction duration.

However, depending on the role of the participant, the auction may limit how much information each participant has access to.

If the participant is an auctioneer, for example, they can access functions that only they have access to. Such as:

- Adding an NFT to the contract.

- Deciding when the auction will start.


The bidder, on the other hand, does not need to know much. In fact, once a bidder joins the DApp, all they need to see is the highest bid price.
</li>
<li>


##### How should the app handle user input?


The DApp needs to differentiate private data and public data. Private data should only be accessible to a local computer while public data can be displayed
on the blockchain.
</li>

</ol>
</p>
</details>
<details>
<summary>

#### Functional Requirements.

In this section, we look at the functions provided by the Reach language that we can use to run the auction.
</summary>
<p>
<ol>
<li>


##### How can we create a new DApp in Reach.


We'll have to take a look at the Reach syntax to conform to the methods available to us?
</li>
<li>


##### How will we send the NFT to the contract?


To ensure that the DApp is truly decentralized, we'll need the deployer to forfeit ownership of the NFT until the 
auction is over.
</li>
<li>


##### How can we publish the NFT being auctioned to the blockchain.


We'll have to make the NFT information public to all participants.
</li>
<li>


##### How can we allow a bidder to OPT-IN to the DApp.


There has to be a frontend mechanism that allows the bidder to opt-in to the DApp
and place a bid.
</li>
<li>


##### How will we perform transfers?


Once the auction is done, we'll need to transfer the highest bid to the Auctioneer and the NFT to the winner.
</li>
</ol>
</p>
</details>
<details>
<summary>

#### Consensus Mechanisms.

We'll also need to look at what Reach offers when it comes to consensus.
</summary>
<p>

Reaching consensus means that all parties involved in a decision-making process agree on a course of action. This can be difficult to achieve, especially when there are multiple stakeholders with different interests and goals. However, consensus can be reached through careful deliberation and compromise.

<ol>
<li>


##### How can we ensure that the auction is conducted in a safe and secure manner?

</li>
<li>


##### How can we secure data that is private?

</li>
<li>


##### How can we run an open auction on the blockchain?

</li>
</ol>
</p>
</details>
</details>

<details>
<summary>

### Problem Design

Let us attempt to respond to the questions raised at [Problem Analysis](#problem-analysis).
</summary>
<p>

The goal of this workshop is to establish a NFT auction and have bidders race to see who can make the biggest bid in the shortest amount of time.

Let's go through some of the questions we need to address before we can start designing the DAPP.

#
<ol>

<li>

<details>
<summary>

#### [In which programming language will we build our DAPP?]()


[Reach](https://docs.reach.sh/#reach-top) is a domain-specific language for developing distributed applications. 
</summary>

<ol>
<li>
<details>
<summary>


##### [Reach Module](https://docs.reach.sh/rsh/module/)


The [Reach Module](https://docs.reach.sh/rsh/module/) must begin with a `version type` on the first line and stored in a `index.rsh` file.

</summary>
<p>

> index.rsh

```javascript
'reach 0.1';
```

> [Reach Syntax](https://docs.reach.sh/model/#ref-model-syntax) is written in **JavaScript** syntax.
</p>
</details>

</li>

<li>
<details>
<summary>


##### [Reach App](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).


The [Reach App](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs) specifies the DAPP in it's entirety. It is the body of the DAPP.
</summary>
<p>

Reach uses [Module-level Identifiers](https://docs.reach.sh/rsh/module/#ref-programs-export) such as [export](https://docs.reach.sh/rsh/module/#ref-programs-export) to identify the module to be compiled.

> index.rsh

```javascript
export const main = Reach.App(() => {
  //DAPP body.
})
```

> The'main' function will contain all the functions we want to perform.
</p>
</details>

</li>

<li>
<details>
<summary>


##### [Reach Participant](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).


A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor that participates in a DAPP and is assigned an address on the consensus network. A Reach participant is capable of storing persistent data on the local state.
</summary>
<p>

> index.rsh

```javascript
export const main = Reach.App(() => {
  //DAPP body.
  const Auctioneer = Participant('Auctioneer', {
      //Auctioneer body
  });
})
```

> All the functions that the 'auctioneer' will need to perform will be housed within the 'Auctioneer body.'
</p>
</details>

</li>

<li>
<details>
<summary>


##### [Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API).


A [Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API) is a group of [Reach Participants](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs) competing in a DAPP to achieve the same goal.
</summary>
<p>

> index.rsh

```javascript
export const main = Reach.App(() => {
  //DAPP body.
  const Bidder = API('Bidder', {
      //Bidder interface.
  });
})
```
> The primary distinction between a 'Reach Participant' and a 'Reach API' is that the latter can be called from the actors' frontend.

> The 'Bidder Interface' will contain all the functions that the 'bidder' will need to perform.
</p>
</details>

</li>

</ol>

</details>

</li>

<li>

<details>
<summary>

#### [Thinking Data Analysis.](#performing-data-analysis)

To decide which types to use to represent our data, we can use reach [Types](https://docs.reach.sh/rsh/compute/#ref-programs-types).
</summary>

We can examine our expected input and output and attempt to convert all of that information to [Reach Types.](https://docs.reach.sh/rsh/compute/#ref-programs-types)
<ol>

<li>
<details>
<summary>



##### Processing Output Data



Let's look at the `Reach Types` that we'll be using to represent our output data.
</summary>
<p>


##### Announcing a winner at the end of the auction.


- We will need the participant to learn new information in order to announce a winner:

  1. The winning bid.

  2. The Winner.


- How do we represent these two pieces of data in a DAPP?

  1. The winning bid can be represented by a [UInt type](https://docs.reach.sh/rsh/compute/#rsh_UInt).

  2.  The winner can be represented by a [Address type](https://docs.reach.sh/rsh/compute/#rsh_Address).


</p>
</details>
</li>

<li>

<details>
<summary>


##### Processing Input Data

##


Let's look at the 'Reach Types' we'll be using to represent our input data.
</summary>
<p>


##### Adding the NFT for the auction.


- We will need the following data to add a NFT to the contract:

  1. The NFT ID.

  2. The NFT price / starting bid.

  3. The auction duration.


- How can we represent this information in a DAPP ?

  1. To represent the NFT ID, we can use a [Token type](https://docs.reach.sh/rsh/compute/#rsh_Token).

  2. Because the price is a number, we can represent it with a [UInt type](https://docs.reach.sh/rsh/compute/#rsh_UInt).

  3. We can represent the auction duration with a [UInt type](https://docs.reach.sh/rsh/compute/#rsh_UInt), which will represent block height rather than actual time.


</p>
</details>

</li>
</ol>

</details>

</li>


<li>

<details>
<summary>

#### [Testing Functional Requirements.](#functional-requirements)

To decide which types to use to represent our data, we can use the Reach [Functions type](https://docs.reach.sh/rsh/compute/#rsh_Fun).
</summary>

Reach [Functions type](https://docs.reach.sh/rsh/compute/#rsh_Fun) will be useful for more efficiently arranging input and output data.

<ol>

<li>
<details>
<summary>


##### Output Functions.



Output functions that will notify our frontend.
</summary>
<p>
<ol>

<li>


##### [At the end of the auction, a winner is announced.](#show-outcome)


- We will need the participant to learn new information in order to announce a winner:

  1. The winning bid.

  2. The Winner.


- We've already established how to represent data; now let's look at how to send this information to the frontend.

```javascript

//showOutcone function.
showOutcome: Fun([Address, UInt], Null),

```

`showOutcome` is a function that does not expect a return value and sends the `[Address, UInt]` which are the '[winner, winning bid]' to the frontend.
</li>

<li>


##### [Transferring the NFT to the winner.](#transfer-nft)


- We will need to transfer the NFT from the contract to the winner once the auction is completed.

- Reach provides a [Transfer function](https://docs.reach.sh/rsh/compute/#rsh_transfer), which is a consensus step that instructs the contract to send a token to the specified address.

```javascript

transfer(`UInt`,`Token`).to(`Address`);
```

When a condition is met, `transfer` takes a `amount` (`UInt`), a `Token`, and transfers the amount to an `Address`.
</li>
<li>


##### [Transferring the highest bid to the auctioneer.](#transfer-amount)


- Once the auction is over, we must transfer the highest bid to the auctioneer.

- Reach provides a [Transfer function](https://docs.reach.sh/rsh/compute/#rsh_transfer), which is a consensus step that instructs the contract to send a token to the specified address.

```javascript

transfer(`UInt`).to(`Address`);
```

When a condition is met, `transfer` takes a `amount` (`UInt`) and transfers it to a `Address`.
</li>
</ol>

</p>
</details>
</li>

<li>
<details>
<summary>


##### Input Functions.



Input functions will be used to inform our frontend about what the backend expects, as well as to call backend functions from the frontend.
</summary>
<p>
<ol>

<li>


##### [Receiving the NFT to be auctioned from the frontend.](#get-sale)


Because it is the auctioneers' responsibility to include the NFT in the contract, we will ensure that only the Auctioneer is capable of setting the NFT.

We can use an 'interact' function to obtain information from the frontend whenever a participant backend requires it.

Here is the information we will require from the auctioneer:

1. The NFT ID.

2. The NFT price / starting bid.

3. The auction duration.


- We've already determined how to represent the data; now let's look at how to get this information from the frontend.

```javascript
//getSale function
  getSale: Fun([],[Token, UInt, UInt]),
```

`getSale` function expects the [Token, UInt, UInt]/([nftId, price, auctionTime]) from the frontend.

Reach also includes an [Object](https://docs.reach.sh/rsh/compute/#rsh_Object) type for nesting other types.

```javascript
Object({
  nftId: Token,
  minBid: UInt,
  lenInBlocks: UInt,
})
```

Let's add this to the function:

```javascript
getSale: Fun([], Object({
  nftId: Token,
  minBid: UInt,
  lenInBlocks: UInt,
}))
```
</li>

<li>


##### [Allowing a bidder to place a bid.](#place-bid)


- Bidders must also place a bid, i.e., call a bid function from the frontend.

```javascript

bid: Fun([UInt], Null),

```

`bid` expects a number from the frontend which a Bidder address will be attached to during the auction.
</li>

<li>


##### [Alerting when the auction is ready.](#auction-ready)


- When the auction is ready to begin, we can also notify the Auctioneer.

```javascript

auctionReady: Fun([], Null),

```

`auctionReady` notifies the Auctioneer frontend when the auction is ready.
</li>

</ol>

</p>
</details>
</li>
</ol>
</details>
</li>

<li>

<details>
<summary>

#### [Looking at Consensus Mechanisms.](#consensus-mechanisms)

Introduction to [Reach Steps](https://docs.reach.sh/rsh/step/)
</summary>

In this section, we will introduce new concepts that will help you understand how Reach works.

Reach can be in two states:
- Local step
- Consensus step

The majority of DAPPs include a creator, an actor, a wager, and a condition. Before a contract becomes autonomous, the creator publishes the wager and condition criteria. Once the creator has done this, they have no control over the outcome and cannot pause the contract once it has begun. The bidder can view the contract on the blockchain and decide whether to participate.

Local steps are performed locally by a single actor, whereas consensus steps are performed on the blockchain in consensus.
Local steps exist to ensure that each actor is unaware of what any other actor is up to in order to improve anonymity and security. 

If they choose to make the information public, they must go through a consensus step and publish it on the blockchain.
Consensus steps also ensure that the contract's core logic and conditions are run on the blockchain, where all active actors can see what is happening.

Let's go over the tasks that we'll need to complete in order to have a successful auction:
<ol>

<li>
<details>
<summary>


##### [Adding Actors]()

##


We've already decided [how we'll represent our data](#data-types), and we've established [functions that can be used](#functions) to get the necessary data; the last step is to incorporate the functions into classes that can perform logic and store states. They are referred to as [Participants](https://docs.reach.sh/rsh/appinit/#rsh_Participant) in Reach.
</summary>
<p>
<ol>

<li>


##### [Adding an Auctioneer Participant]()


- We saw how to collect data using input and output functions in the [functions](#functions) section; now let's add the necessary data to our auctioneer participant.

```javascript
const Auctioneer = Participant('Auctioneer', {
  //getSale function.
  getSale: Fun([], Object({
      nftId: Token,
      minBid: UInt,
      lenInBlocks: UInt,
  })),
  //auctionReady function.
  auctionReady: Fun([], Null),

  //seeBid function.
  seeBid: Fun([Address, UInt], Null),

  //showOutcome function.
  showOutcome: Fun([Address, UInt], Null),
});
```
- Here, we create an Auctioneer participant with the name 'Auctioneer' and the auction data.

- We used the [`getSale`](#get-sale) function to get the NFT data from the frontend.

- We used the [`auctionReady`](#auction-ready) function to notify the Auctioneer when the auction is ready.

- We used the [`seeBid`](#see-bid) function to notify the Auctioneer when a bidder has placed a bid.

- We used the [`showOutcome`](#show-outcome) function to notify the Auctioneer when the auction is over and who the winner is.

</li>

<li>


##### [Adding a Bidder Participant.]()


- A participant class will also be used for the bidder. However, unlike the Auctioneer, who is a single actor, we anticipate that multiple bidders will be added to the contract.

- Reach provides a way of representing multiple participants with the [Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API) class.

- Consider the API to be a representation of multiple participants racing toward a common goal.

- In our case, we anticipate that Bidders will be able to [place a bid](#place-bid).

```javascript
const Bidder = API('Bidder', {
  //Bidder interface.
  bid: Fun([UInt], Tuple(UInt,Address, UInt)),
});
```
- A Bidder interface is available for representing multiple bidders.

- Each bidder will have a [bid](#place-bid) function through which they can place a bid.

> One benefit of the Reach API is that functions can be called from the frontend.

</li>

</ol>

</p>
</details>
</li>

<li>
<details>
<summary>



##### [Initializing the contract.](https://docs.reach.sh/rsh/appinit/#init)

##


What happens after the actors/participants are created.
</summary>
<p>

So far we've only discussed the API and the Participant. However, there are
other [Reach interfaces](https://docs.reach.sh/rsh/appinit/#ref-programs-appinit-exprs) that we have not covered include [Views](https://docs.reach.sh/rsh/appinit/#ref-programs-appinit-view) and [Events](https://docs.reach.sh/rsh/appinit/#rsh_Events).

These interfaces represent which functions and classes the frontend should replicate and should be placed before the 'init()' statement.

```javascript

const newParticipant = Participant(participantName, participantInteractInterface)

const newAPI = API(APIName, APIInteractInterface)

const newView = View(ViewName, ViewInteractInterface)

const newEvent = Events(EventName, EventInteractInterface)

init()

// Consensus step or local step.
```
`init()` symbolizes the beginning of the DApp to be compiled. In other words, anything that follows the `init` statement is either a local step or a consensus step.
</p>
</details>
</li>

<li>
<details>
<summary>



##### [Using Local Steps.](https://docs.reach.sh/model/#term_local%20step)

##


What follows the 'init()' statement.
</summary>
<p>

<ul>
<li>


##### [Local Private](https://docs.reach.sh/model/#p_33) Step.

When the 'init()' statement is executed, the DApp enters a [local private](https://docs.reach.sh/model/#p_33) step.
This means that any information accessed is only available on the participant's local machine.
</li>
<li>


##### [Local Public](https://docs.reach.sh/model/#p_33) Step.

Local private is not very useful if we have information that we need other actors to access, such as NFT data.
So, how do we make the transition from local private to local public?

- To accomplish this, we use [Reach declassify](https://docs.reach.sh/rsh/local/#rsh_declassify).

> [Reach declassify](https://docs.reach.sh/rsh/local/#rsh_declassify) allows you to send data from the frontend to the backend. To get the NFT information from the frontend, let's test this with the 'Auctioneer' participants' ['getSale'](#get-sale) function.

```javascript
//declassify function.
Auctioneer.only(() => {
  const {nftId, minBid, lenInBlocks} = declassify(interact.getSale());
});
```
- `Auctioneer.[only]()` function makes sure that only the `Auctioneer` i.e., the creator of the contract, can access this function.

- `interact` is a function used to get information from the frontend.

- `declassify` makes the information public.

> Here, we are interacting with the `Auctioneer` frontend and `await`ing the result (const {nftId, minBid, lenInBlocks}).

The information is public but it's still local. Let's move to a consensus step to publicize the information on the contract.
</li>
</ul>


</p>
</details>
</li>

<li>
<details>
<summary>



##### [Using Consensus Steps.](https://docs.reach.sh/rsh/consensus/#ref-programs-consensus)

##


Publishing information onto the contract.
</summary>
<p>

Reach provides a few mechanisms that can assist us in moving from a local step to a consensus step.

<ol>
<li>


##### [Publish](https://docs.reach.sh/rsh/consensus/)


We can use [Reach Publish](https://docs.reach.sh/rsh/consensus/) to share NFT information with the contract during the consensus step.

```javascript
Auctioneer.publish(nftId, minBid, lenInBlocks);
```
- `Auctioneer.publish()` function makes sure that only the `Auctioneer` i.e., the creator of the contract, can publish this information 
onto the contract.
</li>

## 
> Using [Commit()](https://docs.reach.sh/rsh/consensus/#rsh_commit)

Once in a consensus step, we can use [Commit()] to return to a local step (https://docs.reach.sh/rsh/consensus/#rsh_commit).

How does this help the integrity of the DApp?
- Security reasons

We use commit to ensure that we are back in a 'local private' state before performing sensitive functions like contract payments.

```javascript

commit();

```

<li>


##### [Pay](https://docs.reach.sh/rsh/step/#rsh_pay)


We can now transfer the NFT from the Auctioneer to the contract because we are back in a 'local private' step.

```javascript
Auctioneer.pay([[1, nftId]])
```
- The `Auctioneer.pay()` function ensures that only the `Auctioneer`, i.e., the contract's creator, can pay.
- We are submitting one NFT Token for auction to the contract.
</li>

> Because an NFT should be unique, we send [1] NFT. Rather than sending the 'UInt 1' directly, we can store the information in a variable.

```javascript
const amt = 1;
```

Then, Pay becomes :
```javascript
Auctioneer.pay([[amt, nftId]])
```

The DApp now has the information it needs to conduct an auction. The auction logic is all that remains. But first, let us inform the Auctioneer that the [auction is ready](#auction-ready).

```javascript
Auctioneer.interact.auctionReady();
```
<li>

#### [Timeout](https://docs.reach.sh/rsh/step/#rsh_timeout)

Every auction has a time limit, our auction is no exception. 

An important concept in a blockchain is that of time. Reach keeps track of time in various ways, one way is to record the last time the contract was in consensus. What this means is any time a contract moves from a local step and uses a consensus step, it is recorded. Reach provides a function to get the last consensus time.

```javascript
const lastConsensus = lastConsensusTime();
```
In order, to set our timeout, we are going to get the `lastConsensusTime` and add the `lenInBlocks` to it.

```javascript
const end = lastConsensus + lenInBlocks;
```

We have established our timeout, we will see how to use it in the next step.
</li>
</ol>
</p>
</details>
</li>

</ol>

</details>
</li>

<li>

<details>
<summary>

#### [What consensus transfer can we use for the auction ?](https://docs.reach.sh/guide/ctransfers/#guide-ctransfers)

Now let's take a look at the consensus transfer that we can use for the auction.
</summary>
<p>

When it comes to consensus transfer, or when multiple actors come together to agree on a single state, we can determine which consensus approach to use by asking ourselves a few [questions](https://docs.reach.sh/guide/ctransfers/#p_10):

1. How many participants can act at a particular time?

2. How many things can be done?

3. How many times can it be done?

##

We could use [Pay](https://docs.reach.sh/rsh/step/#publish—-pay—-when—and—timeout) to transfer tokens to the contract if there was only one participant. However, because multiple bidders are expected to compete, we can use a [Reach Race](https://docs.reach.sh/rsh/step/#rsh_race).
A reach race allows multiple actors to compete for the publication of a consensus step. 

However, there is a problem with this solution; the race function only runs once, and we need to allow bidders to place as many bids as they want as long as two conditions are met:

- The bid is placed before timeout.

- The bid placed is larger than the last bid placed.

##

We need to put the race in a while loop that allows us to do this. A while loop that runs until timeout is reached.

Alternatively, [Reach Parallel Reduce](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce) can be used. In a parallel, actors are racing against the clock to publish data onto the contract.
Parallel reduce uses a while loop that resolves the auction to a single outcome or winner.

Parallel reduce is a recursive algorithm that generates a single winner from a tree of bidders.

```javascript
  const [winner] = parallelReduce([Auctioneer])
```

> The Auctioneer is the default winner before any bids are placed.

However, this is not a complete solution; for a closer look at the format, see [Reach Parallel Reduce](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce).
For now we're going to look at how we can use parallel reduce for the auction.

<ul>
<li>


##### [The Invariant](https://docs.reach.sh/rsh/consensus/#rsh_parallelReduce.invariant)


```javascript
.invatiant(balance() == 0)
```
After each iteration, the invariant is checked to ensure that the parallel reduce is still valid. We're checking to see if the balance is zero.
</li>
<li>


##### [The While loop](https://docs.reach.sh/rsh/consensus/#rsh_while)


```javascript
.while(lastConsensusTime() < timeOut)
```
The while loop is active as long as the [lastConsensusTime](https://docs.reach.sh/rsh/compute/#rsh_lastConsensusTime) is less than the time-out value.
> The time of the last consensus step is represented by the lastConsensusTime (The last time a pay, publish or transfer was used).
</li>
<li>

#### [The api function](https://docs.reach.sh/rsh/step/#p_41)

Parallel reduce accommodates functions that can be called at each iteration of the while loop. One such function is the `.api()` function.

This functions can be used to call any function from the API interface. Remember our Bidder interface:

```javascript
const Bidder = API('Bidder', {
  //Bidder interface.
  bid: Fun([UInt], Tuple(UInt,Address, UInt)),
});
```
We can now call the `bid` function from within the parallel reduce.
But before we do that, let's look at the expected structure of the `.api()` function.

```javascript
.api(API_EXPR,
  API_ASSUME_EXPR,
  API_PAY_EXPR | [API_PAY_EXPR, PAY_REQUIRE_EXPR],
  API_CONSENSUS_EXPR)
```
- `API_EXPR` is the function that is being called. In our case, the `API_EXPR` will be:
```javascript
.api(Bidder.bid)
```
- `API_ASSUME_EXPR` calls [Reach Assume](https://docs.reach.sh/rsh/local/#rsh_assume), a boolean function. In our case, we'll use this to confirm whether the latest bid is larger than the last bid in a **local step**.

```javascript
((bid) => { assume(bid > lastPrice, "bid is too low"); })
```
- `API_PAY_EXPR` is the `api pay` expression that sends money to the contract.
```javascript
((bid) => bid)
```
- `API_CONSENSUS_EXPR` is consensus expression that checks that all participants are in consensus and can also be used to notify the frontend of the API call.
```javascript
((bid, notify) => {
    require(bid > lastPrice, "bid is too low");
    notify([bid,highestBidder, lastPrice]);
    if ( ! isFirstBid ) {
        transfer(lastPrice).to(highestBidder);
    }
    Auctioneer.interact.seeBid(this, bid);
    return [this, bid, false];
})
```
  - We [`require`](https://docs.reach.sh/rsh/consensus/#rsh_require) that the bid is larger than the last bid on the **consensus network**.

  - We [`notify`](https://docs.reach.sh/rsh/consensus/#rsh_notify) the [bid, highestBidder, lastPrice] to the API caller frontend.

  - We do a check to see if the bid is the first bid. If it is not the first bid, we transfer the last price to the highest bidder. In other words, we return the last bid back to the bidders' wallet.

  - We interact with the Auctioneers' frontend and call the `seeBid` function, showing him the latest bid.

  - Finally, we return the `bidderAddress`, the `bid` and a boolean value of `false` to indicate that the bid is not the first bid.
</li>
<li>

#### [Calling Timeout](https://docs.reach.sh/rsh/step/#p_46)

Just like any other auction, we need a time limit. Parallel reduce can also be used to time out.

```javascript
.timeout(absoluteTime(end), () => {
  Auctioneer.publish()
  return [highestBidder, lastPrice, isFirstBid]; 
});
```
- [`absoluteTime(end)`](https://docs.reach.sh/rsh/compute/#rsh_absoluteTime) is the consensus time at which the auction will end.

- If the time is reached, we call the `publish` function on the Auctioneer. Which changes the `lastConsensusTime` to the current time. Making our while loop argument `false`.

- Then finally, we return the `highestBidder`, the `lastPrice` and a boolean value of `false`.

Great, now that we have a basic understanding of some key concepts, you can now head over to the [tutorial](https://github.com/BMscis/reach-tutorial/blob/workshop/Documentation/Tutorial/Full/NFTeaTutorial.md) and see the DApp in action.
</li>
</ul>
</p>
</details>
</li>

</ol>

</p>
</details>
</p>

</details>