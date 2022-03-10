<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	export let isLoading: Writable<boolean> = writable<boolean>(false);
</script>

<div id="loading" data-loading={$isLoading === true ? 'S' : 'N'} />

<style lang="scss">
	[data-loading='N'] {
		display: none;
	}

	#loading {
		position: relative;
		width: 100%;
	}

	#loading::after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 3px;
		animation: animate 1s infinite linear;
		z-index: 2;

		transform-origin: left;
		transform: scaleX(0);

		background: var(--input-hover);
	}

	@keyframes animate {
		0% {
			transform-origin: left;
			transform: scaleX(0) translateX(0);
		}
		45% {
			transform-origin: left;
			transform: scaleX(1) translateX(0);
		}

		50% {
			transform-origin: right;
			transform: scaleX(1) translateX(0);
		}
		100% {
			transform-origin: right;
			transform: scaleX(0) translateX(0);
		}
	}
</style>
