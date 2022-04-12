<script>
import { onDestroy, onMount } from "svelte";
import ContanctBar from "./ContanctBar.svelte";
import {sideBar} from "../../Stores/allDimension";
import MenuBarContainer from "./MenuBarContainer.svelte";
import { userName, walletAccount, walletName } from "../../AUTH/AuthStore";

export let isVisible = true

let username = ""
let sidebarHeight
let walletname = ""
let walletAddress = ""
let sidebarWidth = 300
let innerSideBarWidth

const unsubscribe = sideBar.subscribe((value) => {
            sidebarHeight = value.height
            sidebarWidth = (sidebarHeight * 0.55).toFixed(2)
            innerSideBarWidth = (sidebarWidth * 0.86).toFixed(2)
        })
onMount(() => {
    return [
        userName.subscribe((value) => {
            username = value.name
        }),
        walletAccount.subscribe((value) => {
            walletAddress = value
        }),
        walletName.subscribe((value) => {
            walletname = value
        }),
    ]
})
onDestroy(() => {
    return unsubscribe
})
</script>
<div id = "sidebarBlock" 
style="width:{sidebarWidth}px;height:{sidebarHeight}px;transform: translate({isVisible? "-100%":"0"},0);position:{isVisible?"absolute":"relative"};">
    <div id="sidebar" style="width:{innerSideBarWidth}px ">
        <ContanctBar width={innerSideBarWidth} {username} {walletAddress} {walletname} />
        <MenuBarContainer {username}  ></MenuBarContainer>
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
