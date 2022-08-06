<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Meetup } from '$lib/shared/meetup.type.js';
	import meetupStore from '$lib/stores/meetupStore.js';
	import Button from '$lib/Ui/Button.svelte';
	import Badge from '$lib/Ui/Badge.svelte';

	export let item: Meetup;

	const dispatch = createEventDispatcher();

	function toggleFavorite() {
		fetch(
			`https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup/${item.id}.json`,
			{
				method: 'PATCH',
				body: JSON.stringify({ isFavorite: !item.isFavorite }),
				headers: { 'Content-Type': 'application/json' }
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error('Could not toggle favorite. Try again!');
				}

				meetupStore.toggleFavorite(item.id);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function editMeetup() {
		dispatch('edit', item.id);
	}

	function showDetails() {
		dispatch('detail', item.id);
	}
</script>

<article>
	<header>
		<div class="header-title">
			{item.title}
			{#if item.isFavorite}
				<Badge>Favorite</Badge>
			{/if}
		</div>
		<div class="header-subtitle">{item.subtitle}</div>
		<p>{item.address}</p>
	</header>
	<div class="image">
		<img src={item.imageUrl} alt={item.title} />
	</div>
	<div class="content">
		<p>{item.description}</p>
	</div>
	<footer>
		<Button mode="outline" on:click={editMeetup}>Edit</Button>
		<Button mode="outline" color={item.isFavorite ? '' : 'success'} on:click={toggleFavorite}>
			{item.isFavorite ? 'Unfave' : 'Fave'}
		</Button>
		<Button on:click={showDetails}>Show Details</Button>
	</footer>
</article>

<style>
	article {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 5px;
		background: white;
		margin: 1rem;
	}

	header,
	.content,
	footer {
		padding: 1rem;
	}

	.image {
		width: 100%;
		height: 14rem;
	}

	.image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.header-title {
		font-size: 1.25rem;
		margin: 0.5rem 0;
		font-family: 'Roboto Slab', sans-serif;
	}

	.header-subtitle {
		font-size: 1rem;
		color: #808080;
		margin: 0.5rem 0;
	}

	header div {
		text-align: left;
	}

	p {
		font-size: 1.25rem;
		margin: 0;
	}

	div {
		text-align: right;
	}

	.content {
		height: 4rem;
	}
</style>
