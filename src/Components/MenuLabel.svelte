<script>
export let label
export let isLarge = true
let labelWidth
let labelHeight
isLarge? [labelWidth=124,labelHeight=70] : [labelWidth=70,labelHeight=24]
</script>
<p style="width:{labelWidth}px;height:{labelHeight}px;color:white;margin:0;text-align:center;">{label}</p>
<style>
    p{
        font-family: poppins;
        font-weight: 300;
        font-size: 12px;
    }
</style>