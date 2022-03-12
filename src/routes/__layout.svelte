<script lang="ts">
	export const ssr = false;

	import { writable, type Writable } from 'svelte/store';
	import { onMount, setContext } from 'svelte';

	import Header from '../components/Header.svelte';
	import { isMounting } from '../stores/mount';
	import CurrencyContext from '../contexts/CurrencyContext.svelte';

	const isDark = writable<string>('N');

	setContext<{
		context: {
			isDark: Writable<string>;
			handleChangeTheme: () => void;
		};
	}>('isDark', {
		context: {
			handleChangeTheme,
			isDark
		}
	});

	function handleChangeTheme() {
		isDark.update((old: string) => (old === 'S' ? 'N' : 'S'));

		sessionStorage.setItem('isDark', $isDark);
	}

	onMount(() => {
		const storagedIsDark = sessionStorage.getItem('isDark');

		if (storagedIsDark) {
			$isDark = storagedIsDark;
		}

		isMounting.set(false);
	});
</script>

<CurrencyContext>
	{#if $isMounting === false}
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
	{/if}
</CurrencyContext>

<style>
	@import '../app.module.scss';
	#app {
		min-height: 100vh;
		/* min-width: 100vw; */

		background: var(--clr-light);

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100vw;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;

		align-self: flex-end;

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
