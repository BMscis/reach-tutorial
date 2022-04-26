import { cyberuser, reachStdlib, wallet } from "../Stores/Wallet/WalletStore";
import * as backend from '../../Reach/build/index.main.mjs';
import { get } from "svelte/store";
export class BidderTest{
    constructor(){
        this.acc = get(wallet)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        this.minBid = this.stdlib.parseCurrency(2)
    }
    async latch(contractInfo,nftId){
        await this.acc.tokenAccept(this.stdlib.bigNumberify(nftId));
        this.ctc = this.acc.contract(backend,contractInfo);
        console.log("Contract Attach")
    }
    async bid(bid){
        let lBid = this.stdlib.parseCurrency(bid)
        const [ latestBid,lastBidder, lastBid ] = await this.ctc.apis.Bidder.bid(lBid);
        console.log(`${this.owner} :out bid ${lastBidder} 
        who bid ${stdlib.formatCurrency(lastBid)}. with ${latestBid}`);
    }
}