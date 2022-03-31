<script>
	import { onMount } from "svelte";
	import { Auth, Hub } from "aws-amplify";
	import SIGNUP from "./AUTH/SIGNUP.svelte";
	import SIGNIN from "./AUTH/SIGNIN.svelte";
	import { cyberuser } from "./AUTH/AuthStore";
	import {isMobile, SetWindowSize} from "./Stores/dimensions";
	import {checkDevice, checkUser} from "./Utilities/utilities";
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte";
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte";
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte";

	let noCurrentUser
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})

	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	const resize = () => {windowSizeSetter()}
	windowSizeSetter()

	onMount(() => {
		Hub.listen('auth',(event) => {
			console.log("AUTH EVENT", event)
		})
		Hub.listen('storage',(event) => {
			console.log("STORE EVENT", event)
		})
	})
</script>
<svelte:window on:resize={() => {resize()}}></svelte:window>
<TOPBARCONTAINER></TOPBARCONTAINER>
{#await checkUser()}
	<h1>Loading</h1>
{:then result}
<main >
{#if result}
	<SIGNUP></SIGNUP>
	<SIGNIN></SIGNIN>	
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