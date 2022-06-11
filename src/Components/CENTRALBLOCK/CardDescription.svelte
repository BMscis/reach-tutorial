<script>
import CommentIcon from "../CommentIcon.svelte";

import HeartIcon from "../HeartIcon.svelte";
import MenuLabel from "../MenuLabel.svelte";


export let isLarge
export let nftPrice
export let nftAssetOwner
export let nftWalletName
export let nftDescription
export let nftPrevAssetOwner
</script>
{#if !isLarge}
<div id="card-helper">
<CommentIcon></CommentIcon>        
</div>
<div id="nftDescription-bar">
<MenuLabel hasColor={"var(--inactive-component)"} label={nftDescription.description} ></MenuLabel>
<MenuLabel hasColor={"var(--spectacular-orange);"} label={nftPrice} isPrice={true} chain={nftDescription.chain}></MenuLabel>
<div id="nft-wallet-name">
<MenuLabel hasColor={"var(--spectacular-orange);"} label={nftWalletName} ></MenuLabel>
</div>
</div>
{/if}
<style>
#nft-wallet-name{
    display:none;
}
div#nftDescription-bar {
    display: flex;
    display: flex;
    width: 80%;
    margin: auto auto 10px auto;
    flex-direction: column;
    overflow: auto;
    z-index: 2;
    grid-row-start: 3;
}
#card-helper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    position: absolute;
    left: 12px;
    top: 0;
    grid-row-start: 1;
}
</style>