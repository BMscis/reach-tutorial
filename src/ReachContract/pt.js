import { get } from "svelte/store";
import { createAuction, seeBidder } from "../Wallet/PrincipalStore";
import * as backend from "../../Reach/build/index.main.mjs";
import { cyberuser, reachStdlib, wallet } from "../Wallet/WalletStore";

export class Participant{
    constructor(){
        console.log("1: Participant constructor")
        this.bidCount = 0
        this.newNftOwner = false
        this.wallet = get(wallet)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        this.firstNftOwner = this instanceof Creator
    }
    async showOutcome (winner,bid) {
        console.log(this.owner," saw that the winner is ",winner," with bid ",bid)
    }
}

export class Creator extends Participant{
    constructor(){
        super()
    }
    async getContract(){
        console.log("1: Creator getContract");
        try{
            this.contract = await this.wallet.contract(backend);
            this.nft = await this.stdlib.launchToken(this.wallet, "beepboop", "NFT", { supply: 1 });
            console.log("2A: NFT",this.nft)
            return true
        }catch (error){
            console.log("2B: ERROR: Creator getContract",error)
            return false
        }
    }
    async deployContract() {
        console.log("3: Creator deployContract");
        try{
            backend.Creator(this.contract, this)
            const agreement = await this.contract.getInfo()
            this.info = JSON.stringify(agreement, null, 2);
            console.log("3A: CONTRACT-INFO", this.info);
            return true
        }catch(error){
            console.log("3B: ERROR: Creator deployContract",error)
            return false
        }
    }
    async getSale () {
        console.log("4: Creator getSale");
        let params = {nftId:this.nft.id,minBid:this.stdlib.parseCurrency(20),lenInBlocks: 120}
        return params
    }
    async auctionReady () {
        console.log("5: Creator auctionReady");
        return
    }
    async seeBid (who, bid) {
        let setBid = this.stdlib.formatCurrency(bid)
        console.log("6: Creator sawBid",who,setBid);
        this.bidCount++
    }

}
export class Bidder extends Participant{
    constructor(){
        super()
        console.log("1: Bidder constructor")
    }
    async latch(contractID,nftId){
        console.log("2: Bidder latch");
        await this.wallet.tokenAccept(nftId);
        this.contract = this.wallet.contract(backend,JSON.parse(contractID));
        console.log("2B: Bidder latch");
        //const bc = backend.Bidder(this.contract,this)
        return
    }
    async bid(bid){
        let [currentBidder, currentBid, lastBidder, lastBid] =await this.contract.apis.Bidder.bid(this.stdlib.parseCurrency(bid,2));
        let setCurrentBidder = this.stdlib.formatAddress(currentBidder)
        let setCurrentBid = this.stdlib.formatCurrency(currentBid)
        let setLastBidder = this.stdlib.formatAddress(lastBidder)
        let setLastBid = this.stdlib.formatCurrency(lastBid)
        this.bidCount++
        console.log("3: Bidder bid",lastBidder,setLastBid);
        return [setCurrentBidder,setCurrentBid,setLastBidder,setLastBid]
    }
}