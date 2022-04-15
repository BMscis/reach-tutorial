<script>
    import { onMount } from "svelte";
    import NftCard from "./NftCard.svelte";
    import Loading from "../Loading.svelte";
    import { getImagesProtected, getStore } from "../../STORAGE/storage";
    import { nftCardList } from "../../Stores/nftCard";

    let cards
    let count = 0
    export let blockHeight

    onMount(() => {
        nftCardList.subscribe(value => {
            //console.log("LIST:", count += 1)
            //console.log("LIST:", value)
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
            userPicture={card.userPicture} id = {card.id} owner = {card.owner} description = {card.description} image = {card.image} price = {card.price} wallet = {card.wallet} prevOwner = {card.prevOwner} blockTime = {card.blockTime} nonce = {card.nonce} likes = {card.likes} ownerName = {card.ownerName} 
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
