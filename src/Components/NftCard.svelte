<script>
import { onDestroy } from "svelte";
import CardImage from "./CardImage.svelte";
import CardHeader from "./CENTRALBLOCK/CardHeader.svelte";
import {createNft} from "../Stores/nftCard";
import Bidder from "../Participants/Bidder.svelte";
import Creator from "../Participants/Creator.svelte";
import CardDescription from "./CENTRALBLOCK/CardDescription.svelte";
import { cyberuser } from "../Stores/Wallet/WalletStore";
import { get } from "svelte/store";

export let id
export let nftLikes
export let nftId
export let awsUserId
export let nftImage
export let nftPrice
export let nftContractAddress
export let nftAssetOwner
export let nftPrevAssetOwner
export let nftAuctionDuration
export let awsName
//export let nftName
export let nftWalletName
export let nftDescription
export let awsUserPicture
export let clicked = false
export let isLarge = false
export let labelDark = false
export let blockHeight = 500

let nftCard
let contractAddress
let cardHeight = (blockHeight*0.7).toFixed(2)
let cardCotnainerHeight = (blockHeight*0.75).toFixed(2)
let cardWidth = (cardHeight*0.55).toFixed(2)
let imageHeight = (cardWidth*0.9).toFixed(2)
let showContractInfo = false
const isOwner = get(cyberuser).username === awsUserId

const enlarge = () => {
nftCard.scrollIntoView(false)
nftValidator(!clicked)
}

const startAuction = async () => {
    const create = new Creator()
    if(create.wallet != undefined){
        await create.deployContract(`${contractAddress}`)
    }
}
const [nftSubscriber,nftValidator] = 
createNft(id,awsUserId,nftDescription,nftImage,nftPrice,nftAssetOwner,nftPrevAssetOwner,nftAuctionDuration,nftContractAddress,nftLikes,nftId,awsUserPicture,awsName,nftWalletName)

const unsubNFT = nftSubscriber.subscribe((value) => {id = value.id})


onDestroy(()=> {return [nftSubscriber,nftValidator,unsubNFT]})

</script>
<div id="nft-block" bind:this={nftCard}>
<div id="nft-card-container" style="width:{cardWidth}px;height:{cardCotnainerHeight}px;"class:active={clicked}>
<div id="nft-card" style="height:{cardHeight}px;width:{cardWidth}px;position:relative;">
<CardImage {imageHeight}{nftImage}></CardImage>
<CardDescription {nftWalletName} {isLarge} {nftDescription} {nftPrevAssetOwner} {nftPrice} {nftAssetOwner} ></CardDescription>
<CardHeader {awsName} {awsUserPicture}  {nftPrice}  isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" ></CardHeader>
{#if clicked && isLarge}
<button class="gg-backspace" on:click={() => {enlarge()}}></button>
{/if}
{#if isOwner}
{#if !clicked && !isLarge}
<button id="auction" on:click={() => {enlarge()}}>Auction</button>
{#if showContractInfo}
    <form on:submit|preventDefault={startAuction}>
        <input type="text" placeholder="Contract Address" id="contractAddress" bind:value={contractAddress}/>
        <button type="submit" placeholder="submit">Submit</button>
    </form>
{/if}
{/if}
{:else}
{#if !clicked && !isLarge}
<button id="bid" on:click={()=>{enlarge()}}>BID</button>
{/if}
{/if}
</div>
</div>
{#if isLarge && clicked}
    {#if isOwner}
    <Creator {nftPrice} {nftId} {clicked} {cardWidth} {cardHeight} {cardCotnainerHeight}></Creator>
    {:else}
    <Bidder {nftId} {clicked} {cardWidth} {cardHeight} {cardCotnainerHeight}></Bidder>
    {/if}
{/if}
</div>
<style>
#nft-block{
display: flex;
flex-direction: row;
position: relative;
width: 100%;
}
#bid,#auction{
border-radius: 8px;
margin: auto;
color: white;
font: 500 poppins;
width: 124px;
height: 40px;
top:12px;
right:12px;
transform: scale(var(--ggs,.6));
position: absolute;

}
#bid:hover,#auction:hover{
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
border-radius: 8px;
background: var(--background);
box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
border-bottom: 1px solid var(--primary-bright);
}
#nft-card-container.active{
border-bottom: 1px solid var(--spectacular-orange);
z-index: 1;
}
</style>