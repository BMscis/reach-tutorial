1. ### What is the purpose of this application ?
The purpose is to implement an auction
2. ### Who is involved in this application ?
At least an auctioneer and a bidder
4. ### What is the expected output ?
- Auctioneer will receive highest bid price
- Bidder will receive the NFT
5. ### What is the expected input ?
- Auctioneer will upload NFT
- Bidder will place a bid
3. ### How will we implement this application ?
- Auctioneer will upload NFT
- Auctioneer will create an auction
- Auctioneer will set the price
- Auctioneer will set the duration
- Bidder will connect to the contract
- Bidder will bid
- Bidder will withdraw

Module - 
    reach - compiles the contract, 
    main - holds the main app, reach looks for to compile, 
    participant - holds persistent logic and sub functions, 
    api - holds multiple participants,
Task - 
    init - initiates the contract,
    declassify - decodes the frontend data, 
    interact - queries the frontend, 
    publish - creates/updates a contract /  enters consensus state,  
    commit - returns to local state, 
    pay -  transfers money /  enters local state, 
    lastConsensus - calls last publish time, 
    exit - closes contract.
Data types - 
    token - holds NFT address, 
    uint - holds nums, 
    address - holds user addresses, 
    null - holds nothing, 
    object - holds multiple types,
Functions - 
    getSale - gets the NFT, bid, time, 
    auctionReady - sends auction ready signal, 
    seeBid - sends latest bid, 
    showOutcome - sends winner, 
    bid - gets the bid,
Algorithms - 
    parallelreduce - reduces the race to a single winner,
    while - loops the contract,
    timeout - checks auction type.
