<script>
   import { onMount } from "svelte";
   import meetupStore from "./shared/meetupStore.js";
   import MeetupGrid from "./Meetup/MeetupGrid.svelte";
   import EditMeetup from "./Meetup/EditMeetup.svelte";
   import MeetupDetail from "./Meetup/MeetupDetail.svelte";
   import Header from "./UI/Header.svelte";
   import LoadingSpinner from "./UI/LoadingSpinner.svelte";
   import Error from "./UI/Error.svelte";

   let editMode = false;
   let isLoading = false;
   let editedId = "";
   let page = "main";
   let pageData = {};
   let error;

   onMount(() => {
      isLoading = true;

      fetch(
         "https://meetupsvelte-default-rtdb.europe-west1.firebasedatabase.app/meetup.json"
      )
         .then((res) => {
            if (!res.ok) {
               throw new Error("Could not load data. Try again!");
            }
            return res.json();
         })
         .then((data) => {
            isLoading = false;

            let meetupsData = [];
            for (const key in data) {
               meetupsData.push({ id: key, ...data[key] });
            }

            meetupStore.setMeetups(meetupsData.reverse());
         })
         .catch((err) => {
            isLoading = false;
            error = err;
         });
   });

   function exitEdit() {
      editMode = false;
      editedId = "";
   }

   function clearError() {
      error = null;
   }

   function editMeetup(event) {
      editMode = true;
      editedId = event.detail;
   }

   function showMeetupDetail(event) {
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
   {#if error}
      <Error message={error.message} on:cancel={clearError} />
   {/if}
   {#if page === "main"}
      {#if editMode === true}
         <EditMeetup id={editedId} on:save={exitEdit} on:cancel={exitEdit} />
      {/if}
      {#if isLoading}
         <LoadingSpinner />
      {:else}
         <MeetupGrid
            meetups={$meetupStore}
            on:detail={showMeetupDetail}
            on:edit={editMeetup}
            on:add={() => {
               editMode = true;
            }}
         />
      {/if}
   {:else if page === "detail"}
      <MeetupDetail id={pageData.id} on:close={closeSelectedMeetup} />
   {/if}
</main>

<style>
   main {
      margin-top: 4rem;
   }
</style>
