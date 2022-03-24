<script>
    import Avatar from "../Avatar.svelte";
    import MenuLabel from "../MenuLabel.svelte";
    import CardButton from "./CardButton.svelte";
    import MenuSubLabel from "../MenuSubLabel.svelte";
    export let isLarge = true;
    export let labelDark = false;
    export let labelMargin = "auto";
    let cardWidth;
    let cardHeight;

    isLarge
        ? [(cardWidth = 406), (cardHeight = 70)]
        : [(cardWidth = 166), (cardHeight = 48)];
</script>

<div
    id="card-header"
    style="width:100%;display:grid;justify-content:center;grid-template-columns: 20% 60% 20%;height:{cardHeight}px;position:absolute;border-radius:0 0 24px 24px;bottom:0;background-color:{isLarge ? 'white' : '#00000042'}"
>
    <Avatar {isLarge} />
    <div id="card-label-box" style="margin: auto;">
        <MenuLabel
            label="Bmscis"
            {isLarge}
            dark={labelDark}
            margin={labelMargin}
        />
        <MenuSubLabel
            label="$1000"
            {isLarge}
            dark={labelDark}
            margin={labelMargin}
        />
    </div>
    <CardButton {isLarge} {cardHeight} />
</div>
