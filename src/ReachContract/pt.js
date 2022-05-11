import { get } from "svelte/store";
import { consologger, nftDictionary } from "../Utilities/utilities";
import * as backend from "../../Reach/build/index.main.mjs";
import { CreateAlgoAsset } from "../Utilities/createAlgoAsset";
import { auctionReady, contractState, creatorSeeBid } from "./reachStore";
import { nftImage, nftName, nftSymbol } from "../Components/CREATENFT/nftFormSvelte";
import { chain, cyberuser, nftContractId, nftId, reachStdlib, wallet,walletAddress } from "../Stores/Wallet/WalletStore";
import { updateNFTeaCard } from "../STORAGE/nftCardMutations";

export class Participant {
    constructor() {
        this.bidCount = 0
        this.newNftOwner = false
        this.wallet = get(wallet)
        this.walletAddress = get(walletAddress)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        this.firstNftOwner = this instanceof Creator
    }
    async showOutcome(winner, bid) {
        try {
            if (this.newOwner) {
                let oldNFT = this.newNftOwner
                let newPrice = this.stdlib.formatCurrency(bid)
                this.newOwner.nftAssetOwner = this.stdlib.formatAddress(winner)
                this.newOwner.nftPrevAssetOwner = this.walletAddress
                await updateNFTeaCard(oldNFT, this.newOwner,this.stdlib.formatCurrency(bid))
            }
            consologger("showOutcome", [this.stdlib.formatAddress(winner)])
        } catch (error) {
            console.log("SHOW OUTCOME ERROR: ", error)
        }

    }
    async giveTime(tim) {
        consologger("giveTime", tim)
    }
}

export class Creator extends Participant {
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
        let nftBig = this.stdlib.bigNumberify(nftIdJSON)
        let tkm = await this.wallet.tokenMetadata(nftBig)
        const contractCreated = await this.getContract()

        if (contractCreated) returnContract = await this.deployContract()
        if (returnContract) {
            return [true, returnContract]
        } else {
            return false
        }
    }
    async getContract() {
        contractState.set(1)
        try {
            this.contract = await this.wallet.contract(backend);
            consologger("getContract", [this.contract, typeof this.contract])
            return true
        } catch (error) {
            if (error instanceof TypeError) {
                alert("Please Connect to a wallet and try again.")
            }
            console.log("2B: ERROR: Creator getContract", error)
            return false
        }
    }
    log(log) {
        let logg = JSON.parse(log)
        consologger("log", [logg, typeof log])
        contractState.set(logg)
    }
    async createNFT() {
        consologger("createNFT", [nftName, nftSymbol, nftImage])
        consologger("createNFT-type-wallet", typeof this.wallet)
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
            console.log("Creator createNFT", error)
            return false
        }
    }
    async deployContract(contractAdd = "") {
        consologger("deployContract", [contractAdd, typeof contractAdd])
        consologger("deployContract-type-backend", typeof backend)
        try {
            this.contract.participants.Creator(this)
            const agreement = await this.contract.getInfo()
            let contAddress = await this.contract.getContractAddress()
            consologger("deployContract-agreement", JSON.stringify(agreement))
            nftContractId.set(JSON.stringify(agreement))
            consologger("deployContract-contAddress", this.stdlib.formatAddress(contAddress))
            return contAddress
        } catch (error) {
            console.log("3B: ERROR: Creator deployContract", error)
            return false
        }
    }
    async getSale() {
        // setting sale true 2
        consologger("getSale", JSON.parse(this.nftId))
        let nftIdJSON = JSON.parse(this.nftId)
        let nftIdBig = this.stdlib.bigNumberify(nftIdJSON)
        let params = { nftId: nftIdBig, minBid: this.stdlib.parseCurrency(this.nftPrice), lenInBlocks: 30 }
        return params
    }
    play = () => new Promise(resolve => {
        this.contract.unsafeViews.contractView.state().then(state => {
            resolve(state)
        })
    })
    async auctionReady() {
        consologger("auctionReady", [this.nftId, this.nftPrice])
        auctionReady.set(true)
        return
    }
    async seeBid(who, bid) {
        let setBid = this.stdlib.formatCurrency(bid)
        consologger("seeBid", [who, setBid])
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
        consologger("latch", [contractIDJSON, nftIdJSON])

        await this.wallet.tokenAccept(nftBig);
        this.contract = await this.wallet.contract(backend, contractIDJSON);

        return this
    }
    async bid(bid) {
        let didNotWork = false
        try {
            consologger("bid", [bid, this.stdlib.parseCurrency(bid)])
            let [currentBid, lastBidder, lastBid] = await this.contract.apis.Bidder.bid(this.stdlib.parseCurrency(bid));
            let setCurrentBid = this.stdlib.formatCurrency(currentBid)
            let setLastBidder = this.stdlib.formatAddress(lastBidder)
            let setLastBid = this.stdlib.formatCurrency(lastBid)
            this.bidCount++
            consologger("bid-currentBid", setCurrentBid)
            return [setCurrentBid, setLastBid]
        } catch (error) {
            console.log("4: ERROR: Bidder bid", error)
            didNotWork = true
        }
    }
}