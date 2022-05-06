<script>
import { onMount } from "svelte";
import {openNFTBox, openSidebar} from "../../Stores/movment";
export let bPosition = "top";
export let open = false
let sideBar
let style
switch (bPosition) {
    case "top":
        style = "width:24px;height:24px;"
        sideBar = () => {
            let sBar = document.querySelector('#sidebarBlock')
            open ? sBar.classList.add('open') : sBar.classList.remove('open')
        }
        onMount(() => {
            openSidebar.subscribe((value) => {
                value || value == false ? open = value : null
                value || value == false ? sideBar() : null
            })
        })
        break;
    case "popup":
        style = "width:24px;height:24px;position:absolute;top:24px;right:24px;"
        break
}
const click = () => {
    switch (bPosition) {
        case "top":
            openSidebar.set(!open)
            break;
        case "popup":
            openNFTBox.set(false)
            break;
    }
}
</script>
<button id="menu-button" class="tr" style={style} on:click={() => {click()}}>
    {#if !open}
        <svg id="icon_navigation_menu_24px" data-name="icon/navigation/menu_24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect id="Boundary" width="24" height="24" fill="none"/>
            <path id="_Color" data-name=" ↳Color" d="M18,12H0V10H18v2Zm0-5H0V5H18V7Zm0-5H0V0H18V2Z" transform="translate(3 6)" fill="#fff"/>
        </svg>
    {:else}
        <svg id="icon_navigation_close_24px_" data-name="icon/navigation/close_24px " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect id="Boundary" width="24" height="24" fill="none"/>
            <path id="_Color" data-name=" ↳Color" d="M10,20A10,10,0,0,1,2.926,2.926,10,10,0,0,1,17.074,17.074,9.937,9.937,0,0,1,10,20Zm0-8.59h0L13.59,15,15,13.59,11.41,10,15,6.41,13.59,5,10,8.59,6.41,5,5,6.41,8.59,10,5,13.59,6.41,15,10,11.411Z" transform="translate(2 2)" fill="#fff"/>
        </svg>
    {/if}
</button>
<style>
    #menu-button{
        padding:0;
        margin:0;
    }
      button:hover #_Color{
        fill:var(--spectacular-orange-hover);
    }
</style>
  