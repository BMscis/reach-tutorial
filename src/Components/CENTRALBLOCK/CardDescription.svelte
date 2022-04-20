<script>
import CommentIcon from "../CommentIcon.svelte";

import HeartIcon from "../HeartIcon.svelte";
import MenuLabel from "../MenuLabel.svelte";


export let isLarge
export let description
export let wallet
export let prevOwner
export let price
</script>
{#if !isLarge}
<div id="card-helper">
<HeartIcon></HeartIcon>
<CommentIcon></CommentIcon>        
</div>
<div id="description-bar">
<MenuLabel label={description}></MenuLabel>
<MenuLabel label={wallet}></MenuLabel>
<MenuLabel label={prevOwner}></MenuLabel>
<MenuLabel label={price}></MenuLabel>
</div>
{/if}
<style>
div#description-bar {
    display: flex;
    height: 40px;
}
#card-helper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    height: 30%;
    position: absolute;
    left: 12px;
    top: 12px;
}
</style>