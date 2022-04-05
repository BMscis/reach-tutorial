<script>
    import { onDestroy } from "svelte";
    import NftList from "./NftList.svelte";
    import BodyNav from "../BodyNav.svelte";
    import {bottomContainer} from "../../Stores/dimensions"
    let isLarge = true
    let bottomBlockWidth
    let bottomBlockHeight
    let bodyNavWidth
    let bodyNavHeight
    let nftListWidth
    let nftListHeight
    let nftContainerListWidth
    let nftContainerListHeight
    let nftCardWidth
    let nftCardHeight
    const unsubscribe = bottomContainer.subscribe((value) => {
            bottomBlockWidth = value.bottomBlock.width
            bottomBlockHeight = value.bottomBlock.height
            bodyNavWidth = value.bodyNav.width
            bodyNavHeight = value.bodyNav.height
            nftListWidth = value.nftList.width
            nftListHeight = value.nftList.height
            nftCardWidth = value.nftCard.width
            nftCardHeight = value.nftCard.height
            nftContainerListWidth = value.nftListContainer.width
            nftContainerListHeight = value.nftListContainer.height
        })
    onDestroy(() => unsubscribe)
</script>
<div id="bottom-block" style="width:{bottomBlockWidth}px;height:{bottomBlockHeight}px;">
    <!-- <BodyNav width={bottomBlockWidth} height={bodyNavHeight/2} name="Latest"></BodyNav> -->
    <NftList nftListWidth={bottomBlockWidth} nftListHeight={bottomBlockHeight} nftContainerListWidth={nftContainerListWidth} nftContainerListHeight={nftContainerListHeight} nftCardWidth={nftCardWidth} nftCardHeight={nftCardHeight}  ></NftList>
</div>
<style>
    #bottom-block{
        background-color: #0b213b;
        grid-column-start: 2;
    }
</style>