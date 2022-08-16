<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ error, status }) => ({
		props: {
			title: `${status}: ${error?.message || ''}`,
			status,
			error
		}
	});
</script>

<script lang="ts">
	import { dev } from '$app/env';
	export let status: string;
	export let error: Error;
</script>

<svelte:head>
	<title>Error</title>
</svelte:head>

<h1>{status}</h1>

Custom error page

<p>{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

<style>
	h1,
	p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>
