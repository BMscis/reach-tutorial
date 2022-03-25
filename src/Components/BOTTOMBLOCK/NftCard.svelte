<script>
    import CardImage from "../CardImage.svelte";
    import MenuBar from "../MenuBar.svelte";
    import CardHeader from "./CardHeader.svelte";
    export let label
    export let isLarge = false
    export let labelDark = false
    export let cardHeight
    export let cardWidth
    export let image
    export let price
</script>
<div id="nft-card" style="width:{cardWidth}px;height:{cardHeight}px;margin:auto;background-color:var(--primary-comp);position:relative;">
    <CardImage  {image} isLarge={isLarge} imageHeight={Math.floor(cardHeight * 0.6)} imageWidth={cardWidth}></CardImage>
    <CardHeader {price} {label} isLarge={isLarge} labelDark={labelDark} labelMargin={0} position="relative" cardHeight={isLarge? Math.floor(cardHeight * 0.1):Math.floor(cardHeight * 0.23)}></CardHeader>
    {#if isLarge}
    <MenuBar menuBarWidth={Math.floor(cardWidth * 0.7)} menuBarHeight={Math.floor(cardHeight * 0.075)} backgroundColor="var(--primary-bright)" val=1000></MenuBar>
    <MenuBar menuBarWidth={Math.floor(cardWidth * 0.7)} menuBarHeight={Math.floor(cardHeight * 0.075)} backgroundColor="var(--inactive-component)" val=900></MenuBar> 
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