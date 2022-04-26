<script>
import { onDestroy } from "svelte";
import InputContainer from "../Components/INPUTS/InputContainer.svelte";
import Loading from "../Components/Loading.svelte";
import MenuBar from "../Components/MenuBar.svelte";
import Timer from "../Components/Timer.svelte";
import { bidNFT } from "../ReachContract/nftContract";
import { bidderInfo } from "../Stores//Wallet/PrincipalStore";
export let nftId
export let clicked
export let cardWidth
export let cardHeight
export let cardCotnainerHeight

let nftContractAddress
let bidPrice
let bidContract
let bidderClass
let loading = false
let bidderList = []
let awaitBid = false
let showContractPage = true
let previewPage = true
let formWidth =cardWidth - 50
let innerWidth =cardWidth - 70
let innerHeight = (innerWidth*0.23).toFixed(2)

const latchContract = async () => {
loading = true
showContractPage = false
let newPage
[newPage,bidContract] = await bidNFT(nftContractAddress,nftId)
newPage = previewPage
loading = false
awaitBid = true
return
}

const sendCurrentBid = async () => {
console.log("___________BID_PRICE____________",bidPrice)
let [cBid,lBid] = await bidContract.bid(bidPrice)
bidderList = [[cBid,lBid]]
bidderList.sort((a, b) => b - a);
console.log("BID",[cBid,lBid])
console.log("BIDDER LIST",bidderList)
return
}

const unsubscribeBidder = bidderInfo.subscribe(value => {
if(value){
bidderClass = value
}})

onDestroy(()=> {return [unsubscribeBidder]})

</script>
<div id="bidder-block" style="left:{cardWidth-11}px;width:{cardWidth - 40}px;height:{cardCotnainerHeight}px;"class:active={clicked}>
    {#if showContractPage}
    <div id="preview-page" style="height:{cardHeight}px;">
        <form on:submit|preventDefault={()=> {latchContract()}} style="width: {formWidth}px;">
        <InputContainer inputContainerWidth={innerWidth} inputContainerHeight={innerHeight} inputSlotHeight={innerHeight} inputSlotWidth={innerWidth}>
        <input slot="input-slot" class="input-rect-input" type="text" placeholder="Contract" id="bid-contract" bind:value={nftContractAddress} style="width: {innerWidth}px;height:{innerHeight}px;"/>
        </InputContainer>
        <InputContainer inputContainerWidth={innerWidth} inputContainerHeight={innerHeight} inputSlotHeight={innerHeight} inputSlotWidth={innerWidth}>
        <button slot="input-slot" class="input-rect-input" id="send-nft-bid" type="submit" style="width: {innerWidth}px;height:{innerHeight}px;">Send</button>
        </InputContainer>
        </form>
    </div>
    {/if}
    {#if loading}
        <Loading></Loading>
    {/if}
    {#if awaitBid}
    <div id="bidder-space" style="height:{cardHeight}px;">
        <div id="top-bid-bar">
        <Timer></Timer>
        </div>
        <div id="mid-bid-bar" style="width:{formWidth}px;">
            <form on:submit|preventDefault={()=> {sendCurrentBid()}} style="width: {formWidth}px;">
                <InputContainer inputContainerWidth={innerWidth} inputContainerHeight={innerHeight} inputSlotHeight={innerHeight} inputSlotWidth={innerWidth}>
                <input slot="input-slot" class="input-rect-input" type="number" placeholder="Bid Amount" id="bid-amount" bind:value={bidPrice} style="width: {innerWidth}px;"/>
                </InputContainer>
                <InputContainer inputContainerWidth={innerWidth} inputContainerHeight={innerHeight} inputSlotHeight={innerHeight} inputSlotWidth={innerWidth}>
                <button slot="input-slot" class="input-rect-input" id="send-nft-bid" type="submit" style="width: {innerWidth}px;">SUBMIT BID</button>
                </InputContainer>
            </form>
        </div>
        <div id="bidders-bar" style="width:{innerWidth}px;">
            <ul>
                {#each bidderList as bid}
                <li>
                <MenuBar menuBarWidth={innerWidth} menuBarHeight={innerHeight} margin="0 auto"   val={bid[0]}></MenuBar>
                </li>
                <li>
                <MenuBar menuBarWidth={innerWidth} menuBarHeight={innerHeight} margin="0 auto"  val={bid[1]}></MenuBar>
                </li>
                {/each}
            </ul>
        </div>
    </div>
    {/if}
</div>
<style>
form{
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
}
#bidder-block{
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
#bidder-block.active{
border-bottom: 1px solid var(--spectacular-orange);
z-index: 0;
}
#preview-page{
    height: 411.39px;
    background: #00000030;
    margin: 20px auto;
    border-radius: 0 8px 8px 0;
    width: 100%;
    position: relative;
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

