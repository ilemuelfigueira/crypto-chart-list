<script lang="ts">
	import FaBrandsBitcoin from 'svelte-icons-pack/fa/FaBrandsBitcoin';
	import Icon from 'svelte-icons-pack/Icon.svelte';

	import BiMoon from 'svelte-icons-pack/bi/BiMoon';
	import BiSun from 'svelte-icons-pack/bi/BiSun';
	import { getContext, setContext } from 'svelte';
	const { context } = getContext('isDark');
	const { isDark, handleChangeTheme } = context;
</script>

<header>
	<div class="corner">
		<div class="left">
			<a href="/">
				<div>
					<Icon size="36" src={FaBrandsBitcoin} />
					<span>Bitcoin</span>
				</div>
			</a>
		</div>

		<div class="theme-switcher">
			<button cursor-pointer is-dark={$isDark || 'N'} on:click={() => handleChangeTheme()}>
				{#if $isDark === 'N'}
					<Icon className="icon" src={BiSun} />
				{:else}
					<Icon className="icon" src={BiMoon} />
				{/if}
			</button>
		</div>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-self: flex-start;

		background: var(--clr-light);

		padding: 1rem;

		width: 100%;
	}

	a,
	a:active,
	a:focus,
	a:visited {
		outline: 0;
		border: none;
		text-decoration: none;
	}

	.corner {
		display: flex;
		align-items: center;
		justify-content: space-between;

		width: 100%;
	}

	.corner a {
		& > div {
			display: flex;
			align-items: center;
			justify-content: center;

			gap: 0.4rem;

			min-width: 3em;
			height: 3em;

			& > span {
				font-size: 1.2em;
				font-weight: bold;

				text-transform: uppercase;
			}
		}
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		& > div {
			width: 100%;
		}
	}

	:global .icon {
		font-size: xx-large;

		&:active {
			transform: scale(0.9);
		}
	}

	[is-dark] {
		color: var(--clr-font);
		fill: var(--clr-font);
		stroke: var(--clr-font);
	}

	[is-dark='N'] {
		&:hover {
			color: var(--clr-primary);
			fill: var(--clr-primary);
			stroke: var(--clr-primary);
		}
	}

	[is-dark='S'] {
		&:hover {
			color: yellow;
			fill: yellow;
			stroke: yellow;
		}
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
