<script>
   import { createEventDispatcher } from "svelte";
   import { fade } from "svelte/transition";
   import { flip } from "svelte/animate";
   import MeetupItem from "./MeetupItem.svelte";
   import MeetupFilter from "./MeetupFilter.svelte";
   import Button from "../ui/Button.svelte";

   let favsOnly = false;
   const dispatch = createEventDispatcher();

   export let meetups;

   $: filteredMeetups = favsOnly
      ? meetups.filter((m) => m.isFavorite)
      : meetups;

   function setFilter(event) {
      favsOnly = event.detail === "favs";
   }

   function createMeetup() {
      dispatch("add");
   }
</script>

<section id="meetup-controls">
   <MeetupFilter on:select={setFilter} />
   <Button on:click={createMeetup}>New Meetup</Button>
</section>
{#if filteredMeetups.length === 0}
   <p id="no-meetups">No meetups found, you can start adding some.</p>
{/if}
<section id="meetups">
   {#each filteredMeetups as meetup (meetup.id)}
      <div transition:fade animate:flip={{ duration: 300 }}>
         <MeetupItem
            id={meetup.id}
            title={meetup.title}
            subtitle={meetup.subtitle}
            description={meetup.description}
            imageUrl={meetup.imageUrl}
            address={meetup.address}
            contactEmail={meetup.contactEmail}
            isFavorite={meetup.isFavorite}
            on:detail
            on:edit
         />
      </div>
   {/each}
</section>

<style>
   #meetups {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
   }

   @media screen and (min-width: 768px) {
      #meetups {
         grid-template-columns: repeat (2, 1fr);
      }
   }

   #meetup-controls {
      margin: 1rem;
      display: flex;
      justify-content: space-between;
   }

   #no-meetups {
      margin: 1rem;
   }
</style>
