<script>
import { onDestroy } from "svelte";

import images from "../nftea-assets/assets/tcCycle.webp"
import { nftCardList } from "../Stores/nftCard";
    export let image
    export let isLarge
    export let imageHeight
    export let imageWidth
    export let nftValidator
    export let nftSubscriber

</script>
<div style="height:{imageHeight}px;background-image:url({image? image:images});background-repeat:no-repeat;background-size: contain;background-position: center;outline:none;">
</div>
<style>
    button.active{
        border-bottom: 4px solid #4a90b9;
    }
</style>
