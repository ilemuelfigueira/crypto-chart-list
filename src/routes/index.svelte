<script lang="ts">
	import Autocomplete from '../components/Autocomplete.svelte';

	import { getContext, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import Table from '../components/Table.svelte';
	import { getCryptoData, getCryptoOptions } from '../services/crypto';
	import type { CryptoOptionsResponseCoins, CryptoResponse, CryptoTable } from '../types/crypto';
	import type { GenericOption } from 'src/types';
	import { goto } from '$app/navigation';

	const data = writable<CryptoTable[]>([]);
	const isLoading = writable<boolean>(false);

	const orderBy = writable<string>('Capitalização de Mercado');
	const ascOrDesc = writable<'asc' | 'desc'>('desc');

	const { context: contextCurrency } = getContext('currency');
	const { currency } = contextCurrency;

	const cryptoOptions = writable<GenericOption[]>([]);

	function searializeCryptoResponseToCryptoTable(value: CryptoResponse[]): CryptoTable[] {
		return value.map<CryptoTable>((item) => ({
			'1h': `${
				item.price_change_percentage_1h_in_currency
					? item.price_change_percentage_1h_in_currency.toPrecision(2)
					: 0
			}%`,
			'24h': `${
				item.price_change_percentage_24h_in_currency
					? item.price_change_percentage_24h_in_currency.toPrecision(2)
					: 0
			}%`,
			'7d': `${
				item.price_change_percentage_7d_in_currency
					? item.price_change_percentage_7d_in_currency.toPrecision(2)
					: 0
			}%`,
			'Capitalização de Mercado': item.market_cap,
			'Volume em 24h': item.market_cap_change_24h,
			id: item.id,
			img: item.image,
			value: item.current_price,
			symbol: item.symbol
		}));
	}

	function serializeOrderBy(orderBy: string, ascOrDesc: string) {
		switch (orderBy) {
			case 'Moeda':
				return 'id_' + ascOrDesc;
			case 'Capitalização de Mercado':
				return 'market_cap_' + ascOrDesc;
			case 'Volume em 24h':
				return 'volume_' + ascOrDesc;
			default:
				return 'market_cap_' + ascOrDesc;
		}
	}

	async function handleSearchData(search: string = '') {
		try {
			isLoading.set(true);
			const response = await getCryptoData(
				[search],
				serializeOrderBy($orderBy, $ascOrDesc),
				$currency
			);

			const serializedResponse = searializeCryptoResponseToCryptoTable(response);

			data.set(serializedResponse);
		} catch (error) {
			throw new Error(error.message);
		} finally {
			isLoading.set(false);
		}
	}

	function serializeCryptoOptions(response: CryptoOptionsResponseCoins[]) {
		return response.map<GenericOption>((item) => ({
			label: item.name,
			value: item.id,
			img: item.thumb
		}));
	}

	async function handleGetCryptoOptions(value: string = '') {
		const response = await getCryptoOptions(value);

		const serializedResponse = serializeCryptoOptions(response.coins);

		cryptoOptions.set(serializedResponse.slice(0, 25));
	}

	onMount(() => {
		handleSearchData('');
	});
</script>

<main>
	<div class="input">
		<Autocomplete
			on:search={(e) => handleGetCryptoOptions(e.detail.value)}
			on:select={(e) => goto(`/coin/?id=${e.detail.value}`)}
			options={$cryptoOptions}
		/>
	</div>
	{#if $data.length > 0}
		<Table {isLoading} {orderBy} {ascOrDesc} data={$data} on:sort={() => handleSearchData('')} />
	{:else}
		<span>Carregando..</span>
	{/if}
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;

		gap: 1rem;

		padding: 1rem;

		background: var(--clr-light);
	}

	.input {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		gap: 1rem;

		width: 100%;
	}
</style>
