<script>
import { onDestroy, onMount} from "svelte";
import BodyNav from "../BodyNav.svelte"
import NftCard from "../BOTTOMBLOCK/NftCard.svelte";
import { upperLeftContainer } from "../../Stores/dimensions";
import { nftCardList } from "../../Stores/nftCard";

let upperLeftBlockWidth
let upperLeftBlockHeight
let bidBoxWidth
let bidBoxHeight
let bodyNavWidth
let bodyNavHeight
let nftCardWidth
let nftCardHeight
let hasActiveNft = false

let label
let price
let owner
let image

const unsubsrcibe = upperLeftContainer.subscribe((value) => {
        upperLeftBlockWidth = value.upperLeftBlock.width
        upperLeftBlockHeight = value.upperLeftBlock.height
        bidBoxWidth = value.bidBox.width
        bidBoxHeight = value.bidBox.height
        bodyNavWidth = value.bodyNav.width
        bodyNavHeight = value.bodyNav.height
        nftCardWidth = value.nftCard.width
        nftCardHeight = value.nftCard.height
    })
onMount(() => {
    return nftCardList.subscribe((value) => {
        //console.log("UpperCont: ",value)
        let activeComp = value.find((v) => v.active === true);
        if(activeComp){
            hasActiveNft = activeComp.active
            label = activeComp.label
            price = activeComp.price
            owner = activeComp.owner
            image = activeComp.pic
        }
    })
})
let isLarge = false
onDestroy(() => unsubsrcibe)
</script>
<div id="upper-left-block" style="width:{upperLeftBlockWidth}px;height:{upperLeftBlockHeight}px; background:transparent;positon:relative;display:flex;">
<div id="bid-box" style="width:{bidBoxWidth}px;height:{bidBoxHeight}px;background-color:#0d5c8c6b;border-radius:40px;position:relative;">
    <BodyNav width={bodyNavWidth} height={bodyNavHeight} backgroundColor="#a9d5f4" name="Bid Space"></BodyNav>
    {#if hasActiveNft}
        <NftCard {label} {price} {owner} {image} cardWidth={nftCardWidth} cardHeight={nftCardHeight} isLarge={true} labelDark={true}></NftCard>
    {/if}
    <button>BID</button>
</div>
</div>
<style>
    button{
        border-radius: 24px;
        background-color: var(--primary-bright);
        width: 124px;
        height: 40px;
        margin: auto;
        color: white;
        font: 500 poppins;
    }
    button:hover{
        background-color: var(--spectacular-orange);
    }
    #upper-left-block{
        justify-content: center;
        align-items: center;
    }
    #bid-box{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>