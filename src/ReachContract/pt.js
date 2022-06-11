import { get } from "svelte/store";
import { consologger, nftDictionary } from "../Utilities/utilities";
import * as backend from "../../Reach/build/index.main.mjs";
import { CreateAlgoAsset } from "../Utilities/createAlgoAsset";
import { contractState, creatorSeeBid } from "./reachStore";
import { nftImage, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
import { chain, cyberuser, nftContractId, nftId, reachStdlib, wallet,walletAddress } from "../Stores/Wallet/WalletStore";
import { updateNFTeaCard, updateNFTeaContract } from "../STORAGE/nftCardMutations";

export class Participant {
    constructor() {
        this.bidCount = 0
        this.newNftOwner = false
        this.wallet = get(wallet)
        this.walletAddress = get(walletAddress)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        this.firstNftOwner = this instanceof Auctioneer
    }
    async setNewOwner(winner, bid) {
        let formatWinner = this.stdlib.formatAddress(winner)
        let formatBid = this.stdlib.formatCurrency(bid)
        let newPrice = parseFloat(formatBid)
        try {
            if (this.newOwner) {
                let oldNFT = this.newOwner
                await updateNFTeaCard(oldNFT, formatWinner,this.walletAddress,newPrice,"false")
            }
            //consologger("showOutcome", [this.newOwner.nftAssetOwner])
        } catch (error) {
            console.log("SHOW OUTCOME ERROR: ", error)
        }

    }
    checkEvent({when, what}){
        let stdlib = get(reachStdlib)
        console.log("+++++++When: ", stdlib.bigNumberToNumber(when))
        let state = what[0]

        switch (state) {
            case "showBid":
                let add = what[1]
                let bid = stdlib.formatCurrency(what[2])
                console.log("+++++++What: Address", add,
                    "Bid: ", bid)
                creatorSeeBid.update((n) => (n.concat(bid)));
                break;
            case "auctionTime":
                let aTime = stdlib.bigNumberToNumber(what[1])
                console.log("+++++++What: Auction Time", aTime)
                break;
            case "contractState":
                let cState = what[1]
                console.log("+++++++What: Contract State", cState)

                switch (cState) {
                    case "NFTpubli":
                        contractState.set("Publishing NFT")
                        break;
                    case "Checkbal":
                        contractState.set("Checking NFT balance")
                        break;
                    case "auctionR":
                        contractState.set("Auction Started")
                        break;
                
                    default:
                        break;
                }
                break;
            case "timesUp":
                console.log("+++++++What: Auction Ended")
                contractState.set("Auction Ended")
                break;
            case "showOutcome":
                let w = stdlib.formatAddress(what[1])
                let b = stdlib.formatCurrency(what[2])
                console.log("+++++++What: Winner", w,
                    "Bid: ", b)

                break;
        }
        return
    }
}

export class Auctioneer extends Participant {
    constructor(newOwner) {
        super()
        try {
           
            this.newOwner = nftDictionary(newOwner)
        } catch (error) {
            this.newOwner = false
        }
    }
    async waitContract(nftId, nftPrice) {
        this.nftPrice = nftPrice
        this.nftId = nftId
        let returnContract
        
        let nftIdJSON = JSON.parse(nftId)
        await this.wallet.tokenMetadata(nftIdJSON)
        const contractCreated = await this.getContract()

        if (contractCreated) returnContract = await this.deployContract()
        if (returnContract) {
            return [true, returnContract]
        } else {
            return false
        }
    }
    async getContract() {
        contractState.set("Creating Contract")
        try {
            this.contract = await this.wallet.contract(backend);
            //consologger("getContract", [this.contract, typeof this.contract])
            this.backendLog = this.contract.events
            this.backendLog.showBid.monitor(this.checkEvent)
            this.backendLog.auctionTime.monitor(this.checkEvent)
            this.backendLog.contractState.monitor(this.checkEvent)
            this.backendLog.showOutcome.monitor(this.checkEvent)
            this.backendLog.timesUp.monitor(this.checkEvent)
            return true
        } catch (error) {
            if (error instanceof TypeError) {
                alert("Please Connect to a wallet and try again.")
            }
            console.log("2B: ERROR: Auctioneer getContract", error)
            return false
        }
    }
    log(log) {
        let logg = JSON.parse(log)
        //consologger("log", [logg, typeof log])
        switch (logg) {
            case 1:
                contractState.set("Initializing Contract")
                break;
            case 2:
                contractState.set("Sending NFT to Contract")
                break;
        
            default:
                break;
        }
    }
    async createNFT() {
        //consologger("pt.js/createNFT", [get(nftName),get(nftSymbol),get(nftImage)] )
        try {
            switch (get(chain)) {
                case "ETH":
                    this.nft = await this.stdlib.launchToken(
                        this.wallet,
                        get(nftName),
                        get(nftSymbol), {
                        total: 1,
                        decimals: 0,
                        supply: 1,
                        url: get(nftImage).url,
                    });
                    let nftJSON = JSON.stringify(this.nft.id)
                    nftId.set(JSON.stringify(this.nft.id))
                    break;
                case "ALGO":
                    this.algoAsset = new CreateAlgoAsset()
                    const nftIdAlgo = await this.algoAsset.createAsset()
                    this.nftId = nftIdAlgo
                    break;
            }
            return true
        } catch (error) {
            console.log("Auctioneer createNFT", error)
            return false
        }
    }
    async deployContract(contractAdd = "") {
        //consologger("deployContract", [contractAdd, typeof contractAdd])
        //consologger("deployContract-type-backend", typeof backend)
        try {
            this.contract.participants.Auctioneer(this)
            const agreement = await this.contract.getInfo()
            let contAddress = await this.contract.getContractAddress()
            //consologger("deployContract-agreement", JSON.stringify(agreement))
            //nftContractId.set(JSON.stringify(agreement))
            //consologger("deployContract-contAddress", this.stdlib.formatAddress(contAddress))
            updateNFTeaContract(this.newOwner,JSON.stringify(agreement),"true")
            return contAddress
        } catch (error) {
            console.log("3B: ERROR: Auctioneer deployContract", error)
            return false
        }
    }
    async getSale() {
        // setting sale true 2
        //consologger("getSale", JSON.parse(this.nftId))
        let nftIdJSON = JSON.parse(this.nftId)
        //let params = { nftId: nftIdBig, minBid: this.stdlib.parseCurrency(this.nftPrice), lenInBlocks: 30 }
        let params = { nftId: nftIdJSON, minBid: this.nftPrice, lenInBlocks: 30 }
        return params
    }
    async auctionReady() {
        return
    }
    async seeBid(who, bid) {
        let setBid = this.stdlib.formatCurrency(bid)
        //consologger("seeBid", [who, setBid])
        creatorSeeBid.update((n) => (n.concat(setBid)));
        this.bidCount++
    }
    async timeout() {
        alert("You already done yourself")
        return
    }

}
export class Bidder extends Participant {
    constructor() {
        super()
    }
    async latch(contractID, nftId) {
        let nftIdJSON = JSON.parse(nftId)
        let nftBig = this.stdlib.bigNumberify(nftIdJSON)
        let contractIDJSON = JSON.parse(contractID)
        //consologger("latch", [contractIDJSON, nftIdJSON])

        await this.wallet.tokenAccept(nftBig);
        this.contract = await this.wallet.contract(backend, contractIDJSON);
        this.backendLog = this.contract.events
        this.backendLog.showBid.monitor(this.checkEvent)
        this.backendLog.auctionTime.monitor(this.checkEvent)
        this.backendLog.contractState.monitor(this.checkEvent)
        this.backendLog.showOutcome.monitor(this.checkEvent)
        this.backendLog.timesUp.monitor(this.checkEvent)
        return this
    }
    async bid(bid) {
        let didNotWork = false
        try {
            //consologger("bid", [bid, this.stdlib.parseCurrency(bid)])
            let [currentBid, lastBidder, lastBid] = await this.contract.apis.Bidder.bid(this.stdlib.parseCurrency(bid));
            let setCurrentBid = this.stdlib.formatCurrency(currentBid)
            let setLastBidder = this.stdlib.formatAddress(lastBidder)
            let setLastBid = this.stdlib.formatCurrency(lastBid)
            this.bidCount++
            //consologger("bid-currentBid", setCurrentBid)
            return true
        } catch (error) {
            console.log("4: ERROR: Bidder bid", error)
            didNotWork = true
        }
    }
}