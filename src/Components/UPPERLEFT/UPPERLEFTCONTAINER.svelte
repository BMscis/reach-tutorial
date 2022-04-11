<script>
import { onDestroy, onMount} from "svelte";
import BodyNav from "../BodyNav.svelte"
import NftCard from "../BOTTOMBLOCK/NftCard.svelte";
import { rightBlock } from "../../Stores/allDimension";
import { nftCardList } from "../../Stores/nftCard";

let upperLeftBlockWidth
let upperLeftBlockHeight
let upperLeftBlockTop
let bidBoxWidth
let bidBoxHeight
let bodyNavWidth
let bodyNavHeight
let nftCardWidth
let nftCardHeight
let hasActiveNft = false

let id
let description
let image
let style
let price
let wallet
let ownerName
let previousOwner
let opacity = false
const unsubsrcibe = rightBlock.subscribe((value) => {
        style = value.style
        opacity= value.opacity
    })
onMount(() => {
    return nftCardList.subscribe((value) => {
        console.log("UPPERCONTAINER: ",value)
        let activeComp = value.find((v) => v.active === true);
        hasActiveNft = false
        if(activeComp){
            hasActiveNft = activeComp.active
            id = activeComp.id
            description = activeComp.description
            image = activeComp.image
            price = activeComp.price
            wallet = activeComp.wallet
            ownerName = activeComp.ownerName
            previousOwner = activeComp.previousOwner
        }
    })
})
let isLarge = false
onDestroy(() => unsubsrcibe)
</script>
<div id="upper-left-block" class:active={hasActiveNft} style={style}>
<div id="bid-box" style="width:{bidBoxWidth}px;height:{bidBoxHeight}px;position:relative;">
    <!-- <BodyNav width={bodyNavWidth} height={bodyNavHeight} backgroundColor="#a9d5f4" name="Bid Space"></BodyNav> -->
    {#if hasActiveNft}
        <NftCard {opacity} id={id} description={description} image={image} price={price} wallet={wallet} ownerName={ownerName} previousOwner={previousOwner}
        cardWidth={bidBoxWidth} cardHeight={bidBoxHeight} isLarge={true} labelDark={true}></NftCard>
    {/if}
    
</div>
</div>
<style>

    #upper-left-block{
        justify-content: center;
        align-items: center;
        position: relative;
        /* transform: translate(100%,0); */
        grid-column-start: 3;
        background: transparent;
        display: flex;
        border-radius: 8px 0 0 8px;
        z-index: 0;
    }
    #upper-left-block.active{
        transform: translate(0,0);
        z-index: 111;
    }
    #bid-box{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>