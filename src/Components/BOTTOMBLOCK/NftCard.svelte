<script>
    import CardImage from "../CardImage.svelte";
    import CardHeader from "./CardHeader.svelte";
    let isLarge = false
    let cardHeight
    let cardWidth
    isLarge? [cardHeight=516,cardWidth=406] : [cardHeight=211,cardWidth=166] 
    console.log
</script>
<div id="nft-card" style="width:{cardWidth}px;height:{cardHeight}px;background-color:var(--primary-comp);">
    <CardImage isLarge={isLarge}></CardImage>
    <CardHeader isLarge={isLarge}></CardHeader>
</div>
<style>
    #nft-card{
        border-radius: 24px;
    }
</style>