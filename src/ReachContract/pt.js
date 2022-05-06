import { get } from "svelte/store";
import { consologger } from "../Utilities/utilities";
import * as backend from "../../Reach/build/index.main.mjs";
import { CreateAlgoAsset } from "../Utilities/createAlgoAsset";
import { auctionReady, contractState, creatorSeeBid } from "./reachStore";
import { nftImage, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
import { cyberuser, nftContractId, nftId, reachStdlib, wallet } from "../Stores/Wallet/WalletStore";

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
        let nftIdJSON = JSON.parse(nftId)
        let nftBig = this.stdlib.bigNumberify(nftIdJSON)
        let tkm = await this.wallet.tokenMetadata(nftBig)
        console.log("MEEEEEEEEEETA: ",tkm)
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
            this.algoAsset = new CreateAlgoAsset()
            const nftIdAlgo = await this.algoAsset.createAsset()
            this.nftId = nftIdAlgo
            return true
        } catch (error) {
            console.log("Creator createNFT",error)
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
            consologger("deployContract-agreement",JSON.stringify(agreement))
            nftContractId.set(JSON.stringify(agreement))
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
        console.log("++++++++++",this.nftId)
        let nftIdJSON = JSON.parse(this.nftId)
        console.log("++++++++++",nftIdJSON)
        console.log("++++++++++",this.stdlib.bigNumberify(nftIdJSON))
        let nftIdBig = this.stdlib.bigNumberify(nftIdJSON)
        let params = {nftId:nftIdBig,minBid:this.stdlib.parseCurrency(this.nftPrice),lenInBlocks: 120}
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
        let nftIdJSON = JSON.parse(nftId)
        let nftBig = this.stdlib.bigNumberify(nftIdJSON)
        let contractIDJSON = JSON.parse(contractID)
        consologger("latch",[contractIDJSON,nftIdJSON])

        await this.wallet.tokenAccept(nftBig);
        this.contract = await this.wallet.contract(backend,contractIDJSON);
        
        return this
    }
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