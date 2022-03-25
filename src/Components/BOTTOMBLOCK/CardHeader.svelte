<script>
    import Avatar from "../Avatar.svelte";
    import MenuLabel from "../MenuLabel.svelte";
    import CardButton from "./CardButton.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    export let isLarge = true;
    export let labelDark = false;
    export let labelMargin = "auto";
    export let position = "absolute";
    export let label
    export let price
    let cardWidth;
    export let cardHeight;

    isLarge
        ? [cardWidth = 406, cardHeight = 70]
        : cardWidth = 166
</script>

<div
    id="card-header"
    style="width:100%;display:grid;justify-content:center;grid-template-columns:.6fr 40% 1fr;height:{cardHeight}px;position:{position};border-radius:0 0 12px 12px;bottom:0;background-color:{isLarge ? 'white' : '#00000042'}"
>
    <Avatar {isLarge} />
    <div id="card-label-box" style="margin: auto;">
        <MenuLabel
            label={label}
            {isLarge}
            dark={labelDark}
            margin={labelMargin}
            fontSize=9
        />
        <MenuSubLabel
            label="${price}"
            {isLarge}
            dark={labelDark}
            margin={labelMargin}
            fontSize=9
        />
    </div>
    <CardButton {isLarge} {cardHeight} />
</div>
<style>
    #card-header{
        box-shadow: 0 2px 5px 1px rgba(64,60,67,.16);
    }
</style>