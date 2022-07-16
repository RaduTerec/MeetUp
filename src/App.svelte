<script>
   import { onMount } from "svelte";
   import meetupStore from "./shared/meetupStore.js";
   import MeetupGrid from "./Meetup/MeetupGrid.svelte";
   import EditMeetup from "./Meetup/EditMeetup.svelte";
   import MeetupDetail from "./Meetup/MeetupDetail.svelte";
   import Header from "./UI/Header.svelte";

   let editMode = false;
   let isLoading = false;
   let editedId = "";
   let page = "main";
   let pageData = {};

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

            meetupStore.setMeetups(meetupsData);
         })
         .catch((err) => {
            isLoading = false;
            console.log(err);
         });
   });

   function exitEdit() {
      editMode = false;
      editedId = "";
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
   {#if page === "main"}
      {#if editMode === true}
         <EditMeetup id={editedId} on:save={exitEdit} on:cancel={exitEdit} />
      {/if}
      <MeetupGrid
         meetups={$meetupStore}
         on:detail={showMeetupDetail}
         on:edit={editMeetup}
         on:add={() => {
            editMode = true;
         }}
      />
   {:else if page === "detail"}
      <MeetupDetail id={pageData.id} on:close={closeSelectedMeetup} />
   {/if}
</main>

<style>
   main {
      margin-top: 4rem;
   }
</style>
