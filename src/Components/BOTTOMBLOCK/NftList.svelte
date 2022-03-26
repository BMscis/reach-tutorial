<script>
import NftCard from "./NftCard.svelte"
import img1 from "../../nftea-assets/assets/avatarts.png"
import img2 from "../../nftea-assets/assets/tcCycle.png"
import img3 from "../../nftea-assets/assets/tg.png"
import img4 from "../../nftea-assets/assets/tguifr.png"
import img5 from "../../nftea-assets/assets/coaWeb.png"
let cards = [
        {pic:img1,owner:"Aspel", label:"chain",price:2000,active:false},
        {pic:img2,owner:"Don",   label:"tavern man",price:1000,active:false},
        {pic:img3,owner:"Doc",   label:"ta gu",price:550 ,active:false},
        {pic:img4,owner:"Bono",  label:"gator",price:440 ,active:false},
        {pic:img5,owner:"Bmscis",label:"shield",price:1000,active:false},
]
export let nftListWidth
export let nftListHeight
export let nftContainerListWidth
export let nftContainerListHeight
export let nftCardWidth
export let nftCardHeight
</script>
<div id="nft-list" style="width:{nftListWidth}px;height:{nftListHeight}px;">
    <ul style="height:{nftContainerListHeight}px;width: {nftContainerListWidth}px;padding:0;grid-auto-flow: column;grid-gap: 18px;overflow: auto;margin: auto;display:grid;">
    {#each cards as card}
        <NftCard owner={card.owner} active={card.active} image={card.pic} price={card.price} label={card.label}  cardWidth={nftCardWidth} cardHeight={nftCardHeight}></NftCard>
    {/each}
    </ul>
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