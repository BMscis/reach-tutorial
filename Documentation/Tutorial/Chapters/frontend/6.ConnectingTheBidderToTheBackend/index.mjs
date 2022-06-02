//Add connect to the contract.
const ctc = accBidder.contract(backend, ctcCreator.getInfo());

// Add await for token accept.
await acc.tokenAccept(nftId);