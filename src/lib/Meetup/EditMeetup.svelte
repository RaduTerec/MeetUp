<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Meetup } from '$lib/shared/meetup.type.js';
	import meetupStore from '$lib/stores/meetupStore.js';
	import { isEmpty, isValidEmail, isValidUrl } from '$lib/shared/validation.js';
	import TextInput from '$lib/Ui/TextInput.svelte';
	import Button from '$lib/Ui/Button.svelte';
	import Modal from '$lib/Ui/Modal.svelte';

	let title: string = '';
	let subtitle: string = '';
	let address: string = '';
	let email: string = '';
	let description: string = '';
	let imageUrl: string = '';

	export let id: string = '';
	const dispatch = createEventDispatcher();

	$: titleValidity = !isEmpty(title);
	$: subtitleValidity = !isEmpty(subtitle);
	$: emailValidity = isValidEmail(email);
	$: imageValidity = isValidUrl(imageUrl);
	$: descriptionValidity = !isEmpty(description);
	$: formIsValid = titleValidity && subtitleValidity && emailValidity && imageValidity;

	if (id != '') {
		const unsubscribe = meetupStore.subscribe((items) => {
			const selectedMeetup = items.find((i) => i.id === id) as Meetup;
			title = selectedMeetup.title;
			subtitle = selectedMeetup.subtitle;
			address = selectedMeetup.address;
			email = selectedMeetup.contactEmail;
			description = selectedMeetup.description;
			imageUrl = selectedMeetup.imageUrl;
		});

		unsubscribe();
	}

	function submit() {
		const meetupData = <Meetup>{
			title,
			subtitle,
			description,
			imageUrl,
			contactEmail: email,
			address
		};

		if (id != '') {
			fetch(
				`https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup/${id}.json`,
				{
					method: 'PATCH',
					body: JSON.stringify(meetupData),
					headers: { 'Content-Type': 'application/json' }
				}
			)
				.then((response) => {
					if (!response.ok) {
						throw new Error('Could not post data. Try again!');
					}

					meetupStore.update(id, meetupData);
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			fetch('https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json', {
				method: 'POST',
				body: JSON.stringify({ ...meetupData, isFavorite: false }),
				headers: { 'Content-Type': 'application/json' }
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Could not post data. Try again!');
					}

					return response.json();
				})
				.then((data) => {
					let addedMeetup = {
						...meetupData,
						isFavorite: false,
						id: data.name
					};
					meetupStore.create(addedMeetup);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		dispatch('save');
	}

	function remove() {
		fetch(`https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup/${id}.json`, {
			method: 'DELETE'
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Could not delete data. Try again!');
				}

				meetupStore.remove(id);
			})
			.catch((error) => {
				console.log(error);
			});
		dispatch('save');
	}

	function cancel() {
		dispatch('cancel');
	}

	function setTitle(event: Event) {
		title = ((event as CustomEvent).target as HTMLInputElement).value;
	}

	function setSubtitle(event: Event) {
		subtitle = ((event as CustomEvent).target as HTMLInputElement).value;
	}

	function setDescription(event: Event) {
		description = ((event as CustomEvent).target as HTMLInputElement).value;
	}

	function setEmail(event: Event) {
		email = ((event as CustomEvent).target as HTMLInputElement).value;
	}

	function setAddress(event: Event) {
		address = ((event as CustomEvent).target as HTMLInputElement).value;
	}

	function setImageUrl(event: Event) {
		imageUrl = ((event as CustomEvent).target as HTMLInputElement).value;
	}
</script>

<Modal title="Edit Meetup data" on:cancel>
	<form on:submit|preventDefault={submit}>
		<TextInput
			id="title"
			label="Title"
			valid={titleValidity}
			validityMessage="Title should not be empty"
			value={title}
			on:input={setTitle}
		/>
		<TextInput
			id="subtitle"
			label="Subtitle"
			valid={subtitleValidity}
			validityMessage="Subtitle should not be empty"
			value={subtitle}
			on:input={setSubtitle}
		/>
		<TextInput
			id="address"
			label="Address"
			value={address}
			on:input={setAddress}
		/>
		<TextInput
			id="imageUrl"
			label="Image URL"
			value={imageUrl}
			valid={imageValidity}
			validityMessage="Please enter a valid URL"
			on:input={setImageUrl}
		/>
		<TextInput
			id="email"
			label="E-Mail"
			valid={emailValidity}
			validityMessage="Please enter an email containing '@' and '.'"
			type="email"
			value={email}
			on:input={setEmail}
		/>
		<TextInput
			id="description"
			label="Description"
			valid={descriptionValidity}
			validityMessage="Description should not be empty"
			controlType="textarea"
			rows=3
			bind:value={description}
		/>
	</form>
	<div slot="footer">
		<Button mode="outline" on:click={cancel}>Cancel</Button>
		<Button on:click={submit} disabled={!formIsValid}>Save</Button>
		{#if id != ''}
			<Button on:click={remove}>Delete</Button>
		{/if}
	</div>
</Modal>

<style>
	form {
		width: 100%;
	}
</style>
