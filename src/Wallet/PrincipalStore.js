// change ui to fit actual contracts
// replace images with actual nfts
// connect creators with actual images
// connect with myalgo
// connect imagenftid and contract address
// set synchronized deployment of contracts
// convert block time to real time
// get updates of blocktime
import { get, writable } from "svelte/store";

export const bidderInfo = writable();
export const seeBidder = writable([])
export const createAuction = (name,bid,count) => {
    let storeBidder = get(seeBidder)
    let bidder
    try{
        bidder = storeBidder.find((v) => v.count === count);
    }catch{
        bidder = false
    }
    if(!bidder){
        //concatenate seeBidder with new bidder
        seeBidder.update((n) => (n.concat({name:name,bid:bid,count:count})))
    }
    return
}
