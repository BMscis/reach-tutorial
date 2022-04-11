<script>
	import { onMount } from "svelte";
	import { Hub } from "aws-amplify";
	import SIGNUP from "./AUTH/SIGNUP.svelte";
	import Loading from "./Components/Loading.svelte";
	import { cyberuser, userName } from "./AUTH/AuthStore";
	import {mainGridTemplate,SetWindowSize} from "./Stores/allDimension"
	import {checkDevice, checkUser} from "./Utilities/utilities";
	import {isMobile, MainContainer} from "./Stores/dimensions";
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte";
	import SIDEBARCONTAINER from "./Components/SIDEBAR/SIDEBARCONTAINER.svelte";
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte";
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte";
	import bgImg from "./nftea-assets/assets/w22.png"
	let noCurrentUser =  true
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})
	let hideSidebar = false
	let gridDirection
	let gridCenter
	let gridRight
	let gridLeft
	let gridStyle
	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	const resize = () => {windowSizeSetter()}
	windowSizeSetter()

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
			//console.log("STORE EVENT", event)
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
		MainContainer.subscribe(value => {
			gridLeft = value.left
			gridCenter = value.center
			gridRight = value.right
			gridDirection = value.direction
		}),
		mainGridTemplate.subscribe(value => {
			gridStyle = value.style
			hideSidebar = !value.sideBarVisible
			console.log("GRID STYLE", gridStyle)
		})
	]
	})
	//console.log("NO CURRENT USER: ",noCurrentUser)
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
	<BOTTOMCONTAINER ></BOTTOMCONTAINER>
	<UPPERLEFTCONTAINER></UPPERLEFTCONTAINER>
{/if}
</main>
{/await}

<style>
	main{
		display: grid;
	}
</style>