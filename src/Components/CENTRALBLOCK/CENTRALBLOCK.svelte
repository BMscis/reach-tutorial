<script>
import { afterUpdate, onDestroy } from "svelte";
import NftList from "../NftList.svelte";
import { centralBlock } from "../../Stores/allDimension";

export let cards
export let hasActiveNft
let style
let blockHeight
let opacity = false
let visibility = 1
let hideOnClick = false

const unsubscribeCB = centralBlock.subscribe((value) => {
        style = value.style
        opacity = value.opacity
        blockHeight = value.height
    })
afterUpdate(() => {
    hideOnClick = opacity && hasActiveNft
})
onDestroy(() => {return [unsubscribeCB]})
</script>
<div id="central-block" style={style +`display:${hideOnClick?"none":"block"};` } >
    <NftList {blockHeight} {cards} ></NftList>
</div>
<style>
    #central-block{
        background-color: transparent;
        overflow: auto;
        z-index: 110;
        grid-row-start: 1;
        margin:20px;
    }
</style>