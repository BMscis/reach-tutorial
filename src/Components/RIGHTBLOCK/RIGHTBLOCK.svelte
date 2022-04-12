<script>
import { onDestroy, onMount} from "svelte";
import { nftCardList } from "../../Stores/nftCard";
import NftCard from "../CENTRALBLOCK/NftCard.svelte";
import { rightBlock } from "../../Stores/allDimension";

let bidBoxWidth
let bidBoxHeight
let hasActiveNft = false

let id 
let owner 
let description 
let image 
let price 
let wallet 
let prevOwner 
let blockTime 
let nonce 
let likes 
let ownerName 
let userPicture
let style
let opacity = false
let count = 0
const unsubsrcibe = rightBlock.subscribe((value) => {
        style = value.style
        opacity= value.opacity
    })
onMount(() => {
    return nftCardList.subscribe((value) => {
        //console.log("RIGHTBLOCK:", count += 1)
        //console.log("RIGHTBLOCK:", value)
        let activeComp = value.find((v) => v.active === true);
        hasActiveNft = false
        if(activeComp){
            hasActiveNft = activeComp.active
            id = activeComp.id
            owner = activeComp.owner
            description = activeComp.description
            image = activeComp.image
            price = activeComp.price
            wallet = activeComp.wallet
            prevOwner = activeComp.prevOwner
            blockTime = activeComp.blockTime
            nonce = activeComp.nonce
            likes = activeComp.likes
            ownerName = activeComp.ownerName
            userPicture = activeComp.userPicture
        }
    })
})
onDestroy(() => unsubsrcibe)
</script>
<div id="right-block" class:active={hasActiveNft} style={style}>
    <div id="bid-box" style="width:{bidBoxWidth}px;height:{bidBoxHeight}px;position:relative;">
        {#if hasActiveNft}
            <NftCard {opacity} cardWidth={bidBoxWidth} cardHeight={bidBoxHeight} isLarge={true} labelDark={true}
            {id}{owner }{description }{image }{price }{wallet }{prevOwner }{blockTime }{nonce }{likes }{ownerName }{userPicture}
            ></NftCard>
        {/if}
    </div>
</div>
<style>
    #right-block{
        justify-content: center;
        align-items: center;
        position: relative;
        grid-column-start: 3;
        background: transparent;
        display: flex;
        border-radius: 8px 0 0 8px;
        z-index: 0;
    }
    #right-block.active{
        transform: translate(0,0);
        z-index: 111;
    }
    #bid-box{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
</style>