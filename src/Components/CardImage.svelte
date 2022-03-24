<script>
    import image from "../nftea-assets/assets/tcCycle.png"
    export let isLarge
    let imageWidth 
    let imageHeight
    let clicked = false
    isLarge ? [imageWidth,imageHeight] = [406,366] : [imageWidth,imageHeight] = [166,146] 
    console.log(isLarge)
</script>
<button style="background-image:url({image});background-repeat:no-repeat;background-size:90%;
width:{imageWidth}px;height:{imageHeight}px;" class:active={clicked} on:click={() => {clicked = !clicked}}>
</button>
<style>
    button.active{
        border: 2px solid var(--primary-mono);
    }
</style>
