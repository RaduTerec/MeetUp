<article>
  <header>
    <div class="header-title">TITLE</div>
    <div class="header-subtitle">SUBTITLE</div>
  </header>
  <div class="image">
    <img src="" alt="" />
  </div>
  <div class="content">
    <p />
  </div>
  <footer>
    <button>Show Details</button>
    <button>Favorite</button>
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
</style>
