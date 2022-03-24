<script>
import { onMount } from "svelte";
import { windowSize } from "../../Stores/dimensions";

import NftCard from "../BOTTOMBLOCK/NftCard.svelte";
let blockWidth =  Math.floor(window.innerWidth * 0.43)
let blockHeight = Math.floor(window.innerHeight * 0.87)
let isLarge = false
onMount(() => {
    windowSize.subscribe((value) => {
        blockWidth  = Math.floor(value.width * 0.43)
        blockHeight = Math.floor(value.height * 0.87)
        isLarge = value.isLarge
    })
})
</script>
<div id="upper-left-block" style="width: {blockWidth}px;height:{blockHeight}px; background:transparent;positon:relative;display:grid;">
    <NftCard isLarge={true} labelDark={true}></NftCard>
</div>