<script>
    import NavButton from "./NavButton.svelte"
    export let width
    export let height = 40
    export let name
    export let backgroundColor = "#6418f2"
</script>
<div style="width: {width}px;height:{height}px;margin:0 auto;">
    <div id="body-nav-box" style="display:flex;width: {width}px;height:{height}px;margin:auto;border-radius:40px 40px 0 0;background-color:{backgroundColor};align-items: center;justify-content: center;">
        <NavButton {name}></NavButton>
</div>
</div>
        
  