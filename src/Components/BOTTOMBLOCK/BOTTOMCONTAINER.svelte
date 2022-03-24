<script>
    import NftCard from "./NftCard.svelte"
    import {windowSize} from "../../Stores/dimensions"
    import { onMount } from "svelte";
    let isLarge = true
    let bottomWidth = Math.floor(window.innerWidth * 0.57)
    let bottomHeight = Math.floor(window.innerHeight * 0.37)
    onMount(() => {
        windowSize.subscribe((value) => {
            bottomWidth = Math.floor(value.width * 0.57)
            bottomHeight= Math.floor(value.height * 0.37)
            isLarge = value.isLarge
        })
    })
</script>
<div id="nft-list" style="width:{bottomWidth}px;height:{bottomHeight}px;">
<NftCard ></NftCard>
</div>
<style>
    #nft-list{
        margin-left: 27px;
    }
</style>