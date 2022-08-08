<script context="module" lang="ts">
	import type { Meetup } from '$lib/shared/meetup.type';

	export async function load({ fetch }) {
		const url = `https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json`;
		const response = await fetch(url);
		const data = await response.json();

		const fetchedMeetups: Meetup[] = [];
		for (const key in data) {
			fetchedMeetups.push({
				...data[key],
				id: key
			});
		}

		return {
			props: {
				fetchedMeetups: fetchedMeetups
			}
		};
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import customMeetupStore from '$lib/stores/meetupStore';
	import MeetupItem from '$lib/Meetup/MeetupItem.svelte';
	import MeetupFilter from '$lib/Meetup/MeetupFilter.svelte';
	import Button from '$lib/Ui/Button.svelte';

	let favsOnly = false;
	let loadedMeetups: Meetup[];
	export let fetchedMeetups: Meetup[];

	customMeetupStore.setMeetups(fetchedMeetups);
	$: filteredMeetups = favsOnly ? loadedMeetups.filter((m) => m.isFavorite) : loadedMeetups;

   let unsubscribe = customMeetupStore.subscribe((items) => {
			loadedMeetups = items;
		});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	function setFilter(event: { detail: string }) {
		favsOnly = event.detail === 'favs';
	}
</script>

<svelte:head>
	<title>Meet Us</title>
</svelte:head>

<section id="meetup-controls">
	<MeetupFilter on:select={setFilter} />
	<Button on:click={() => console.log('new meetup')}>New Meetup</Button>
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
