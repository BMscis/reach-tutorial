<script>
import CENTRALBLOCK from "./CENTRALBLOCK/CENTRALBLOCK.svelte";
import {nftCardList} from "../Stores/nftCard"
import RIGHTBLOCK from "./RIGHTBLOCK/RIGHTBLOCK.svelte";
import { onDestroy } from "svelte";

let hasActiveNft = false

let id
let awsUserId
let nftDescription
let nftImage
let nftPrice
let nftAssetOwner
let nftPrevAssetOwner
let nftAuctionDuration
let nftContractAddress
let nftLikes
let nftId
let awsUserPicture
let awsName
let nftWalletName
//let nftName

let style
let cards
nftCardList.subscribe((value) => {
    if(value.length > 0){
        cards = value
    let activeComp = value.find((v) => v.active === true);
    hasActiveNft = false
    if(activeComp){
        hasActiveNft = activeComp.active
        id = activeComp.id
        awsUserId = activeComp.awsUserId
        nftDescription = activeComp.nftDescription
        nftImage = activeComp.nftImage
        nftPrice = activeComp.nftPrice
        nftAssetOwner = activeComp.nftAssetOwner
        nftPrevAssetOwner = activeComp.nftPrevAssetOwner
        nftAuctionDuration = activeComp.nftAuctionDuration
        nftContractAddress = activeComp.nftContractAddress
        nftLikes = activeComp.nftLikes
        nftId = activeComp.nftId
        awsName = activeComp.awsName
        awsUserPicture = activeComp.awsUserPicture
        nftWalletName = activeComp.nftWalletName
        //nftName = activeComp.nftName
    }}
})
onDestroy(() => {return [nftCardList]})

</script>
<RIGHTBLOCK {hasActiveNft} {nftWalletName} 
{id }{awsUserId }{nftImage }{nftPrice }{nftAssetOwner }{nftContractAddress }{nftLikes }{nftId}{style}{nftPrevAssetOwner }{nftAuctionDuration }{awsName }{nftDescription }{awsUserPicture}></RIGHTBLOCK>
<CENTRALBLOCK {cards} {hasActiveNft}></CENTRALBLOCK>

