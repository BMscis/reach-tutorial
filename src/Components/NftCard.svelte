<script>
import { afterUpdate, onDestroy } from "svelte";
import CardImage from "./CardImage.svelte";
import {createNft} from "../Stores/nftCard";
import Bidder from "../Participants/Bidder.svelte";
import Auctioneer from "../Participants/Auctioneer.svelte";
import CardHeader from "./CENTRALBLOCK/CardHeader.svelte";
import CardDescription from "./CENTRALBLOCK/CardDescription.svelte";
import { consologger } from "../Utilities/utilities";
import { getImagesProtected, pic } from "../STORAGE/storage";
import Loading from "./Loading.svelte";
import { get } from "svelte/store";
import { walletAddress } from "../Stores/Wallet/WalletStore";
export let id
export let nftId
export let isOwner
export let awsName
export let nftPrice
export let nftImage
export let nftLikes
export let awsUserId
export let nftAssetOwner
export let nftPrevAssetOwner
export let nftContractAddress
export let nftAuctionDuration
//export let nftName
export let nftWalletName
export let nftDescription
export let awsUserPicture
export let clicked = false
export let isLarge = false
export let labelDark = false
export let blockHeight = 500

export let newOwner
let nftCard
let contractAddress
let cardHeight = (blockHeight*0.7).toFixed(2)
let cardCotnainerHeight = (blockHeight*0.75).toFixed(2)
let cardWidth = (cardHeight*0.55).toFixed(2)
let imageHeight = (cardWidth*0.9).toFixed(2)
let showContractInfo = false
let cardImage
let profilePic
const getImages = async () => {
    cardImage = await pic(nftImage)
    try {
        profilePic = await getImagesProtected(awsUserPicture,awsUserId)
    } catch (error) {
        console.log("nftCard.svelte: getImages: ",error)
    }
}
const enlarge = () => {
nftCard.scrollIntoView(false)
nftValidator(!clicked)
}

const startAuction = async () => {
    const create = new Auctioneer(newOwner)
    if(create.wallet != undefined){
        await create.deployContract(`${contractAddress}`)
    }
}

const  nftValidator = createNft(
    id,awsUserId,nftDescription,nftImage,nftPrice,nftAssetOwner,nftPrevAssetOwner,
    nftAuctionDuration,nftContractAddress,nftLikes,nftId,awsUserPicture,awsName,nftWalletName
    )

afterUpdate(() => {
    try {
        if(get(walletAddress) == nftAssetOwner){
        isOwner = true
    }else{
        isOwner = false
    }
    } catch (error) {
        console.log("ERROR NFT no walletAddress: ",error)   
    }
})
//onDestroy(()=> {return [nftSubscriber,nftValidator,unsubNFT]})

</script>
{#await getImages()}
    <Loading></Loading>
{:then result} 
<div id="nft-block" bind:this={nftCard}>
    <div id="nft-card-container" style="width:{cardWidth}px;height:{cardCotnainerHeight}px;"class:active={clicked}>
    <div id="nft-card" style="height:{cardHeight}px;width:{cardWidth}px;position:relative;grid-template-rows:10% {imageHeight}px 1fr .5fr">
    <CardImage {imageHeight} nftImage={cardImage}></CardImage>
    <CardDescription {nftWalletName} {isLarge} {nftDescription} {nftPrevAssetOwner} {nftPrice} {nftAssetOwner} ></CardDescription>
    <CardHeader {nftDescription} {awsName} {awsUserPicture}  {nftPrice}  isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" ></CardHeader>
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
    {:else if nftWalletName === "true"}
    {#if !clicked && !isLarge}
    <button id="bid" on:click={()=>{enlarge()}}>BID</button>
    {/if}
    {:else }
    {#if !clicked && !isLarge}
    <button id="auction-time-clock" on:click={()=>{enlarge()}}>NOT YET</button>
    {/if}
    {/if}
    </div>
    </div>
    {#if isLarge && clicked}
        {#if isOwner}
        <Auctioneer {newOwner} {nftPrice} {nftId} {clicked} {cardWidth} {cardHeight} {cardCotnainerHeight}></Auctioneer>
        {:else}
        <Bidder {nftContractAddress} {nftId} {clicked} {cardWidth} {cardHeight} {cardCotnainerHeight}></Bidder>
        {/if}
    {/if}
    </div>
{/await}
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
width: 124px;
height: 40px;
transform: scale(var(--ggs,.6));
grid-row-start: 1;
}
#bid:hover,#auction:hover{
background-color: var(--spectacular-orange-hover);
}
#nft-card{
border-radius: 8px;
display: grid;
align-items: center;
flex-wrap: nowrap;
margin: auto;
align-items: end;
}
#nft-card-container{
display: grid;
align-items: center;
grid-row-start: 1;
justify-content: start;
grid-auto-flow: column;
z-index: 111;
border-radius: 8px;
background: var(--background);
box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
border-bottom: 1px solid var(--primary-bright);
grid-row-start: 2;
}
#nft-card-container.active{
border-bottom: 1px solid var(--spectacular-orange);
z-index: 1;
}
</style>