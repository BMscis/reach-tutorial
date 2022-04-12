<script>
	import { onMount } from "svelte";
	import { Hub } from "aws-amplify";
	import SIGNUP from "./AUTH/SIGNUP.svelte";
	import {isMobile} from "./Stores/isMobile";
	import Loading from "./Components/Loading.svelte";
	import bgImg from "./nftea-assets/assets/w22.png";
	import { cyberuser, userName } from "./AUTH/AuthStore";
	import {checkDevice, checkUser} from "./Utilities/utilities";
	import RIGHTBLOCK from "./Components/RIGHTBLOCK/RIGHTBLOCK.svelte";
	import {mainGridTemplate,SetWindowSize} from "./Stores/allDimension";
	import FEATUREBLOCK from "./Components/FEATUREBLOCK/FEATUREBLOCK.svelte";
	import CENTRALBLOCK from "./Components/CENTRALBLOCK/CENTRALBLOCK.svelte";
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte";
	import SIDEBARCONTAINER from "./Components/SIDEBAR/SIDEBARCONTAINER.svelte";

	let gridStyle
	let hideSidebar = false
	let noCurrentUser =  true
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})

	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	windowSizeSetter()
	const resize = () => {windowSizeSetter()}

	onMount(() => {
		document.body.setAttribute("style", 
		`background-image: url("${bgImg}");\
		background-repeat: no-repeat;\
		background-size: cover;\
		background-repeat-y: repeat;`
		)
		return [
		Hub.listen("auth", (data) => {
			if (data.payload.event === "signIn") {
				//noCurrentUser = false
			}
			if (data.payload.event === "signOut") {
				cyberuser.set("")
				userName.set({name:""})
				noCurrentUser = true
			}
		}),
		Hub.listen('storage',(event) => {
			console.log("STORE EVENT", event)
		}),
		cyberuser.subscribe((value) => {
			//if value.signInUserSession is null, then no current user
			try {
				if(value.signInUserSession === null || value.signInUserSession === undefined) {
					noCurrentUser = true
					//console.log("NO CURRENT USER")
				}
			 else {
				//console.log("CURRENT USER",value.signInUserSession)
				userName.set({name:value.attributes.name})
				noCurrentUser = false
			}
			} catch(e) {
				//console.log("NO CURRENT USER")
				noCurrentUser = true
			}
		}),
		mainGridTemplate.subscribe(value => {
			gridStyle = value.style
			hideSidebar = !value.sideBarVisible
		})
		]
	})
</script>
<svelte:window on:resize={() => {resize()}}></svelte:window>
	<TOPBARCONTAINER></TOPBARCONTAINER>
{#await checkUser()}
	<Loading></Loading>
{:then result}
<main style={gridStyle}>
	{#if noCurrentUser}
	<SIGNUP></SIGNUP>
	{:else if !noCurrentUser}
	<SIDEBARCONTAINER isVisible={hideSidebar}></SIDEBARCONTAINER>
	<CENTRALBLOCK ></CENTRALBLOCK>
	<RIGHTBLOCK></RIGHTBLOCK>
{/if}
</main>
{/await}
<style>
	main{
		display: grid;
	}
</style>