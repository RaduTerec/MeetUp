<script lang="ts">
	import Header from '$lib/Ui/Header.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		margin-top: 5rem;
	}
</style>
