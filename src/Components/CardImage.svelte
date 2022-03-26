<script>
import { onDestroy } from "svelte";

import images from "../nftea-assets/assets/tcCycle.png"
    export let image
    export let isLarge
    export let imageHeight
    export let imageWidth
    export let nftValidator
    export let nftSubscriber
    let clicked = false
    const enlarge = () => {
        nftValidator(!clicked)
    }
    nftSubscriber.subscribe((value) => {
        console.log("CARDIMAGE: ",value)
        clicked = value.active
    })
    onDestroy(()=> {nftSubscriber})
</script>
<button style="width:{imageWidth}px;height:{imageHeight}px;background-image:url({image? image:images});background-repeat:no-repeat;background-size: contain;background-position: center;outline:none;" class:active={clicked} on:click={() => {enlarge()}}>
</button>
<style>
    button.active{
        border-bottom: 4px solid var(--primary-mono);
        border-radius: 24px;
    }
</style>
