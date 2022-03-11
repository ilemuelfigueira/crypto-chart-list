<script lang="ts">
	import type { GenericOption } from 'src/types';
	import { createEventDispatcher } from 'svelte';

	import { writable, type Writable } from 'svelte/store';

	let busca: Writable<string> = writable<string>('');
	export let options: GenericOption[] = [];

	const dispatch = createEventDispatcher();

	function search() {
		dispatch('search', {
			value: $busca
		});
	}

	function select(value: string) {
		dispatch('select', {
			value: value
		});
		clearInput();
	}

	function clearInput() {
		options = [];
		busca.set('');
		dispatch('clear');
	}

	$: if ($busca !== '') {
		search();
	}

	$: options, console.log('options', options);
</script>

<div class="auto-complete">
	<input bind:value={$busca} type="text" placeholder="Digite o nome de alguma moeda" />
	{#if $busca !== ''}
		<div class="items">
			{#if options.length > 0}
				{#each options as opt}
					<div class="item" on:click={() => select(`${opt.value}`)}>
						{#if opt.img}
							<img src={opt.img} alt="" />
						{/if}
						<span>{opt.label}</span>
					</div>
				{/each}
			{:else}
				<div class="item">
					<span>Nenhum resultado encontrado</span>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	.auto-complete {
		position: relative;

		width: 100%;
		height: 3.5rem;
	}

	.items {
		position: absolute;

		width: 100%;
		height: 8rem;

		overflow-y: auto;
		overflow-x: hidden;

		margin-top: 4rem;

		padding: 1rem;

		background: var(--clr-gray100);
		box-shadow: var(--lm-shadow-active);

		border-radius: var(--br);

		z-index: 1000;

		.item {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			cursor: pointer;

			gap: 0.4rem;
			padding: 0.2rem 1rem;

			border-radius: var(--br);
			& span {
				color: #000;
			}

			&:hover {
				backdrop-filter: brightness(0.8);
			}
		}
	}

	input {
		width: 100%;

		border: 1px solid #ccc;
		border-radius: 5px;

		outline: none;

		padding: 0.7rem;

		position: absolute;

		color: var(--clr-gray700);
		font-weight: 600;
		font-size: var(--font-lg);
	}

	input::placeholder {
		font-weight: 600;
		font-size: var(--font-lg);
	}
</style>
