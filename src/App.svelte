<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetup/MeetupGrid.svelte";
  import EditMeetup from "./Meetup/EditMeetup.svelte";
  import meetupStore from "./shared/meetupStore.js";

  let editMode = false;

  function addMeetup() {
    editMode = false;
  }

  function closeModal() {
    editMode = false;
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
  <MeetupGrid meetups={$meetupStore} />
</main>

<style>
  main {
    margin-top: 4rem;
  }

  .meetup-controls {
    margin-left: 1rem;
  }
</style>