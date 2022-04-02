<script>
    import MenuBar from "../MenuBar.svelte";
    import {createNft} from "../../Stores/nftCard"
    import CardImage from "../CardImage.svelte";
    import CardHeader from "./CardHeader.svelte";
    import { onDestroy } from "svelte";
    export let label
    export let isLarge = false
    export let labelDark = false
    export let cardHeight
    export let cardWidth
    export let image
    export let price
    export let owner
    let active = false

    const [nftSubscriber,nftValidator] = createNft(image,owner,label,price,active)
    onDestroy(()=> {nftSubscriber})
</script>
<div id="nft-card" style="width:{cardWidth}px;height:{cardHeight}px;margin:auto;background-image:linear-gradient(58deg, rgb(15, 48, 74), rgb(14 39 75));position:relative;">
    <CardImage {nftSubscriber} {nftValidator} {image} isLarge={isLarge} imageHeight={(cardHeight * 0.6).toFixed(2)} imageWidth={cardWidth}></CardImage>
    <CardHeader {price} {label} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" cardHeight={isLarge? (cardHeight * 0.1).toFixed(2):(cardHeight * 0.23).toFixed(2)}></CardHeader>
    {#if isLarge}
    <MenuBar menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--primary-bright)" val="$1000"></MenuBar>
    <MenuBar menuBarWidth={(cardWidth * 0.7).toFixed(2)} menuBarHeight={(cardHeight * 0.075).toFixed(2)} backgroundColor="var(--inactive-component)" val="$900"></MenuBar> 
    {/if}
</div>
<style>
    #nft-card{
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex-wrap: nowrap;
    }
</style>