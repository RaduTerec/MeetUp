<script>
  import meetupStore from "./shared/meetupStore.js";
  import MeetupGrid from "./Meetup/MeetupGrid.svelte";
  import EditMeetup from "./Meetup/EditMeetup.svelte";
  import MeetupDetail from "./Meetup/MeetupDetail.svelte";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";


  let editMode = false;
  let page = "main";
  let pageData = {};

  function addMeetup() {
    editMode = false;
  }

  function closeModal() {
    editMode = false;
  }

  function selectMeetup(event) {
    page = "detail";
    pageData.id = event.detail;
  }

  function closeSelectedMeetup() {
    page = "main";
    pageData = {};
  }
</script>

<Header />

<main>
  {#if page === "main"}
    <div class="meetup-controls">
      <Button on:click="{() => (editMode = !editMode)}">New meetup</Button>
    </div>  
    {#if editMode === true}
      <EditMeetup on:addmeetup={addMeetup} on:cancel={closeModal} />
    {/if}
    <MeetupGrid meetups={$meetupStore} on:detail={selectMeetup} />
  {:else if page === "detail"}
    <MeetupDetail id="{pageData.id}" on:close={closeSelectedMeetup} />
  {/if}
</main>

<style>
  main {
    margin-top: 4rem;
  }

  .meetup-controls {
    margin-left: 1rem;
  }
</style>