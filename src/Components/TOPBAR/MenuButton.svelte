<script>
import { onMount } from "svelte";
import {openSidebar} from "../../Stores/movment";

let open = false
const sideBar = () => {
    const sideBar = document.querySelector('#sidebarBlock')
    open ? sideBar.classList.add('open') : sideBar.classList.remove('open')
}
onMount(() => {
    openSidebar.subscribe((value) => {
        value || value == false ? open = value : null
        value || value == false ? sideBar() : null
    })
})
</script>
<button id="menu-button" style="width:24px;height:24px;" on:click={() => {openSidebar.set(!open)}}>
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
      button:hover #_Color{
        fill:var(--spectacular-orange);
    }
</style>
  