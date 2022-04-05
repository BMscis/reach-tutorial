<script>
import NftCard from "./NftCard.svelte"
import { nftCardList } from "../../Stores/nftCard";
import { onMount } from "svelte";
import { getStore } from "../../STORAGE/storage";
import Loading from "../Loading.svelte";
let cards
export let nftListWidth
export let nftCardWidth
export let nftListHeight
export let nftCardHeight
export let nftContainerListWidth
export let nftContainerListHeight

onMount(() => {
    nftCardList.subscribe(value => {
        console.log("NFTLIST: ", value)
        if(value){
            cards = value
        }
    })
})

</script>
{#await getStore()}
    <Loading></Loading>
{:then result} 
    <div id="nft-list" style="width:{nftListWidth}px;height:{nftListHeight}px;">
        <ul style="height:{nftListHeight}px;width: {nftListWidth}px;padding:0;grid-auto-flow: row;grid-gap: 18px;overflow: auto;margin: auto;display:grid;justify-content: center;">
        {#each cards as card}
        <NftCard id={card.id} description={card.description} image={card.image} price={card.price} wallet={card.wallet} ownerName={card.ownerName} previousOwner={card.previousOwner}></NftCard>
        {/each}
        </ul>
        <button></button>
    </div>
{/await}
<style>
    #nft-list{
        display: flex;
        margin: auto;
        overflow-x: auto;
        overflow-y: hidden;
        background-color: transparent;
    }
</style>
