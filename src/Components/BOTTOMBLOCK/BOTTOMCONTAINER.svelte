<script>
    import NftCard from "./NftCard.svelte"
    import {windowSize} from "../../Stores/dimensions"
    import { onMount } from "svelte";
import BodyNav from "../BodyNav.svelte";
    let isLarge = true
    let bottomWidth = Math.floor(window.innerWidth * 0.57)
    let bottomHeight = Math.floor(window.innerHeight * 0.37)
    let cards = [1,2,3,4,5,6,7]
    onMount(() => {
        windowSize.subscribe((value) => {
            bottomWidth = Math.floor(value.width * 0.57)
            bottomHeight= Math.floor(value.height * 0.37)
            isLarge = value.isLarge
        })
    })
</script>
<div id="bottom-bar" style="width:{bottomWidth}px;height:{bottomHeight}px;">
    <BodyNav width={bottomWidth - 54} name="Latest"></BodyNav>
    <div id="nft-list" style="width:{bottomWidth - 54}px;height:{bottomHeight - 40}px">
        {#each cards as card}
            <NftCard ></NftCard>
        {/each}
    </div>
</div>
<style>
    #nft-list{
        display: grid;
        grid-auto-flow: column;
        grid-gap: 20px;
        margin: auto;
        overflow: auto;
        overflow-y: hidden;
        background-color: #00000087;
    }
</style>