<script>
    export let name
</script>
<button>
    <svg id="buttonText" xmlns="http://www.w3.org/2000/svg" width="67" height="22" viewBox="0 0 67 22">
        <rect id="button-box" width="67" height="22" fill="none"/>
        <text id="button" transform="translate(0 1)" fill="#fff" font-size="14" font-family="Poppins-Regular, Poppins" letter-spacing="0.089em"><tspan x="3.372" y="15">{name}</tspan></text>
      </svg>
</button>
<style>
    button{
        width:67px;
        height:22px;
    }
</style>