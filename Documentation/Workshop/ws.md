<details>
<summary>
<h2>

Problem Analysis
</h2>

Here's a summary of what we hope to achieve at the end of this workshop.
</summary>
<p>

The purpose of this workshop is to create an NFT auction and get bidders to race to get the highest bid with a limited amount of time.

Let's breakdown some concepts that we need to understand before we ask critical questions.

<ol>

<li>

<h4>

[Blockchain](https://en.wikipedia.org/wiki/Blockchain)

</h4>

A [blockchain](https://en.wikipedia.org/wiki/Blockchain) is a distributed ledger that records transactions in a series of blocks. The series of blocks are linked together using [Merkel Tree](https://en.wikipedia.org/wiki/Merkle_tree) where each block has a link to the previous block.
What makes blockchain unique is that they use [consensus](https://www.geeksforgeeks.org/consensus-algorithms-in-blockchain/) which means each participant peer can confirm the validity of the blockchain.

</li>

<li>
<h4>

[BlockHeight](https://www.investopedia.com/terms/b/block-height.asp#:~:text=Block%20height%20refers%20to%20a,size%20or%20time%20in%20existence.)
</h4>

[BlockHeight](https://www.investopedia.com/terms/b/block-height.asp#:~:text=Block%20height%20refers%20to%20a,size%20or%20time%20in%20existence.) keeps count of all the number of blocks that have been mined since the beginning of the blockchain. Since each block can be mined at an approximate amount of time, the block height can be used to measure the auction time.

</li>

<li>
<h4>

[Auction](https://www.google.com/search?q=what+is+an+auction&oq=what+is+an+auction&aqs=chrome..69i57j0i512l9.5560j0j4&sourceid=chrome&ie=UTF-8)
</h4>

An auction is a public sale where the item being auctioned by the `auctioneer` goes to the highest `bidder` after a certain amount of time limit.

</li>

<li>
<h4>

[Decentralized App](https://en.wikipedia.org/wiki/Decentralized_application)
</h4>

Decentralized applications are immutable, operate autonomously, and are not tied to a single entity. They run on the blockchain using consensus algorithms to force all participants to agree.
</li>

</ol>
</p>

<ol>
<li>

<h3>

[Objectives.]()
</h3>
Let's run through the objectives :

1. We need to create a Decentralized application and publish it to a blockchain.

2. The decentralized application should be able to conduct a successful auction in consensus.

3. The decentralized application should be able to autonomously moderate the auction and ensure fairness and honesty amongst all the participants.

</p>

</li>

<li>
<p>

<h3 id="expected-output">


[Expected Output](#ExpectedOutput) 

</h3>

We expect the decentralized application to : 

- Announce a winner at the end of the auction, 

- Transfer the NFT to the winner.

- Transfer the highest bid to the auctioneer.
</p>
</li>

<li>

<p>
<h3>

[Expected Input.]()
</h3>

We expect the decentralized application to handle : 

- A NFT to be sent to the decentralized app.

- A NFT price

- An auction duration.

- A NFT bid.
</p>    

</li>

<li>
<p>
<h3>

[Expected Processes for a Successful Auction.]()
</h3>

In order to achieve a successful auction, the decentralized app needs a few processes to be done : 

1. We need an auctioneer to create a new contract/DAPP.

2. We need an auctioneer to make the NFT being auctioned known to the contract.

3. Once the auctioneer sends the NFT to the contract, the auction is ready to start.

4. A bidder must  `OPT-IN` the contract/DAPP and accept the NFT token.

5. For a bidder to make a successful bid, the bid must be placed on time and the amount should be larger than the last bid.

6. The auction should continue until the timeout hits.

7. If timeout hits, the NFT should be sent to the highest bidder and the highest bid should be sent to auctioneer.

8. The decentralized app should exit and self-destruct if it has no NFT and the contract balance is 0.
</p>
</li>

<li>
<p>
<h3>

[Analyzing the Scope of the Problem.]()
</h3>

Based on what we have touched so far, we can now assess the possibilities and the limitations that will be encountered in the process of creating a successful auction. In order to get a clear understanding of the problem, let's break down our program into specifics by asking key questions :

1. What modules will we use to create and compile the program ?

2. Who will be involved in executing the contract ?

3. What tasks should be completed to make a successful auction ?

4. What data types will be used to hold program information ?

5. What functions can we use to help the actors participate ?

6. What algorithms can we use to run an honest auction ?
</p>
</li>
</ol>
</details>

<details>
<summary>
<h2>

Problem Design
</h2>

Here we will answer the questions we asked during the problem analysis.
</summary>
<p>

The purpose of this workshop is to create an NFT auction and get bidders to race to get the highest bid with a limited amount of time.

Let's breakdown some questions we need to answer before we can design the DAPP.

<ol>

<li>

<details>
<summary>
<h3>

Which programming language will we use to create our DAPP ?
</h3>

[Reach](https://docs.reach.sh/#reach-top) is a domain specific language for building decentralized applications. The [Reach Module](https://docs.reach.sh/rsh/module/) is a `.rsh` file that contains the DAPP that can run on multiple blockchain platforms.
</summary>

<ol>
<li>
<details>
<summary>
<h5>

[Reach Module](https://docs.reach.sh/rsh/module/)
</h5>

The [Reach Module](https://docs.reach.sh/rsh/module/) must begin with a `version type` as it's first line and stored in a `index.rsh` file.
</summary>
<p>

> index.rsh

```javascript
'reach 0.1';
```

> [Reach Syntax](https://docs.reach.sh/model/#ref-model-syntax) is written in **JavaScript** syntax .
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach App](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).
</h5>

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

> All the functions we want to perform will go into the `main` function.
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach Participant](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).
</h5>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DAPP and is associated with an address on the consensus network. A Reach participant is capable of persistently storing data on the local state. 
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

> All the functions that will be necessary for the `auctioneer` to perform will be put inside the `Auctioneer body`.
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API).
</h5>

A [Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API) is group of [Reach Participant](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs) who are racing to achieve the same goal in a DAPP.
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
> A main difference between a  `Reach Participant` and a `Reach API` is that a `Reach API` can be called from the actors` frontend.

> All the functions that will be necessary for the `bidder` to perform will be put inside the `Bidder Interface`.
</p>
</details>

</li>

</ol>

</details>

</li>

<li>

<details>
<summary>
<h3>

Which data types will we use in our DAPP to hold information ?
</h3>

We can use reach [Types](https://docs.reach.sh/rsh/compute/#ref-programs-types) as guidance to choose which types we can use to represent our data.
</summary>

If we go back to our [problem analysis](/1.ProblemAnalysis.md), we can take a look at our expected input and our expected output and try to convert all that information to [Reach Types.](https://docs.reach.sh/rsh/compute/#ref-programs-types)
<ol>
<li>
<details>
<summary>
<h4>
<a href="#expected-output"> 

Output
</a>
</h4>

The [Reach Module](https://docs.reach.sh/rsh/module/) must begin with a `version type` as it's first line and stored in a `index.rsh` file.
</summary>
<p>

> index.rsh

```javascript
'reach 0.1';
```

> [Reach Syntax](https://docs.reach.sh/model/#ref-model-syntax) is written in **JavaScript** syntax .
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach App](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).
</h5>

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

> All the functions we want to perform will go into the `main` function.
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach Participant](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs).
</h5>

A [Participant](https://docs.reach.sh/model/#term_participant) is a logical actor who takes part in a DAPP and is associated with an address on the consensus network. A Reach participant is capable of persistently storing data on the local state. 
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

> All the functions that will be necessary for the `auctioneer` to perform will be put inside the `Auctioneer body`.
</p>
</details>

</li>

<li>
<details>
<summary>
<h5>

[Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API).
</h5>

A [Reach API](https://docs.reach.sh/rsh/appinit/#rsh_API) is group of [Reach Participant](https://docs.reach.sh/rsh/module/#ref-programs-module-exprs) who are racing to achieve the same goal in a DAPP.
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
> A main difference between a  `Reach Participant` and a `Reach API` is that a `Reach API` can be called from the actors` frontend.

> All the functions that will be necessary for the `bidder` to perform will be put inside the `Bidder Interface`.
</p>
</details>

</li>

</ol>

</details>

</li>

</ol>

</p>
</details>
