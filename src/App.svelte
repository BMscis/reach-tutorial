<script>
	import { onMount } from "svelte";
	import { Hub } from "aws-amplify";
	import SIGNUP from "./AUTH/SIGNUP.svelte";
	import { cyberuser } from "./AUTH/AuthStore";
	import {isMobile, SetWindowSize} from "./Stores/dimensions";
	import {checkDevice, checkUser} from "./Utilities/utilities";
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte";
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte";
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte";

	let noCurrentUser =  true
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})

	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	const resize = () => {windowSizeSetter()}
	windowSizeSetter()

	onMount(() => {
		return [
		Hub.listen("auth", (data) => {
			if (data.payload.event === "signIn") {
				//noCurrentUser = false
			}
			if (data.payload.event === "signOut") {
				cyberuser.set("")
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
					console.log("NO CURRENT USER")
				}
			 else {
				console.log("CURRENT USER",value.signInUserSession)
				noCurrentUser = false
			}
			} catch(e) {
				console.log("NO CURRENT USER")
				noCurrentUser = true
			}
		}),
	]
	})
</script>
<svelte:window on:resize={() => {resize()}}></svelte:window>
<TOPBARCONTAINER></TOPBARCONTAINER>
{#await checkUser()}
	<h1>Loading</h1>
{:then result}
<main >
{#if noCurrentUser}
	<SIGNUP></SIGNUP>
{:else if !noCurrentUser} 
	<div style="float: left;">
		<UPPERMIDBARCONTAINER></UPPERMIDBARCONTAINER>
		<BOTTOMCONTAINER></BOTTOMCONTAINER>
	</div>
	<div >
		<UPPERLEFTCONTAINER></UPPERLEFTCONTAINER>
	</div>
{/if}
</main>
{/await}

<style>
	main{
		display: block;
	}
	@media only screen and (max-width: 600px) {
  	main {
    		display: flex;
			flex-direction:column;
  		}
	}
</style>