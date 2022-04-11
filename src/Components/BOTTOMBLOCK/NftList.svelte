<script>
import NftCard from "./NftCard.svelte"
import { nftCardList } from "../../Stores/nftCard";
import { onMount } from "svelte";
import { getStore } from "../../STORAGE/storage";
import Loading from "../Loading.svelte";
let cards
export let opacity = false
export let blockHeight

onMount(() => {
    nftCardList.subscribe(value => {
        //console.log("NFTLIST: ", value)
        if(value){
            cards = value
        }
    })
})

</script>
{#await getStore()}
    <Loading></Loading>
{:then result} 
    <div id="nft-list"style="height:{blockHeight}px;">
        <ul style="width:100%;height:{blockHeight}px;padding:0;grid-auto-flow: row;grid-gap: 18px;margin:auto auto auto 0;display:grid;justify-content: center;">
        {#each cards as card}
        <NftCard {blockHeight} opacity={false}
        id={card.id} description={card.description} image={card.image} price={card.price} wallet={card.wallet} ownerName={card.ownerName} previousOwner={card.previousOwner}
        ></NftCard>
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
        backdrop-filter: blur(10px);
    }
    ul{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
