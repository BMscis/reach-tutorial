<script>
    import MenuBar from "../MenuBar.svelte";
    import {createNft} from "../../Stores/nftCard"
    import CardImage from "../CardImage.svelte";
    import CardHeader from "./CardHeader.svelte";
    import { onDestroy } from "svelte";
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
    <div id="nft-card" style="width:{cardWidth}px;height:{cardHeight}px;background-image:linear-gradient(58deg, rgb(15, 48, 74), rgb(14 39 75));position:relative;">
        <CardImage {nftSubscriber} {nftValidator} {image} isLarge={isLarge} imageHeight={(cardHeight * 0.6).toFixed(2)} imageWidth={cardWidth}></CardImage>
        <CardHeader {price} {id} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" cardHeight={isLarge? (cardHeight * 0.1).toFixed(2):(cardHeight * 0.23).toFixed(2)}></CardHeader>
        {#if isLarge}
        <MenuBar menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--primary-bright)" val="$1000"></MenuBar>
        <MenuBar menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--inactive-component)" val="$900"></MenuBar> 
        {/if}
    </div>
</li>
<style>
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
        justify-content: center;
    }
</style>