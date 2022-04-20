<script>
import { onDestroy } from "svelte";
import CardImage from "../CardImage.svelte";
import CardHeader from "./CardHeader.svelte";
import {createNft} from "../../Stores/nftCard";
import Bidder from "../../Participants/Bidder.svelte";
import CardDescription from "./CardDescription.svelte";

export let id
export let likes
export let owner
export let image
export let price
export let nonce
export let wallet
export let prevOwner
export let blockTime
export let ownerName
export let description
export let userPicture
export let clicked = false
export let isLarge = false
export let labelDark = false
export let blockHeight = 500

let nftCard
let cardHeight = (blockHeight*0.7).toFixed(2)
let cardCotnainerHeight = (blockHeight*0.75).toFixed(2)
let cardWidth = (cardHeight*0.55).toFixed(2)
let imageHeight = (cardWidth*0.9).toFixed(2)

const enlarge = () => {
nftCard.scrollIntoView(true)
nftValidator(!clicked)
}

const [nftSubscriber,nftValidator] = 
createNft(id,owner,description,image,price,wallet,prevOwner,blockTime,nonce,likes,ownerName,userPicture)

const unsubNFT = nftSubscriber.subscribe((value) => {id = value.id})


onDestroy(()=> {return [nftSubscriber,nftValidator,unsubNFT]})

</script>
<div id="nft-block" bind:this={nftCard}>
<div id="nft-card-container" style="width:{cardWidth}px;height:{cardCotnainerHeight}px;"class:active={clicked}>
<div id="nft-card" style="height:{cardHeight}px;width:{cardWidth}px;background-image:linear-gradient(58deg, #4a90b9, rgb(14, 39, 75));position:relative;">
<CardImage {imageHeight}{image}></CardImage>
<CardDescription {isLarge} {description} {prevOwner} {price} {wallet} ></CardDescription>
<CardHeader {ownerName} {userPicture} {owner} {price} label={ownerName} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" ></CardHeader>
{#if clicked && isLarge}
<button class="gg-backspace" on:click={() => {enlarge()}}></button>
{/if}
{#if !clicked && !isLarge}
<button id="bid" on:click={()=>{enlarge()}}>BID</button>
{/if}
</div>
</div>
{#if isLarge && clicked}
<Bidder {clicked} {cardWidth} {cardHeight} {cardCotnainerHeight}></Bidder>
{/if}
</div>
<style>
#nft-block{
display: flex;
flex-direction: row;
position: relative;
width: 100%;
}
#bid{
border-radius: 8px;
margin: auto;
color: white;
font: 500 poppins;
background:var(--inactive-component);
width: 124px;
height: 40px;
top:12px;
right:12px;
transform: scale(var(--ggs,.6));
position: absolute;

}
#bid:hover{
background-color: var(--spectacular-orange-hover);
}
#nft-card{
border-radius: 8px;
display: flex;
flex-direction: column;
justify-content: flex-end;
flex-wrap: nowrap;
margin:auto 0;
}
#nft-card-container{
display: grid;
align-items: center;
justify-content: start;
grid-auto-flow: column;
z-index: 111;
}
#nft-card-container.active{
border-bottom: 1px solid var(--spectacular-orange);
z-index: 1;
}
</style>