<script>
    import NftCard from "./NftCard.svelte";
    import Loading from "../Loading.svelte";
    import {getStore } from "../../STORAGE/storage";

    export let cards
    export let blockHeight

</script>
{#await getStore()}
    <Loading></Loading>
{:then result} 
    <div id="nft-list">
        <ul style="width:100%;padding:0 20px;grid-auto-flow: row;grid-gap: 18px;margin:auto auto auto 0;display:grid;justify-content: center;">
        {#each cards as card}
            <NftCard {blockHeight} clicked={card.active}
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
