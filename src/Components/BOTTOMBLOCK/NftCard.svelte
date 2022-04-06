<script>
    import MenuBar from "../MenuBar.svelte";
    import {createNft} from "../../Stores/nftCard"
    import CardImage from "../CardImage.svelte";
    import CardHeader from "./CardHeader.svelte";
    import { onDestroy } from "svelte";
import Timer from "../Timer.svelte";
import HeartIcon from "../HeartIcon.svelte";
import CommentIcon from "../CommentIcon.svelte";
    export let id
    export let description
    export let image
    export let price
    export let wallet
    export let ownerName
    export let previousOwner
    export let isLarge = false
    export let labelDark = false
    export let cardHeight
    export let cardWidth
    export let containerWidth
    export let containerHeight
    let active = false

    const [nftSubscriber,nftValidator] = createNft(id,description,image,price,wallet,ownerName,previousOwner)
    onDestroy(()=> {nftSubscriber})
</script>
<li id="nft-card-container" style="width:{containerWidth}px;height:{containerHeight}px;">
    <div id="nft-card" style="width:{cardWidth}px;height:{containerHeight}px;background-image:linear-gradient(58deg, rgb(15 48 74 / 0%), rgb(14, 39, 75));position:relative;">
        <CardImage {nftSubscriber} {nftValidator} {image} isLarge={isLarge} imageHeight={(cardHeight * 0.6).toFixed(2)} imageWidth={cardWidth}></CardImage>
        <CardHeader {price} label={ownerName} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" cardHeight={isLarge? (cardHeight * 0.1).toFixed(2):(cardHeight * 0.23).toFixed(2)}></CardHeader>
        {#if isLarge}
        <Timer></Timer>
        <button>BID</button>
        {/if}
        {#if isLarge}
        <MenuBar margin="0 auto" menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--primary-bright)" val="$1000"></MenuBar>
        <MenuBar margin="0 auto" menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--inactive-component)" val="$900"></MenuBar> 
        {/if}
    </div>
    {#if !isLarge}
    <div id="card-helper">
        <HeartIcon></HeartIcon>
        <CommentIcon></CommentIcon>        
    </div>
    {/if}
</li>
<style>
        button{
        border-radius: 8px;
        background-color: var(--primary-bright);
        width: 124px;
        height: 40px;
        margin: auto;
        color: white;
        font: 500 poppins;
        transform: scale(var(--ggs,.6));
        position: absolute;
        right:12px;
        top:12px;
    }
    button:hover{
        background-color: var(--spectacular-orange);
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
    background: radial-gradient(black, transparent);
    }
    #card-helper{
        display: grid;
    grid-gap: 40px;
    grid-auto-flow: row;
    height: 80px;
    width: 80px;
    align-items: center;
    justify-content: center;
    }
</style>