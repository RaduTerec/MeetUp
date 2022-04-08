<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetup/MeetupGrid.svelte";
  import EditMeetup from "./Meetup/EditMeetup.svelte";
  import meetupStore from "./shared/meetupStore.js";

  let editMode = false;

  function addMeetup(event) {
    const meetupData = {
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address,
    };
   
    meetupStore.addMeetup(meetupData);
    editMode = false;
  }

  function closeModal() {
    editMode = false;
  }

  function toggleFavorite(event) {
    const idtoupdate = event.detail;
    meetupStore.toggleFavorite(idtoupdate);
  }
</script>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click="{() => (editMode = !editMode)}">New meetup</Button>
  </div>  
  {#if editMode === true}
    <EditMeetup on:addmeetup={addMeetup} on:cancel={closeModal} />
  {/if}
  <MeetupGrid meetups={$meetupStore} on:togglefavorite="{toggleFavorite}" />
</main>

<style>
  main {
    margin-top: 4rem;
  }

  .meetup-controls {
    margin-left: 1rem;
  }
</style>