<script>
    import { onMount } from "svelte";
    import { windowSize } from "../../Stores/dimensions";
    import CardImage from "../CardImage.svelte";
    import CardHeader from "./CardHeader.svelte";
    export let isLarge = false
    export let labelDark = false
    let cardHeight
    let cardWidth
    isLarge? cardWidth=406 : [cardHeight=200,cardWidth=166] 
    onMount(()=> {
        return windowSize.subscribe((value) => {
            value.isLarge && isLarge ? cardHeight = Math.floor(value.height * 0.6) : cardHeight = 200
        })
    })
</script>
<div id="nft-card" style="width:{cardWidth}px;height:{cardHeight}px;margin:auto;background-color:var(--primary-comp);position:relative;">
    <CardImage isLarge={isLarge} imageHeight={Math.floor(cardHeight * 0.64)}></CardImage>
    <CardHeader isLarge={isLarge} labelDark={labelDark} labelMargin={0}></CardHeader>
</div>
<style>
    #nft-card{
        border-radius: 24px;
    }
</style>