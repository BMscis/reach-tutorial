<script>
    import NftCard from "./NftCard.svelte";
    import Loading from "./Loading.svelte";
    import {getStore } from "../STORAGE/storage";

    export let cards
    export let blockHeight

</script>
{#await getStore()}
    <Loading></Loading>
{:then result} 
    <div id="nft-list">
        <ul style="width:100%;padding:0 20px;grid-auto-flow: row;grid-gap: 18px;margin:auto auto auto 0;display:grid;justify-content: center;">
            {#if cards}
            {#each cards as card}
            <NftCard {blockHeight} clicked={card.active} nftWalletName={card.nftWalletName}
            awsUserPicture={card.awsUserPicture} id = {card.id} awsUserId = {card.awsUserId} nftDescription = {card.nftDescription} nftImage = {card.nftImage} nftPrice = {card.nftPrice} nftAssetOwner = {card.nftAssetOwner} nftPrevAssetOwner = {card.nftPrevAssetOwner} nftAuctionDuration = {card.nftAuctionDuration} nftContractAddress = {card.nftContractAddress} nftLikes = {card.nftLikes} nftId ={card.nftId} awsName = {card.awsName} 
            ></NftCard>
            {/each}
            {/if}
        </ul>
    </div>
{/await}
<style>
    #nft-list{
        display: flex;
        margin: auto;
        overflow-x: auto;
        overflow-y: hidden;
        background-color: transparent;
        height: 100%;
    }
    ul{
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
