<script lang="ts">
	import Bonjour from "./lib/Bonjour.svelte";
	import Test from "./lib/Test.svelte";
</script>

<main>
	<h1>ft-people</h1>
	<div class="card">
		<Bonjour />
	</div>
	<p>
		<Test />
	</p>
	<p class="read-the-docs">
		Click on the Vite and Svelte logos to learn more
	</p>
</main>

<style>
	.read-the-docs {
		color: #888;
	}
</style>
