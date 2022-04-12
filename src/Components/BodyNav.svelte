<script>
    import NavButton from "./NavButton.svelte"
    export let width
    export let name
    export let height = 40
    export let backgroundColor = "#4a90b9"
</script>
<div style="width: {width}px;height:{height}px;margin:0 auto;">
    <div id="body-nav-box" style="display:flex;width: {width}px;height:{height}px;margin:auto;border-radius:40px 40px 0 0;background-color:{backgroundColor};align-items: center;justify-content: center;">
        <NavButton {name}></NavButton>
</div>
</div>
        
  