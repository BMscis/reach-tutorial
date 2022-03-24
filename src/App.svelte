<script>
	import {SetWindowSize} from "./Stores/dimensions"
	import TOPBARCONTAINER from "./Components/TOPBAR/TOPBARCONTAINER.svelte"
	import BOTTOMCONTAINER from "./Components/BOTTOMBLOCK/BOTTOMCONTAINER.svelte"
	import UPPERMIDBARCONTAINER from "./Components/UPPERRIGHT/UPPERRIGHTCONTAINER.svelte"
	const [windowSizeSubscriber, windowSizeSetter] = SetWindowSize()
	window.addEventListener("resize", e => {
		windowSizeSetter()
	})
	windowSizeSetter()
</script>

<main>
	<TOPBARCONTAINER></TOPBARCONTAINER>
	<UPPERMIDBARCONTAINER></UPPERMIDBARCONTAINER>
	<BOTTOMCONTAINER></BOTTOMCONTAINER>
</main>

<style>
</style>