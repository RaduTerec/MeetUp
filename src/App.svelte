<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetup/MeetupGrid.svelte";
  import EditMeetup from "./Meetup/EditMeetup.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false,
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will simply swim some rounds!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false,
    }
  ];

  let editMode = false;

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };
   
    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    const idtoupdate = event.detail;
    const meetupToUpdate = {...meetups.find(m => m.id === idtoupdate)};
    meetupToUpdate.isFavorite = !meetupToUpdate.isFavorite;

    const meetupIndex = meetups.findIndex(m => m.id === idtoupdate);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = meetupToUpdate;
    meetups = updatedMeetups;
  }
</script>

<Header />

<main>
  <Button caption="New meetup" on:click="{() => (editMode = !editMode)}" />
  {#if editMode === true}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite="{toggleFavorite}" />
</main>

<style>
  main {
    margin-top: 4rem;
  }
</style>