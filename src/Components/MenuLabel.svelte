<script>
export let hasColor = "white"
export let hide = false
export let label
export let margin = "auto"
export let dark = false
export let fontSize = 12
export let isPrice = false
export let chain = "ALGO"
export let position = "relative"
export let top= 0
export let right = 0
</script>
<p style="
-webkit-text-security:{hide?'circle':'none'};
margin:{margin};
color:{dark?"black":hasColor};
font-size:{fontSize}px;
{hide?"circle":"none"};
position:{position};
top:{top}px;
right:{right}px;
">
    <span style="background: {hide?"#2453c2":"transparent"};padding: 5px;border-radius: 5px;">{label}</span>
{#if isPrice}
    <span>&bsim;</span><span>{chain}</span>
{/if}
</p>

<style>
    p{
        letter-spacing: 0.008em;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: overlay;    
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
</style>