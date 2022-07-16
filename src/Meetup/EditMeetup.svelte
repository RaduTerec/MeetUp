<script>
   import { createEventDispatcher } from "svelte";
   import meetupStore from "../shared/meetupStore.js";
   import { isEmpty, isValidEmail, isValidUrl } from "../shared/validation.js";
   import TextInput from "../UI/TextInput.svelte";
   import Button from "../UI/Button.svelte";
   import Modal from "../UI/Modal.svelte";

   let title = "";
   let subtitle = "";
   let address = "";
   let email = "";
   let description = "";
   let imageUrl = "";

   export let id = "";
   const dispatch = createEventDispatcher();

   $: titleValidity = !isEmpty(title);
   $: subtitleValidity = !isEmpty(subtitle);
   $: emailValidity = isValidEmail(email);
   $: imageValidity = isValidUrl(imageUrl);
   $: descriptionValidity = !isEmpty(description);
   $: formIsValid =
      titleValidity && subtitleValidity && emailValidity && imageValidity;

   if (id != "") {
      const unsubscribe = meetupStore.subscribe((items) => {
         const selectedMeetup = items.find((i) => i.id === id);
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
      const meetupData = {
         title: title,
         subtitle: subtitle,
         description: description,
         imageUrl: imageUrl,
         contactEmail: email,
         address: address,
      };

      if (id != "") {
         meetupStore.update(id, meetupData);
      } else {
         fetch(
            "https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json",
            {
               method: "POST",
               body: JSON.stringify({ ...meetupData, isFavorite: false }),
               headers: { "Content-Type": "application/json" },
            }
         )
            .then((response) => {
               if (!response.ok) {
                  throw new Error("Could not post data. Try again!");
               }

               return response.json();
            })
            .then((data) => {
               let addedMeetup = {
                  ...meetupData,
                  isFavorite: false,
                  id: data.name,
               };
               console.log(addedMeetup);
               meetupStore.create(addedMeetup);
            })
            .catch((error) => {
               console.log(error);
            });
         meetupStore.create(meetupData);
      }

      dispatch("save");
   }

   function remove() {
      meetupStore.remove(id);
      dispatch("save");
   }

   function cancel() {
      dispatch("cancel");
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
         on:input={(event) => (title = event.target.value)}
      />
      <TextInput
         id="subtitle"
         label="Subtitle"
         valid={subtitleValidity}
         validityMessage="Subtitle should not be empty"
         value={subtitle}
         on:input={(event) => (subtitle = event.target.value)}
      />
      <TextInput
         id="address"
         label="Address"
         value={address}
         on:input={(event) => (address = event.target.value)}
      />
      <TextInput
         id="imageUrl"
         label="Image URL"
         value={imageUrl}
         valid={imageValidity}
         validityMessage="Please enter a valid URL"
         on:input={(event) => (imageUrl = event.target.value)}
      />
      <TextInput
         id="email"
         label="E-Mail"
         valid={emailValidity}
         validityMessage="Please enter an email containing '@' and '.'"
         type="email"
         value={email}
         on:input={(event) => (email = event.target.value)}
      />
      <TextInput
         id="description"
         label="Description"
         valid={descriptionValidity}
         validityMessage="Description should not be empty"
         controlType="textarea"
         rows="3"
         bind:value={description}
      />
   </form>
   <div slot="footer">
      <Button mode="outline" on:click={cancel}>Cancel</Button>
      <Button on:click={submit} disabled={!formIsValid}>Save</Button>
      {#if id != ""}
         <Button on:click={remove}>Delete</Button>
      {/if}
   </div>
</Modal>

<style>
   form {
      width: 100%;
   }
</style>
