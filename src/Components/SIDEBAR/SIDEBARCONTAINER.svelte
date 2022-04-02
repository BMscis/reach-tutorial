<script>
import { onMount } from "svelte";

import ContanctBar from "./ContanctBar.svelte";
import MenuBarContainer from "./MenuBarContainer.svelte";
import {sideBarContainer} from "../../Stores/dimensions";
import { userName, walletAccount, walletName } from "../../AUTH/AuthStore";

let sidebarBlockWidth
let sidebarBlockHeight
let sidebarBlockTop
let sidebarWidth
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
        sideBarContainer.subscribe((value) => {
        sidebarBlockWidth = value.sidebarBlock.width
        sidebarBlockHeight = value.sidebarBlock.height
        sidebarBlockTop = value.sidebarBlock.top
        sidebarWidth = value.sidebar.width
        sidebarHeight = value.sidebar.height
        contactBarWidth = value.contactBar.width
        contactBarHeight = value.contactBar.height
        menuBarContainerWidth = value.menuBarContainer.width
        menuBarContainerHeight = value.menuBarContainer.height
    }),
    userName.subscribe((value) => {
            username = value
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
<div id = "sidebarBlock" style="width:{sidebarBlockWidth}px;height:{sidebarBlockHeight}px;top:{sidebarBlockTop}px">
    <div id="sidebar" style="width:{sidebarWidth}px ;height:{sidebarHeight}px ;">
        <ContanctBar {username} {walletAddress} {walletname} {contactBarWidth} {contactBarHeight}/>
        <MenuBarContainer {username} {menuBarContainerWidth} {menuBarContainerHeight} ></MenuBarContainer>
    </div>
</div>
<style>
#sidebarBlock{
        position: fixed;
        left: 0;
        background: #00000036;
        transform: translate(-100%,0);
        z-index: 111;
}
#sidebar{
    background: white;
    border-radius: 0 24px 24px 0;
}
</style>
