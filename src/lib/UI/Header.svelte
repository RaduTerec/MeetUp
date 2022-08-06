<header>
	<nav>
		<ul>
			<li><a sveltekit:prefetch href="/">Meet Us</a></li>
			<li><a sveltekit:prefetch href="/about">About</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 4rem;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
		background: #cf0056;
	}

	nav {
		display: flex;
		height: 100%;
		justify-content: center;
	}

	ul {
		display: flex;
		list-style: none;
		padding: unset;
	}

	li {
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: white;
		font-weight: 700;
		font-size: 1.4rem;
		text-decoration: none;
	}
</style>
