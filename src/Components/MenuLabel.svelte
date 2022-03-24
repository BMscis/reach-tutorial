<script>
export let label
export let isLarge = true
export let margin = "auto"
export let dark = false
let labelWidth
let labelHeight
isLarge? labelWidth=124 : labelWidth=70
</script>
<p style="width:{labelWidth}px;height:26px;color:white;text-align:center;margin:{margin};color:{dark?"black":"white"};">{label}</p>
<style>
    p{
        font-weight: 300;
    }
</style>