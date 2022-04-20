<script>
import { onDestroy, onMount } from "svelte";
import ContactBar from "./ContactBar.svelte";
import {sideBar} from "../../Stores/allDimension";
import MenuBarContainer from "./MenuBarContainer.svelte";
import { balance, userName, walletAddress, walletName } from "../../Wallet/WalletStore";
import { setEditProfile } from "./sideBarStore";

export let isVisible = true
let bal
let editProfile
let username = ""
let menuBarHeight
let sidebarHeight
let walletAddr= ""
let walletname = ""
let contactBarHeight
let innerSideBarWidth
let innerPadding = 40
let innerSideBarWidth1
let sidebarWidth = 300
const unsubscribe = sideBar.subscribe((value) => {
            sidebarHeight = value.height
            sidebarWidth = (sidebarHeight * 0.55).toFixed(2)
            innerSideBarWidth1 = (sidebarWidth * 0.86).toFixed(2)
            innerSideBarWidth = ((sidebarWidth * 0.86).toFixed(2)- innerPadding)
            contactBarHeight = (sidebarHeight * 0.3).toFixed(2)
            menuBarHeight = (sidebarHeight * 0.7).toFixed(2)
        })
const unsubscribeProf = setEditProfile.subscribe(value => {
    editProfile = value.edit
    return
})
onMount(() => {
    return [
        userName.subscribe((value) => {
            username = value.name
        }),
        walletAddress.subscribe((value) => {
            walletAddr = value
        }),
        walletName.subscribe((value) => {
            walletname = value
        }),
        balance.subscribe(value => {
            bal = value
        })
    ]
})
onDestroy(() => {
    return [unsubscribe, unsubscribeProf]
})
</script>
<div id = "sidebarBlock" 
style="width:100%;height:{sidebarHeight}px;transform: translate({isVisible? "-100%":"0"},0);position:{isVisible?"absolute":"relative"};">
    <div id="sidebar" style="width:{innerSideBarWidth1}px;height:{sidebarHeight}px;position:absolute;">
        <ContactBar {contactBarHeight} {bal} {editProfile} width={innerSideBarWidth} {username} {walletAddr} {walletname} />
        <MenuBarContainer {menuBarHeight} {editProfile} {username}  ></MenuBarContainer>
    </div>
</div>
<style>
#sidebarBlock{
    background: #00000036;
    z-index: 111;
    width: 300px;
}
#sidebar{
    background: white;
    border-radius: 0 8px 8px 0;
}
</style>
