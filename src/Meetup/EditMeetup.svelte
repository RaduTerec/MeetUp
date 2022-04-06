<script>
    import { createEventDispatcher } from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import {isEmpty, isValidEmail, isValidUrl} from "../shared/validation.js";

    let title = "";
    let titleValidity = false;
    let subtitle = "";
    let subtitleValidity = false;
    let address = "";
    let email = "";
    let emailValidity = false;
    let description = "";
    let imageUrl = "";
    let imageValidity = false;

    $: titleValidity = !isEmpty(title);
    $: subtitleValidity = !isEmpty(subtitle);
    $: emailValidity = isValidEmail(email);
    $: imageValidity = isValidUrl(imageUrl);

    const dispatch = createEventDispatcher();

    function addMeetup() {
        dispatch('addmeetup', {
            title: title,
            subtitle: subtitle,
            address: address,
            email: email,
            description: description,
            imageUrl: imageUrl,
        });
    }

    function cancel() {
      dispatch('close');
  }
</script>

<Modal title="Edit Meetup data" on:cancel>
    <form on:submit|preventDefault={addMeetup}>
        <TextInput
            id="title"
            label="Title"
            valid={titleValidity}
            validityMessage="Please enter a non-empty title"
            value={title}
            on:input={event => (title = event.target.value)} />
        <TextInput
            id="subtitle"
            label="Subtitle"
            valid={subtitleValidity}
            validityMessage="Please enter a non-empty subtitle"
            value={subtitle}
            on:input={event => (subtitle = event.target.value)} />
        <TextInput
            id="address"
            label="Address"
            value={address}
            on:input={event => (address = event.target.value)} />
        <TextInput
            id="imageUrl"
            label="Image URL"
            value={imageUrl}
            valid={imageValidity}
            validityMessage="Please enter a valid URL"
            on:input={event => (imageUrl = event.target.value)} />
        <TextInput
            id="email"
            label="E-Mail"
            valid={emailValidity}
            validityMessage="Please enter an email containing '@' and '.'"
            type="email"
            value={email}
            on:input={event => (email = event.target.value)} />
        <TextInput
            id="description"
            label="Description"
            controlType="textarea"
            rows=3
            value={description}
            on:input={event => (description = event.target.value)} />
    </form>
    <div slot="footer">
        <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
        <Button type="button" on:click={addMeetup}>Save</Button>
    </div>
</Modal>

  <style>
    form {
        width: 100%;
    }
  </style>