## STACK
___
#### [NODEJS](https://nodejs.org/en/)
Nodejs is a JavaScript runtime environment that executes JavaScript code outside of a browser.

#### [ROLLUP](https://www.npmjs.com/package/rollup)
Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the standardized ES module format.

#### [JAVASCRIPT](https://www.javascript.com/)
JavaScript is a dynamic programming language that's used for web development, in web applications, for game development, and lots more.

#### [SVELTE](https://svelte.dev/)
Svelte is a framework for building web applications just as React or VUE.
We used svelte because with svelte we could develop components which functions as a html, has attributes,can be reused and are singularly responsive.

##### [NFT COMPONENTS](https://github.com/BMscis/reach-tutorial/blob/Nft-Algo/src/Components/)
![](https://github.com/BMscis/reach-tutorial/blob/0c35d7d93ba78fc0291c835fb6419fd749108ab0/src/nftea-assets/assets/article/nftCard.gif)

"NFT Component"
With this design, we were able to define one component and reuse it for all possible nfts.
In this sense, the application is a Single Page Application. Meaning the page is separated into components that reload individually and don't require a full page reload.

##### SVELTE STORES
![](https://github.com/BMscis/reach-tutorial/blob/74d7b3c22f28b8cd7fc3f22e826d8dc4d5a44a85/src/nftea-assets/assets/article/storesDemo.gif)
Svelte also allows writables called stores that can be used to share data between components and can be used to trigger a signle component update when the store value changes.
Watch as the wallet value changes once we connect to the wallet.

### AUTHENTICATION AND STORAGE
![](https://github.com/BMscis/reach-tutorial/blob/f35cfd811f21af7ae05c0ddc05b70a7487425277/src/nftea-assets/assets/article/userSignUp.gif)
Storage and authentication are handled by AWS Amplify.
NFTea uses [Amplify](https://aws.amazon.com/amplify/) to for backend queries.
NFTea uses [Amazon s3](https://aws.amazon.com/s3/) to store images.
NFTea uses [Amazon Authenticate](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/) to authenticate users.

### [REACH](https://reach.sh/us/faq/)
Reach is a blockchain development program that allows us to create and manage smart contracts on the blockchain.
Reach compiles to a javascript module that can be imported into the project just like any other javascript module.
1. Reach smart contract code is written in a javascript like syntax and can be easily tested.
2. Reach allows the programmer to write single code in .sh and it will compile it to mjs. 
3. Reach handles the backend deployment of the contract and therefore it can be used simultaneously with multiple blockchains.

### CONNECT WALLET OPTION
![](https://github.com/BMscis/reach-tutorial/blob/f35cfd811f21af7ae05c0ddc05b70a7487425277/src/nftea-assets/assets/article/userSignUp.gif)
### UPLOAD NFT WITH ALGORAND
![](https://github.com/BMscis/reach-tutorial/blob/f35cfd811f21af7ae05c0ddc05b70a7487425277/src/nftea-assets/assets/article/userSignUp.gif)
### UPLOAD NFT WITH ETHERIUM
![](https://github.com/BMscis/reach-tutorial/blob/f35cfd811f21af7ae05c0ddc05b70a7487425277/src/nftea-assets/assets/article/userSignUp.gif)