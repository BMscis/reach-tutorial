import { get } from "svelte/store";
import { createAuction, seeBidder } from "../Stores/Wallet/PrincipalStore";
import * as backend from "../../Reach/build/index.main.mjs";
import { cyberuser, nftContractId, nftId, reachStdlib, wallet } from "../Stores/Wallet/WalletStore";
import { auctionReady, contractState, creatorSeeBid } from "./reachStore";
import { nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
import { a } from "aws-amplify";

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
        console.log(this.owner," saw that the winner is ",this.stdlib.formatAddress(winner)," with bid ",this.stdlib.formatCurrency(bid))
    }
    async giveTime(tim){
        console.log("********************",JSON.parse(tim),"+++++++",tim)

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
        console.log("1: Creator getContract");
        //fetching contract true 0
        try{
            this.contract = await this.wallet.contract(backend);
            //const contractAddress = await this.contract.getContractAddress();
            console.log("1A: CONTRACT", this.contract);
            //console.log("1A: CONTRACT-ADDRESS", contractAddress);
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
        contractState.set(logg)
        console.log("LOGGER: Creator hasConsoleLogger: ",logg)
    }
    async createNFT (){
        try {
            this.nft = await this.stdlib.launchToken(this.wallet, get(nftName), get(nftSymbol), { supply: 1 });
            console.log("2A: NFTO",this.nft)
            console.log("NFT ID ",this.nft.id)
            nftId.set(this.nft.id)
            return true
        } catch (error) {
            console.log("2B: ERROR: Creator createNFT",error)
            return false
        }
    }
    async deployContract(contractAdd="") {
        console.log("3: Creator deployContract");
        //deploying contract true 1
        try{
            if(contractAdd.length > 0){
                this.contract = await this.wallet.contract(backend,JSON.parse(contractAdd));
            }else{
                backend.Creator(this.contract, this)
            }
            const agreement = await this.contract.getInfo()
            let contAddress = await this.contract.getContractAddress()
            console.log("3A: CONTRACT-info", agreement);
            nftContractId.set(contAddress)
            console.log("3A: CONTRACT-ADDRESS", contAddress);
            return contAddress
        }catch(error){
            console.log("3B: ERROR: Creator deployContract",error)
            return false
        }
    }
    async getSale () {
        // setting sale true 2
        console.log("4: Creator getSale");
        console.log("4A: Creator getSale: ",this.nftId);
        console.log("4A: Creator getSale: ",this.nftPrice);
        let params = {nftId:this.nftId,minBid:this.stdlib.parseCurrency(this.nftPrice),lenInBlocks: 120}
        return params
    }
    play = () => new Promise(resolve => {
        this.contract.unsafeViews.contractView.state().then(state => {
            console.log("View: ",state);
            resolve(state)
        })
    })
    async auctionReady () {
        console.log("5: Creator auctionReady: ");
        auctionReady.set(true)
        return
    }
    async seeBid (who, bid) {
        let setBid = this.stdlib.formatCurrency(bid)
        console.log("6: Creator saw  Bid",this.stdlib.formatAddress(who),setBid);
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
        console.log("1: Bidder constructor")
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
    async bid(bid){
        let didNotWork = false
        try{
            console.log("Contract: ",this.contract)
            let [currentBid, lastBidder, lastBid] = await this.contract.apis.Bidder.bid(this.stdlib.parseCurrency(bid));
            let setCurrentBid = this.stdlib.formatCurrency(currentBid)
            let setLastBidder = this.stdlib.formatAddress(lastBidder)
            let setLastBid = this.stdlib.formatCurrency(lastBid)
            this.bidCount++
            console.log("3: Bidder bid",lastBidder,setLastBid);
            return [setCurrentBid,setLastBidder,setLastBid]
        }catch(error){
            console.log("4: ERROR: Bidder bid",error)
            didNotWork = true
        }
    }
}