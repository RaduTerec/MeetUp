<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from '$lib/Ui/Button.svelte';

	export let title: string;
	const dispatcher = createEventDispatcher();

	function closeModal() {
		dispatcher('cancel');
	}
</script>

<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div transition:fly={{ y: 300 }} class="modal">
	<div class="title">{title}</div>
	<div class="content">
		<slot />
	</div>
	<div class="footer">
		<slot name="footer">
			<Button on:click={closeModal}>Close</Button>
		</slot>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 10;
	}

	.modal {
		position: fixed;
		top: 10vh;
		left: 10%;
		width: 80%;
		max-height: 80vh;
		background: white;
		border-radius: 5px;
		z-index: 100;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		overflow: auto;
	}

	.title {
		padding: 1rem;
		margin: 0;
		border-bottom: 1px solid #ccc;
		font-family: 'Roboto Slab', sans-serif;
		font-size: 1.65rem;
		font-weight: bold;
	}

	.content {
		padding: 1rem;
	}

	.footer {
		padding: 1rem;
	}

	@media (min-width: 768px) {
		.modal {
			width: 40rem;
			left: calc(50% - 20rem);
		}
	}
</style>
