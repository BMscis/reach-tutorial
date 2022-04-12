<script>
    import Avatar from "../Avatar.svelte";
    import MenuLabel from "../MenuLabel.svelte";
    import CardButton from "./CardButton.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    export let label
    export let price
    export let isLarge = true;
    export let labelDark = false;
    export let labelMargin = "auto";
    export let position = "absolute";

</script>

<div id="card-header" style="position:{position};background-color:{isLarge ? 'white' : '#00000042'}">
    <Avatar {isLarge}  />
    <div id="card-label-box" style="margin: auto;display:flex; flex-direction:{isLarge? "column":"row"}">
        <MenuLabel label={label} dark={labelDark} margin={labelMargin} fontSize=9/>
        {#if isLarge}
            <MenuSubLabel label="${price}" dark={labelDark} margin={labelMargin} fontSize=9/>
        {/if}
    </div>
    <CardButton {isLarge}  />
</div>
<style>
    #card-header{
        box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);
        width: 100%;
        display: grid;
        justify-content: space-around;
        grid-auto-flow: column;
        grid-template-columns: 30% 1fr 30%;
        height: 49.68px;
        position: relative;
        border-radius: 0px 0px 12px 12px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.26);
        align-items: center;
    }
    #card-label-box{
        max-width: 50%;
    }
</style>