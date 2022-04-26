import algosdk from "algosdk";
import { get } from "svelte/store";
import { createAuction, seeBidder } from "../Stores/Wallet/PrincipalStore";
import * as backend from "../../Reach/build/index.main.mjs";
import { cyberuser, nftContractId, nftId, reachStdlib, wallet } from "../Stores/Wallet/WalletStore";
import { auctionReady, contractState, creatorSeeBid } from "./reachStore";
import { nftImage, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
import { a } from "aws-amplify";
let count = 0
const consologger = (obj,val) => {
    console.log(`Position: ${count += 1}!!!!!!!!!${obj}:::::::::${val}`)
}
export class Participant{
    constructor(){
        this.bidCount = 0
        this.newNftOwner = false
        this.wallet = get(wallet)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        this.firstNftOwner = this instanceof Creator
    }
    async showOutcome (winner,bid) {
        consologger("showOutcome",[this.stdlib.formatAddress(winner),this.stdlib.formatCurrency(bid)])
    }
    async giveTime(tim){
        consologger("giveTime",tim)
    }
}

export class Creator extends Participant{
    constructor(){
        super()
    }
    async waitContract (nftId,nftPrice){
        this.nftPrice = nftPrice
        this.nftId = nftId
        let returnContract
        const contractCreated = await this.getContract()
        
        if(contractCreated) returnContract = await this.deployContract()
        if(returnContract){
            return [true,returnContract]
        }else{
            return false
        }
    }
    async getContract(){
        contractState.set(1)
        try{
            this.contract = await this.wallet.contract(backend);
            consologger("getContract",[this.contract,typeof this.contract])
            return true
        }catch (error){
            if(error instanceof TypeError){
                alert("Please Connect to a wallet and try again.")
            }
            console.log("2B: ERROR: Creator getContract",error)
            return false
        }
    }
    log(log){
        let logg = JSON.parse(log)
        consologger("log",[logg,typeof log])
        contractState.set(logg)
    }
    async createNFT (){
        consologger("createNFT",[nftName,nftSymbol,nftImage])
        consologger("createNFT-type-wallet",typeof this.wallet)
        try {
            this.nft = await this.stdlib.launchToken(this.wallet, get(nftName), get(nftSymbol), { 
                supply: 1,
                url:get(nftImage).url,
            });
            consologger("createNFT-nft",this.nft)
            consologger("createNFT-type-nft",typeof this.nft)
            consologger("createNFT-type-nft-id",typeof this.nft.id)
            consologger("createNFT-type-nft-id-string",JSON.stringify(this.nft.id))
            nftId.set(JSON.stringify(this.nft.id))
            return true
        } catch (error) {
            console.log("2B: ERROR: Creator createNFT",error)
            return false
        }
    }
    async deployContract(contractAdd="") {
        consologger("deployContract",[contractAdd,typeof contractAdd])
        consologger("deployContract-type-backend",typeof backend)
        try{
            this.contract.participants.Creator(this)
            const agreement = await this.contract.getInfo()
            let contAddress = await this.contract.getContractAddress()
            consologger("deployContract-agreement",agreement)
            nftContractId.set(this.stdlib.formatAddress(contAddress))
            consologger("deployContract-contAddress",this.stdlib.formatAddress(contAddress))
            return contAddress
        }catch(error){
            console.log("3B: ERROR: Creator deployContract",error)
            return false
        }
    }
    async getSale () {
        // setting sale true 2
        consologger("getSale",JSON.parse(this.nftId))
        let params = {nftId:JSON.parse(this.nftId),minBid:this.stdlib.parseCurrency(this.nftPrice),lenInBlocks: 120}
        return params
    }
    play = () => new Promise(resolve => {
        this.contract.unsafeViews.contractView.state().then(state => {
            resolve(state)
        })
    })
    async auctionReady () {
        consologger("auctionReady",[this.nftId,this.nftPrice])
        auctionReady.set(true)
        return
    }
    async seeBid (who, bid) {
        let setBid = this.stdlib.formatCurrency(bid)
        consologger("seeBid",[who,setBid])
        creatorSeeBid.update((n) => (n.concat(setBid)));
        this.bidCount++
    }
    async timeout () {
        alert("You already done yourself")
        return
    }

}
export class Bidder extends Participant{
    constructor(){
        super()
    }
    async latch(contractID,nftId){
        console.log("2: Bidder latch");
        await this.wallet.tokenAccept(nftId);
        console.log("token---------accepted");
        this.contract = await this.wallet.contract(backend,contractID);
        console.log("2B: Bidder latch",this.contract);
        //const bc = backend.Bidder(this.contract,this)
        
        return this
    }
    // play = () => new Promise(resolve => {
    //     playerHand.subscribe((value) => {
    //         console.log("PLAYER playerHand: ", value)
    //         if (value.handPlayed.length > 0 && value.timestamp != this.lastTimeStamp) {
    //             resolve(handToInt[value.handPlayed])
    //         }
    //     })
    // })
    async bid(bid){
        let didNotWork = false
        try{
            consologger("bid",[bid,this.stdlib.parseCurrency(bid)])
            let [currentBid, lastBidder, lastBid] = await this.contract.apis.Bidder.bid(this.stdlib.parseCurrency(bid));
            let setCurrentBid = this.stdlib.formatCurrency(currentBid)
            let setLastBidder = this.stdlib.formatAddress(lastBidder)
            let setLastBid = this.stdlib.formatCurrency(lastBid)
            this.bidCount++
            consologger("bid-currentBid",setCurrentBid)
            return [setCurrentBid,setLastBid]
        }catch(error){
            console.log("4: ERROR: Bidder bid",error)
            didNotWork = true
        }
    }
}