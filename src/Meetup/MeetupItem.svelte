<script>
  import meetupStore from "../shared/meetupStore.js";
  import Button from "../Ui/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let contactEmail;
  export let isFavorite;
  
  function addToFavorite() {
    meetupStore.toggleFavorite(id);
  }
</script>

<article>
  <header>
    <div class="header-title">
      {title}
      {#if isFavorite}
        <Badge>Favorite</Badge>
      {/if}
    </div>
    <div class="header-subtitle">{subtitle}</div>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src="{imageUrl}" alt="{title}" />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button href="mailto:{contactEmail}">Contact</Button>
    <Button mode="outline" type="button"
      color="{isFavorite ? '' : 'success'}"
      on:click={addToFavorite}>
      {isFavorite ? 'Unfave' : 'Fave'}
    </Button>
    <Button type="button">Show Details</Button>
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-title {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  .header-title.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  .header-subtitle {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  header div {
    text-align: left;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
