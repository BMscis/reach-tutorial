<script>
import Bid from "./Bid.svelte";
import MenuLabel from "./MenuLabel.svelte";
import IconContainer from "./IconContainer.svelte"

export let backgroundColor = "white"
export let val
export let menuBarHeight = 40
export let menuBarWidth = 124
</script>
<div id="menu-bar" style="width:{menuBarWidth}px;height:{menuBarHeight}px;background-color:{backgroundColor};display:flex;grid-gap:20px;">
<hr>
<IconContainer isLarge={false} isRound={true} innerComponent={Bid}></IconContainer>
<MenuLabel label="${val}" dark={true}></MenuLabel>
</div>
<style>
    #menu-bar{
        position: relative;
        grid-auto-flow:column;
        margin:auto;
    }
    hr{
        width: 65%;
        position: absolute;
        right: 0;
        top:0;
        border-color: rgba(0, 0, 0, 0.288);
        margin:0;
    }
</style>