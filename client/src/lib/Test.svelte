<script lang="ts">
	import { bounceIn } from "svelte/easing";
	import { fly } from "svelte/transition";
	function handleMouseDown(event: MouseEvent) {
		console.log(event.screenX);
	}
</script>

<button
	on:mousedown={handleMouseDown}
	transition:fly={{ duration: 500, easing: bounceIn }}
>
	ALED
</button>
