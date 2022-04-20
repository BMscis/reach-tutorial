<script>
import CENTRALBLOCK from "./CENTRALBLOCK/CENTRALBLOCK.svelte";
import {nftCardList} from "../Stores/nftCard"
import RIGHTBLOCK from "./RIGHTBLOCK/RIGHTBLOCK.svelte";
import { onDestroy } from "svelte";

let hasActiveNft = false

let id 
let owner 
let image 
let price 
let wallet 
let nonce 
let likes 
let style
let cards
let prevOwner 
let blockTime 
let ownerName 
let description 
let userPicture

nftCardList.subscribe((value) => {
    cards = value
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
onDestroy(() => {return [nftCardList]})

</script>
<RIGHTBLOCK {hasActiveNft}
{id }{owner }{image }{price }{wallet }{nonce }{likes }{style}{prevOwner }{blockTime }{ownerName }{description }{userPicture}></RIGHTBLOCK>
<CENTRALBLOCK {cards} {hasActiveNft}></CENTRALBLOCK>

