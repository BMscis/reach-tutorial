import { get } from 'svelte/store';
import { cyberuser, reachStdlib, wallet } from '../Stores/Wallet/WalletStore.js';
import * as backend from '../../Reach/build/index.main.mjs';

export class CreatorTest{
    constructor(){
        console.log("1")
        this.accCreator = get(wallet)
        this.stdlib = get(reachStdlib);
        this.owner = get(cyberuser).attributes.name
        console.log("1")
        this.minBid = this.stdlib.parseCurrency(2)
        this.lenInBlocks = 60
        this.run()
    }
    async run(){
        console.log("1")
        this.ctcCreator = await this.accCreator.contract(backend)
        await this.start()

    }
    async start () {
        console.log("1")
        this.theNFT = await this.stdlib.launchToken(this.accCreator, "bumple", "NFT", { supply: 1 });
        this.nftId = this.theNFT.id
        this.params = {nftId:this.nftId,minBid:this.stdlib.parseCurrency(2),lenInBlocks: 120}
        console.log("NFT ID:", this.nftId);
        console.log(parseInt(this.nftId))
        console.log("2A: Creator starts sale:",this.ctcCreator);
        await this.ctcCreator.participants.Creator(this);
        this.contractAddress = await this.ctcCreator.getInfo()
        console.log("+++++++: Creator contract address:",JSON.stringify(this.contractAddress,null,2));
        console.log(this.contractAddress)
        return
    }
    async getSale (){
        console.log(`Creator sets parameters of sale:`, this.params);
        return this.params;
    }
    async auctionReady () {
        console.log("Ready")
    }
    async seeBid(who, amt){
        console.log(`Creator saw that ${this.stdlib.formatAddress(who)} bid ${this.stdlib.formatCurrency(amt)}.`);
    }
    async showOutcome (winner, amt){
        console.log(`Creator saw that ${this.stdlib.formatAddress(winner)} won with ${this.stdlib.formatCurrency(amt)}`);
    }
    async giveTime(tim){
        consologger("giveTime",tim)
    }
    async log(log){
        let logg = JSON.parse(log)
        console.log("2B: Creator log",logg)
    }
}