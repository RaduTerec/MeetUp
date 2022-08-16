<script context="module" lang="ts">
	/** @type {import('./__types').Load} */
	export async function load({ params, fetch }) {
		const meetupId = params.meetId;

      const url = `https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup/${meetupId}.json`;
      const response = await fetch(url);
      const selectedMeetup = await response.json() as Meetup;

      console.log("server");
      console.log(selectedMeetup);

		return {
			props: {
				selectedMeetup: selectedMeetup
			}
		};
	}
</script>

<script lang="ts">
	import Button from '$lib/Ui/Button.svelte';
	import type { Meetup } from '$lib/shared/meetup.type';

	export let selectedMeetup: Meetup;
</script>

<section>
	<div class="image">
		<img src={selectedMeetup.imageUrl} alt={selectedMeetup.title} />
	</div>
	<div class="content">
		<h1>{selectedMeetup.title}</h1>
		<h2>{selectedMeetup.subtitle}</h2>
		<p>{selectedMeetup.description}</p>
		<Button href="mailto:{selectedMeetup.contactEmail}">Contact</Button>
		<Button href="/" mode="outline">Close</Button>
	</div>
</section>

<style>
	section {
		margin-top: 4rem;
	}

	.image {
		width: 100%;
		height: 25rem;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image {
		background: #e7e7e7;
	}

	.content {
		text-align: center;
		width: 80%;
		margin: auto;
	}

	h1 {
		font-size: 2rem;
		font-family: 'Roboto Slab', sans-serif;
		margin: 0.5rem 0;
	}

	h2 {
		font-size: 1.25rem;
		color: #6b6b6b;
	}

	p {
		font-size: 1.5rem;
	}
</style>
