<script>
    export let label;
    export let isLarge = true
    export let margin = "auto"
    export let dark = false
    export let fontSize = 12
    let labelWidth;
    let labelHeight;
    isLarge? labelWidth=124 : labelWidth=70
</script>

<p style="color:white;text-align:center;margin:{margin};color:{dark?"black":"white"};font-size:{fontSize}px;">
    {label}
</p>
