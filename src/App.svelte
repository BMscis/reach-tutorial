<script>
	import {checkDevice} from "./Utilities/utilities"
	import {isMobile, SetWindowSize} from "./Stores/dimensions"
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte"
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte"
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte"
	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	let mobile = checkDevice()
	isMobile.set({isMob:mobile})
	const resize = () => {
		windowSizeSetter()
	}
	windowSizeSetter()
</script>
<svelte:window on:resize={() => {resize()}}></svelte:window>
<TOPBARCONTAINER></TOPBARCONTAINER>
<main >
	<div style="float: left;">
		<UPPERMIDBARCONTAINER></UPPERMIDBARCONTAINER>
		<BOTTOMCONTAINER></BOTTOMCONTAINER>
	</div>
	<div >
		<UPPERLEFTCONTAINER></UPPERLEFTCONTAINER>
	</div>
</main>

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