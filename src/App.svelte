<script>
	import { onMount } from "svelte";
	import { Hub } from "aws-amplify";
	import SIGNUP from "./AUTH/SIGNUP.svelte";
	import Loading from "./Components/Loading.svelte";
	import { cyberuser, userName } from "./AUTH/AuthStore";
	import {checkDevice, checkUser} from "./Utilities/utilities";
	import {isMobile, setMain, SetWindowSize} from "./Stores/dimensions";
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte";
	import SIDEBARCONTAINER from "./Components/SIDEBAR/SIDEBARCONTAINER.svelte";
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte";
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte";
	import bgImg from "./nftea-assets/assets/w22.png"
	let noCurrentUser =  true
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})
	let gridCenter
	let gridRight
	let gridLeft

	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	const resize = () => {windowSizeSetter()}
	windowSizeSetter()

	onMount(() => {
		document.body.setAttribute("style", "background-image: url("+bgImg+");background-repeat: no-repeat;background-size: cover;")
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
		setMain.subscribe(value => {
			gridLeft = value.left
			gridCenter = value.center
			gridRight = value.right
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
<main style="grid-template-columns: {gridLeft}px {gridCenter}px {gridRight}px;">
	{#if noCurrentUser}
	<SIGNUP></SIGNUP>
	{:else if !noCurrentUser}
	<SIDEBARCONTAINER></SIDEBARCONTAINER>
	<BOTTOMCONTAINER></BOTTOMCONTAINER>
	<UPPERLEFTCONTAINER></UPPERLEFTCONTAINER>
{/if}
</main>
{/await}

<style>
	main{
		display: grid;
		align-items: center;
    	justify-content: center;
		background-repeat: no-repeat;
		background-position: center;
		background-size:cover;
	}
</style>