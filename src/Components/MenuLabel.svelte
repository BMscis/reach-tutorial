<script>
export let hasColor = "white"
export let hide = false
export let label
export let margin = "auto"
export let dark = false
export let fontSize = 12
export let isPrice = false
</script>
<p style="-webkit-text-security:{hide?'circle':'none'};margin:{margin};color:{dark?"black":hasColor};font-size:{fontSize}px;{hide?"circle":"none"};">
    <span>{label}</span>
{#if isPrice}
    <span>&bsim;</span><span>ALGO</span>
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