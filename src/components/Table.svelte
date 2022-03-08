<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	import type { CryptoTable } from '../types/crypto';
	import { formatBrl } from '../utils/currency';

	import BiChevronUp from 'svelte-icons-pack/bi/BiChevronUp';
	import BiChevronDown from 'svelte-icons-pack/bi/BiChevronDown';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let orderBy: Writable<string> = writable<string>('Moeda');
	export let ascOrDesc: Writable<'asc' | 'desc'> = writable<'asc' | 'desc'>('asc');

	export let data: CryptoTable[] = [];

	const labels = [
		'',
		'Moeda',
		'',
		'Preço',
		'1h',
		'24h',
		'7d',
		'Volume em 24h',
		'Capitalização de Mercado'
	];

	function isPositive(value: string) {
		const aux = value.replace('%', '');

		if (aux) {
			return Number(aux) > 0;
		}

		return false;
	}

	function handleFormatCurrency(value: number) {
		return formatBrl(value);
	}

	function handleChangeOrderBy(order: string) {
		const validValues = ['Moeda', 'Volume em 24h', 'Capitalização de Mercado'];

		if (!validValues.some((item) => item === order)) return;

		const oldValue = {
			orderBy: $orderBy,
			ascOrDesc: $ascOrDesc
		};

		orderBy.set(order);
		if (order === oldValue.orderBy) {
			if ($ascOrDesc === 'asc') {
				ascOrDesc.set('desc');
				sort($orderBy, $ascOrDesc);
			} else {
				ascOrDesc.set('asc');
				sort($orderBy, $ascOrDesc);
			}

			return;
		}
		ascOrDesc.set('asc');
	}

	const dispatch = createEventDispatcher();
	function sort(orderBy: string, ascOrDesc: 'asc' | 'desc') {
		dispatch('sort', {
			orderBy,
			ascOrDesc
		});
	}
</script>

<body hide-scroll="S">
	<table cellspacing="0" cellpadding="0">
		<thead>
			<tr>
				{#each labels as label}
					<th>
						<div data-order={label} on:click={() => label !== '' && handleChangeOrderBy(label)}>
							<span>{label}</span>
							{#if $orderBy === label}
								{#if $ascOrDesc === 'asc'}
									<Icon className="icon" size="24" src={BiChevronDown} />
								{/if}
								{#if $ascOrDesc === 'desc'}
									<Icon className="icon" size="24" src={BiChevronUp} />
								{/if}
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as item}
				<tr>
					<td>
						<img src={item.img} alt="" />
					</td>
					<td>
						<div href="https://google.com" target="_blank">
							<span data-label="name">{item.id}</span>
						</div>
					</td>
					<td data-label="symbol">{item.symbol} </td>
					<td data-label="value">{handleFormatCurrency(item.value)}</td>
					<td data-label={'1h'} data-positive={isPositive(item['1h']) ? 'S' : 'N'}>{item['1h']}</td>
					<td data-label={'24h'} data-positive={isPositive(item['24h']) ? 'S' : 'N'}
						>{item['24h']}</td
					>
					<td data-label={'7d'} data-positive={isPositive(item['7d']) ? 'S' : 'N'}>{item['7d']}</td>
					<td data-label="Volume em 24h">{handleFormatCurrency(item['Volume em 24h'])}</td>
					<td data-label="Capitalização de Mercado"
						>{handleFormatCurrency(item['Capitalização de Mercado'])}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</body>

<style lang="scss">
	.icon {
		font-size: 2rem;
	}

	body {
		width: 100%;
		max-height: 60vh;

		height: auto;
	}

	body table {
		border-collapse: collapse;
		box-shadow: var(--lm-shadow-active);
		background: white;
		text-align: center;

		min-width: max-content;
		width: 100%;
		height: auto;

		border-radius: var(--br);

		position: relative;

		color: var(--clr-font);
		background: var(--clr-light);
	}

	body table thead {
		box-shadow: var(--lm-shadow-active);

		background: var(--clr-primary);

		height: 3rem;

		position: sticky;
		top: -0.01rem;
		left: 0;
		right: 0;
		z-index: 1;
	}

	body table tbody {
		margin-top: 2rem;
	}

	body table thead th {
		padding: 0.4rem 1rem;

		font-size: var(--font-sm);
		font-weight: 900;
		letter-spacing: 1px;

		text-transform: uppercase;
		text-align: center;

		width: calc(100% - 7rem);
	}

	body table thead th div {
		display: flex;
		align-items: center;
		justify-content: center;

		gap: 0.4rem;
	}

	body table td {
		padding: 0.4rem 1rem;
		font-size: var(--font-xs);
		font-weight: 500;
		letter-spacing: 0.1px;
		width: fit-content;
	}

	body table tbody tr td div {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	body table tbody tr td img {
		width: 1rem;
		height: 1rem;
		aspect-ratio: 4/3;
	}

	body table tbody tr:nth-child(even) {
		backdrop-filter: brightness(0.9);
	}

	body table tbody tr:hover {
		backdrop-filter: brightness(0.9);
	}

	[data-positive='S'] {
		color: green;
	}

	[data-positive='N'] {
		color: red;
	}

	[data-label='symbol'] {
		font-weight: 900;
		padding: 0.1rem 0.5rem;
		background: var(--clr-primary);

		margin-left: 0.5rem;

		border-radius: var(--br);
		text-transform: uppercase;
	}

	[data-label='name'] {
		text-transform: capitalize;
	}

	[data-order='Moeda'],
	[data-order='Volume em 24h'],
	[data-order='Capitalização de Mercado'] {
		cursor: pointer;
	}

	[data-order='Moeda']:hover,
	[data-order='Volume em 24h']:hover,
	[data-order='Capitalização de Mercado']:hover {
		filter: brightness(0.8);
	}
</style>
