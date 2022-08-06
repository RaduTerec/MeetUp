<script context="module">
	export async function load({ fetch }) {
		const url = `https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json`;
		const response = await fetch(url);
		const data = await response.json();

		const loadedMeetups = [];
		for (const key in data) {
			loadedMeetups.push({
				...data[key],
				id: key
			});
		}

		return {
			props: {
				loadedMeetups
			}
		};
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import MeetupItem from '$lib/Meetup/MeetupItem.svelte';
	import MeetupFilter from '$lib/Meetup/MeetupFilter.svelte';
	import Button from '$lib/Ui/Button.svelte';

	let favsOnly = false;
	const dispatch = createEventDispatcher();

	export let loadedMeetups: any[];

	$: filteredMeetups = favsOnly ? loadedMeetups.filter((m) => m.isFavorite) : loadedMeetups;

	function setFilter(event: { detail: string }) {
		favsOnly = event.detail === 'favs';
	}

	function createMeetup() {
		dispatch('add');
	}
</script>

<svelte:head>
	<title>Meet Us</title>
</svelte:head>

<section id="meetup-controls">
	<MeetupFilter on:select={setFilter} />
	<Button on:click={createMeetup}>New Meetup</Button>
</section>
{#if filteredMeetups.length === 0}
	<p id="no-meetups">No meetups found, you can start adding some.</p>
{/if}
<section id="meetups">
	{#each filteredMeetups as meetup (meetup.id)}
		<div transition:fade animate:flip={{ duration: 300 }}>
			<MeetupItem item={meetup} on:detail on:edit />
		</div>
	{/each}
</section>

<style>
	#meetups {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (min-width: 768px) {
		#meetups {
			grid-template-columns: repeat (2, 1fr);
		}
	}

	#meetup-controls {
		margin: 1rem;
		display: flex;
		justify-content: space-between;
	}

	#no-meetups {
		margin: 1rem;
	}
</style>
