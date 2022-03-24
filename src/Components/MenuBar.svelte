<script>
import Avatar from "./Avatar.svelte";
import IconContainer from "./IconContainer.svelte"
import MenuLabel from "./MenuLabel.svelte";
</script>
<div id="menu-bar" style="width:300px;height:40px;background-color:white;display:grid;grid-gap:20px;">
<IconContainer isLarge={true} isRound={true} innerComponent={Avatar}></IconContainer>
<MenuLabel label="$1000"></MenuLabel>
</div>