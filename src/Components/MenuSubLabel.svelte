<script>
    export let label;
    export let dark = false
    export let hide = false
    export let fontSize = 12
    export let margin = "auto"
    export let width = "auto"
</script>
<p style="-webkit-text-security:{hide?'circle':'none'};margin:{margin};color:{dark?"black":"white"};font-size:{fontSize}px;width:{width}px"> {label}</p>
<style>
    p{
        letter-spacing: 0.009em;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: overlay;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
</style>