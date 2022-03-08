<script lang="ts">
	import { page } from '$app/stores';

	import FaBrandsBitcoin from 'svelte-icons-pack/fa/FaBrandsBitcoin';
	import Icon from 'svelte-icons-pack/Icon.svelte';
</script>

<header>
	<div class="corner">
		<a href="/">
			<div>
				<Icon size="36" src={FaBrandsBitcoin} />
				<span>Bitcoin</span>
			</div>
		</a>
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;

		background: var(--clr-light);

		padding: 1rem;

		width: 100vw;
	}

	a,
	a:active,
	a:focus,
	a:visited {
		outline: 0;
		border: none;
		text-decoration: none;
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

	a:hover {
		color: var(--accent-color);
	}
</style>
