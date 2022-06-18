Hello, my name is Melvin, and today I'll walk you through a decentralized NFT auction created with the Reach programming language.
Reach programming language can be used to create a single contract that can be deployed across multiple blockchains using the Reach programming language.

This video is a just a demonstration of the Dapp, which deploys an NFT auciton on either Etherium or Algorand blockchain. There is a link in the description to a detailed tutorial that walks you through the how to build an NFT auction using reach.

We will need an auctioneer and bidders, just like any other auction. And that's what these three windows represent: three distinct users, each with their own unique myalgo wallet and NFT auction app user account. We have Melvin, Sam, and Jack, as you can see. There is a wallet icon at the top right of the Dapp, which we can click to select the blockchain. Let us begin with algorand.

We can now create an NFT because their wallets have connected and their testnet balance has reflected. Melvin will be the auctioneer, and we'll click the Create NFT button at the top. Let's call it Blu, change the symbol to BLU, set the price to 3 Algos, and choose a blue image.

We are using Reach behind the scenes to create a new NFT token and deploy it to the blockchain. We use Amazon S3 to store images and its graphql API to start a websocket that listens for changes to the NFT components. The websocket updates the app as soon as we update the NFT, so there's no need to reload the page.

When we look at myalgo wallet, we see that a new token, the BLU NFT, has been added. Following the auction, we will examine how the Reach contract interacts with the NFT using Algoexplorer.

If you look closely, you'll notice that only the NFT's owner has access to the Auction button. Other participants must wait for the auction to begin before making a bid. Once Melvin starts the auction, bidders will have access to the bid function. They will, however, be unable to place a bid until the auction is ready. 
Let's say Sam bids 4 algos and Jack outbids him by 1 algo and bids 5 algos. The auction will end when a certain block time is reached, and the highest bidder, in our case Jack, will receive the NFT, while the auctioneer, Melvin, will receive 5 algos.

When the auction is finished and the transfers are completed, the Dapp automatically updates the view to show Jack as the new owner. We can find the transactions made by the contract on behalf of the creator if we look at algo explorer.