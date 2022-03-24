<script>
import image from "../nftea-assets/assets/tcCycle.png"
    export let isLarge
    export let imageHeight
    let imageWidth 
    let clicked = false
    isLarge ? imageWidth = 406 : [imageWidth,imageHeight] = [166,146] 
</script>
<button style="background-image:url({image});background-repeat:no-repeat;background-size: contain;background-position: center;width:{imageWidth}px;height:{imageHeight}px;" class:active={clicked} on:click={() => {clicked = !clicked}}>
</button>
<style>
    button.active{
        border: 4px solid var(--primary-mono);
        border-radius: 24px;
    }
</style>
