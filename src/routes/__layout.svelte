<script lang="ts">
	import '../app.scss';

	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import Header from '$lib/header/Header.svelte';

	const isDark = writable<string>('S');

	onMount(() => {
		const storagedIsDark = sessionStorage.getItem('isDark');

		if (storagedIsDark) {
			$isDark = storagedIsDark === 'S' ? 'S' : 'N';
		}
	});
</script>

<div id="app" dark-theme={$isDark}>
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			Visit <a href="https://github.com/LemuelFigueira">Lemuel Figueira</a> to see more projects
		</p>
	</footer>
</div>

<style>
	#app {
		min-height: 100vh;
		min-width: 100vw;

		background: var(--clr-light);
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;

		background: var(--clr-light);
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
