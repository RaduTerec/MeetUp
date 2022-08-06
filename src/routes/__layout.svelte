<script lang="ts">
	import Header from '$lib/Ui/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Regular Company name, Bunzli Str 12, 8001 Zurich</p>
</footer>

<style>
	main {
		margin-top: 4rem;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
