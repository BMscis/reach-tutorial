<script>
export let hide = false
export let label
export let margin = "auto"
export let dark = false
export let fontSize = 12
</script>
<p style="-webkit-text-security:{hide?'circle':'none'};margin:{margin};color:{dark?"black":"white"};font-size:{fontSize}px;{hide?"circle":"none"};"> {label}</p>
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