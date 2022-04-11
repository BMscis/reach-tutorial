<script>
import { onMount } from "svelte";

import ContanctBar from "./ContanctBar.svelte";
import MenuBarContainer from "./MenuBarContainer.svelte";
import {sideBar} from "../../Stores/allDimension";
import { userName, walletAccount, walletName } from "../../AUTH/AuthStore";

export let isVisible = true
let sidebarBlockWidth
let sidebarBlockHeight
let sidebarBlockTop
let sidebarWidth = 300
let sidebarHeight
let contactBarWidth
let contactBarHeight
let menuBarContainerWidth
let menuBarContainerHeight
let username = ""
let walletAddress = ""
let walletname = ""
onMount(() => {
    return [
        sideBar.subscribe((value) => {
            sidebarHeight = value.height
            sidebarWidth = (sidebarHeight * 0.55).toFixed(2)

    }),
    userName.subscribe((value) => {
            username = value.name
            //console.log("USERNAME: ",value)
        }),
    walletAccount.subscribe((value) => {
            walletAddress = value
        }),
    walletName.subscribe((value) => {
            walletname = value
        }),
]
})
</script>
<div id = "sidebarBlock" 
style="width:{sidebarWidth}px;height:{sidebarHeight}px;transform: translate({isVisible? "-100%":"0"},0);position:{isVisible?"absolute":"relative"};">
    <div id="sidebar" style="width:{sidebarWidth}px ">
        <ContanctBar {username} {walletAddress} {walletname} />
        <MenuBarContainer {username}  ></MenuBarContainer>
    </div>
</div>
<style>
#sidebarBlock{
        background: #00000036;
        /* transform: translate(-100%,0); */
        z-index: 111;
        width: 300px;
}
#sidebar{
    background: white;
    border-radius: 0 8px 8px 0;
}
</style>
