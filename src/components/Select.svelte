<script lang="ts">
	import type { GenericOption } from 'src/types';
	import { createEventDispatcher } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const open: Writable<boolean> = writable(false);

	export let placeholder: string = 'Selecione';
	export let value: Writable<string | number | null> = writable();
	export let options: GenericOption[] = [
		{
			label: 'USD',
			value: 'USD'
		},
		{
			label: 'BRL',
			value: 'BRL'
		}
	];

	const dispatch = createEventDispatcher();

	function select(value: string | number | null) {
		dispatch('select', {
			value
		});
	}
</script>

<main on:click={() => open.update((old) => !old)}>
	<span is-active={$open ? 'S' : 'N'} cursor-pointer class="placeholder"
		>{$value === '' ? placeholder : $value}</span
	>
	<div class="options" options-open={$open ? 'S' : 'N'}>
		{#each options.filter((item) => item.value !== $value) as option}
			<span
				cursor-pointer
				option-selected={$value === option.value ? 'S' : 'N'}
				class="option"
				on:click={(e) => select(option.value)}
				value={option.value}
			>
				{option.label}
			</span>
		{/each}
	</div>
</main>

<style lang="scss">
	span {
		font-size: var(--font-xs);
		font-family: var(--font-family);

		padding: 0 1rem;

		width: 100%;
	}

	main {
		display: inline-flex;

		position: relative;

		background: var(--clr-light);
		[is-active='S'] {
			background: var(--clr-primary);
		}
		box-shadow: var(--lm-shadow-active);

		z-index: 1;
	}

	.placeholder {
		position: relative;
	}

	.options {
		background: var(--clr-light);

		box-shadow: var(--lm-shadow-active);

		position: absolute;
		top: 2rem;
		left: 0;
		right: 0;

		width: 100%;
		overflow: hidden;

		display: flex;

		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.option {
		&:hover {
			backdrop-filter: brightness(0.9);
		}
	}

	[options-open='N'] {
		display: none;
	}

	[option-selected='S'] {
		background: var(--clr-primary);
	}
</style>
