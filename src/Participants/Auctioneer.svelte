<script>
import { onDestroy } from "svelte";
import InputContainer from "../Components/INPUTS/InputContainer.svelte";
import Loading from "../Components/Loading.svelte";
import MenuBar from "../Components/MenuBar.svelte";
import Timer from "../Components/Timer.svelte";
import { bidNFT } from "../ReachContract/nftContract";
import { Creator } from "../ReachContract/pt";
import { auctionReady, contractState, creatorSeeBid } from "../ReachContract/reachStore";
import { bidderInfo } from "../Stores//Wallet/PrincipalStore";
import ContractDeploy from "../Participants/ContractDeploy.svelte";
import { nftContractId } from "../Stores/Wallet/WalletStore";
import { updateNFTeaCard } from "../STORAGE/nftCardMutations";
import { consologger } from "../Utilities/utilities";
export let nftId
export let clicked
export let newOwner
export let nftPrice
export let cardWidth
export let cardHeight
export let cardCotnainerHeight

const ownedBy = newOwner
let isAuctionReady
let auctionState
let getContract
let bidPrice
let bidderClass
let loading = false
let bidderList = []
let awaitBid = false
let nftContractAddress
let placeBid = false
let previewPage = false
let formWidth =cardWidth - 50
let innerWidth =cardWidth - 70
let innerHeight = (innerWidth*0.23).toFixed(2)
const askContract = async () => {
    previewPage = true
}
const awaitContract = async () => {
    let newOwnerNext = "3G2IC23R6N2XC3PZPX7IJUB2KNMRML4C2DIEERGH6XNV3VFOW3GU4L3EDI"
    let prevOwner = newOwner.nftAssetOwner
    await updateNFTeaCard(ownedBy, newOwnerNext,prevOwner,5)
    //getContract = new Creator(ownedBy)
    //let [pb, cA] = await getContract.waitContract(nftId,nftPrice)
    return placeBid
}

const unsubscribeBidder = bidderInfo.subscribe(value => {
if(value){
bidderClass = value
}})
auctionReady.subscribe(value => {
    isAuctionReady = value
})
contractState.subscribe(value=>{
    consologger("Creator.svelte","AUCTION STATE", value)
    auctionState = value
})
creatorSeeBid.subscribe(value=>{
    consologger("Creator.svelte","BID LIST", value)
    if(value.length > 1){
        bidderList = value
        bidderList.sort((a, b) => b - a);
    }else{
        bidderList = value
    }
})
nftContractId.subscribe(value=>{
    nftContractAddress = value
})
onDestroy(()=> {return [unsubscribeBidder,contractState,auctionReady]})

</script>
<div id="auctioneer-block" style="left:{cardWidth-11}px;width:{cardWidth - 40}px;height:{cardCotnainerHeight}px;"class:active={clicked}>
    {#if !previewPage}
<button id="start-auction-button" on:click={()=> askContract()}>Start Auction</button>
    {/if}
    {#if previewPage}
    {#await awaitContract()}
    <div style="display: none;"></div>
    {/await}
    {#if auctionState <= 5}
    <Loading></Loading>
    <ContractDeploy isSide={false} {auctionState} ></ContractDeploy>
    {/if}
    {#if auctionState >= 6}
    <div id="contract-cover">
        <div>Copy contract address</div>
        <input type="text" bind:value={nftContractAddress} >
    </div>
    <div id="bidder-space" style="height:{cardHeight}px;">
        <div id="top-bid-bar">
        <Timer></Timer>
        </div>
        <div id="bidders-bar" style="width:{innerWidth}px;">
            <ul>
                {#each bidderList as bid}
                <li>
                <MenuBar menuBarWidth={innerWidth} menuBarHeight={innerHeight} margin="0 auto"   val={bid}></MenuBar>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    {/if}
    {/if}
</div>
<style>
    #contract-cover{
        display: flex;
        flex-direction: column;
        padding: 10px;
        position: absolute;
        top: 10%;
        left: 5px;
    }
form{
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
}
#start-auction-button{
    transform: scale(var(--ggs,.7));
}
#auctioneer-block{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 8px 8px 0;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
    background: #0000000a;
}
#auctioneer-block button{
    position: absolute;
    right: 0;
    top:0;
}
#auctioneer-block.active{
border-bottom: 1px solid var(--spectacular-orange);
z-index: 0;
}
input{
    font:var(--font-subscript);
    color: black;
    border: 1px solid;
    border-radius: 4px;
}
ul{padding: 0;}
#top-bid-bar{
    height: 20%;
}
#send-nft-bid{
    background: var(--inactive-component);
}
#send-nft-bid:hover{
    background: var(--spectacular-orange);
}
#mid-bid-bar{
    height: 40%;
}
#bidder-space{
    display: block;
    overflow-y: auto;
    right: 0;
}
#bidders-bar{
    overflow-y: auto;
    height: 40%;
    position: absolute;
    bottom: 0;
    right: 10px;
    border-radius: 5%;
}
#bidders-bar ul,#bidders-bar ul li{
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
}
</style>

