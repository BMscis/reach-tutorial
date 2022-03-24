<script>
    import Avatar from "../Avatar.svelte";
    import MenuLabel from "../MenuLabel.svelte";
    import CardButton from "./CardButton.svelte"
    import MenuSubLabel from "../MenuSubLabel.svelte";
    export let isLarge = true;
    let cardWidth;
    let cardHeight;

    isLarge? [cardWidth = 406,cardHeight = 70] : [cardWidth = 166,cardHeight = 48]

</script>

<div id="card-header" style="
width:{cardWidth}px;
display:grid;
justify-content:center;
grid-template-columns: 20% 60% 20%;
height:{cardHeight}px;
position:relative;
background-color:{isLarge?"white":"transparent"}">
    <Avatar isLarge={isLarge} />
    <div id="card-label-box" style="width:{isLarge?cardWidth:70}px;height:{cardHeight}px">
        <MenuLabel label="Bmscis" isLarge={isLarge} />
        <MenuSubLabel label="$1000" isLarge={isLarge}/>
    </div>
    <CardButton {isLarge} {cardHeight}></CardButton>
</div>
