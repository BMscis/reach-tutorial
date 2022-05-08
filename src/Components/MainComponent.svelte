<script>
    import { get } from 'svelte/store';
    import { afterUpdate, onDestroy } from "svelte";
    import {nftCardList} from "../Stores/nftCard"
    import RIGHTBLOCK from "./RIGHTBLOCK/RIGHTBLOCK.svelte";
    import { reachStdlib, walletAddress } from "../Stores/Wallet/WalletStore";
    import CENTRALBLOCK from "./CENTRALBLOCK/CENTRALBLOCK.svelte";
let hasActiveNft = false

let id
let reach
let nftId
let awsName
let isOwner
let nftLikes
let nftPrice
let nftImage
let awsUserId
let nftAssetOwner
let nftWalletName
let nftDescription
let awsUserPicture
let nftPrevAssetOwner
let nftAuctionDuration
let nftContractAddress
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
        isOwner = activeComp.isOwner
        //nftName = activeComp.nftName
    }}
})
reachStdlib.subscribe((value) => {
    if(value){
        let nftCL = get(nftCardList)
        reach = value
        let wallet = get(walletAddress)
        let ownerList = nftCL.filter((card) => reach.addressEq(wallet, card.nftAssetOwner))
        ownerList.forEach(element => {
            element.isOwner = true
        });
        nftCardList.update((n) => (n = n));

    }
})
afterUpdate(() => {
    try {
        let nftCL = get(nftCardList)
        let wallet = get(walletAddress)
        let ownerList = nftCL.filter((card) => reach.addressEq(wallet, card.nftAssetOwner))
        ownerList.forEach(element => {
            element.isOwner = true
        });
        nftCardList.update((n) => (n = n));
    } catch (error) {
        console.log("REACH update error: ", error)
    }

})
onDestroy(() => {return [nftCardList,reachStdlib]})

</script>
<RIGHTBLOCK {hasActiveNft} {nftWalletName} {isOwner} 
{id }{awsUserId }{nftImage }{nftPrice }{nftAssetOwner }{nftContractAddress }{nftLikes }{nftId}{style}{nftPrevAssetOwner }{nftAuctionDuration }{awsName }{nftDescription }{awsUserPicture}></RIGHTBLOCK>
<CENTRALBLOCK {cards} {hasActiveNft}></CENTRALBLOCK>

