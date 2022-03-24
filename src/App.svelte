<script>
	import {SetWindowSize} from "./Stores/dimensions"
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte"
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte"
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte"
	import UPPERLEFTCONTAINER from "./Components/UPPERLEFT/UPPERLEFTCONTAINER.svelte";
	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	window.addEventListener("resize", e => {
		windowSizeSetter()
	})
	windowSizeSetter()
</script>

<TOPBARCONTAINER></TOPBARCONTAINER>
<main>
	<div style="float: left;">
		<UPPERMIDBARCONTAINER></UPPERMIDBARCONTAINER>
		<BOTTOMCONTAINER></BOTTOMCONTAINER>
	</div>
	<div style="float:right">
		<UPPERLEFTCONTAINER></UPPERLEFTCONTAINER>
	</div>
</main>

<style>
</style>