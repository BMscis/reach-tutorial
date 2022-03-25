<script>
import images from "../nftea-assets/assets/tcCycle.png"
    export let image
    export let isLarge
    export let imageHeight
    export let imageWidth
    let clicked = false
    
</script>
<button style="width:{imageWidth}px;height:{imageHeight}px;background-image:url({image? image:images});background-repeat:no-repeat;background-size: contain;background-position: center;outline:none;" class:active={clicked} on:click={() => {clicked = !clicked}}>
</button>
<style>
    button.active{
        border-bottom: 4px solid var(--primary-mono);
        border-radius: 24px;
    }
</style>
