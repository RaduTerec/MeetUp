<script>
    import MeetupItem from "./MeetupItem.svelte";

    export let meetups;
</script>

<section id="meetups">
	{#each meetups as meetup}
		<MeetupItem
            id={meetup.id}
			title={meetup.title}
			subtitle={meetup.subtitle}
			description={meetup.description}
			imageUrl={meetup.imageUrl}
			address={meetup.address}
			contactEmail={meetup.contactEmail}
            isFavorite={meetup.isFavorite} />
	{/each}
</section>

<style>
    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (min-width: 768px) {
        section {
            grid-template-columns: repeat (2, 1fr);
        }
    }
</style>