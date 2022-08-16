<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import type { Meetup } from '$lib/shared/meetup.type';
	import customMeetupStore from '$lib/stores/meetupStore';
	import EditMeetup from '$lib/Meetup/EditMeetup.svelte';
	import MeetupItem from '$lib/Meetup/MeetupItem.svelte';
	import MeetupFilter from '$lib/Meetup/MeetupFilter.svelte';
	import Button from '$lib/Ui/Button.svelte';

	export let fetchedMeetups: Meetup[];

	let favsOnly = false;
	let loadedMeetups: Meetup[];
	let editMode = false;
	let editedId = '';

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

	function exitEdit() {
		editMode = false;
		editedId = '';
	}

	function editMeetup(event: { detail: string }) {
		editMode = true;
		editedId = event.detail;
	}

	function addMeetup() {
		editMode = true;
	}
</script>

<svelte:head>
	<title>Meet Us</title>
</svelte:head>

{#if editMode === true}
	<EditMeetup id={editedId} on:save={exitEdit} on:cancel={exitEdit} />
{/if}

<section id="meetup-controls">
	<MeetupFilter on:select={setFilter} />
	<Button on:click={addMeetup}>New Meetup</Button>
</section>
{#if filteredMeetups.length === 0}
	<p id="no-meetups">No meetups found, you can start adding some.</p>
{/if}
<section id="meetups">
	{#each filteredMeetups as meetup (meetup.id)}
		<div transition:fade animate:flip={{ duration: 300 }}>
			<MeetupItem item={meetup} on:detail on:edit={editMeetup} />
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
