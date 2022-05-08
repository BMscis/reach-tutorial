<script>
import { onDestroy} from "svelte";
import NftCard from "../NftCard.svelte";
import { rightBlock } from "../../Stores/allDimension";

let bidBoxWidth
let bidBoxHeight
export let hasActiveNft = false

export let id 
export let nftId
export let style
export let isOwner
export let awsName 
export let nftImage 
export let nftLikes
export let nftPrice 
export let awsUserId 
export let nftWalletName
export let nftAssetOwner 
export let awsUserPicture
export let nftDescription 
export let nftContractAddress 
export let nftPrevAssetOwner 
export let nftAuctionDuration 
//export let nftName

let blockHeight
let opacity = false

const unsubsrcibeBlock= rightBlock.subscribe((value) => {
        style = value.style
        opacity= value.opacity
        blockHeight = value.height
        bidBoxHeight = (blockHeight * 0.75).toFixed(2)
        bidBoxWidth = (bidBoxHeight*0.55).toFixed(2)
    })

onDestroy(() => {return [unsubsrcibeBlock]})
</script>
<div id="right-block" class:active={hasActiveNft} style={style}>
    <div id="bid-box" style="width: {bidBoxWidth * 2}px;height: {bidBoxHeight}px;">
        {#if hasActiveNft}
            <NftCard {blockHeight} isLarge={true} labelDark={true} clicked={hasActiveNft} {nftWalletName} {isOwner}
            {id}{awsUserId }{nftDescription }{nftImage }{nftPrice }{nftAssetOwner }{nftPrevAssetOwner }{nftAuctionDuration }{nftContractAddress }{nftLikes}{nftId}{awsName }{awsUserPicture}
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
        display: none;
        border-radius: 8px 0 0 8px;
        z-index: 0;
    }
    #right-block.active{
        display: flex;
        transform: translate(0,0);
        z-index: 110;
    }
    #bid-box{
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        position: relative;
    }
</style>