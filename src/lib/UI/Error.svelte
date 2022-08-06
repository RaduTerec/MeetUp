<script lang="ts">
	import Modal from '$lib/Ui/Modal.svelte';

	export let message = '';
</script>

<Modal title="Error" on:cancel>
	<p>{message}</p>
</Modal>
