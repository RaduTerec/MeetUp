<script lang="ts">
	import Modal from '../UI/Modal.svelte';

	export let message = '';
</script>

<Modal title="Error" on:cancel>
	<p>{message}</p>
</Modal>
