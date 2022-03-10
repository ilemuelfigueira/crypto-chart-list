<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	import Graph from '../components/Graph.svelte';
	import { formatBrl } from '../utils/currency';
	import type { CryptoChart, Crypto } from '../types/crypto';

	import { page } from '$app/stores';

	import { onMount } from 'svelte';
	import { getCryptoById, getCryptoCharts } from '../services/crypto';
	import { formatDate } from '../utils/date';

	export const id: Writable<string> = writable<string>();
	export const currency: Writable<string> = writable<'BRL' | 'USD'>('BRL');
	export const days: Writable<string> = writable<string>('1d');

	const crypto = writable<Crypto>();
	const cryptoChartData = writable<CryptoChart>();

	const chartLabels = writable<string[]>([]);
	const chartValues = writable<number[]>([]);

	const daysOptions = writable<string[]>(['1d', '7d', '14d', '30d']);
	const isLoading = writable<boolean>(false);

	function handleLoadUrlParams() {
		const query = $page.url.searchParams.get('id');

		const result = query || '';

		id.set(result);
	}

	function formatDayString(value: string) {
		return value.replace('d', '');
	}

	function serializeCryptoChartLabels(value: CryptoChart) {
		if (!value) return;
		return value.prices.map((item) => formatDate(new Date(item[0])));
	}

	function serializeCryptoChartValues(value: CryptoChart) {
		if (!value) return;
		return value.prices.map((item) => item[1]);
	}

	function serializeCryptoChart() {
		const labels = serializeCryptoChartLabels($cryptoChartData);
		const values = serializeCryptoChartValues($cryptoChartData);

		chartLabels.set(labels);
		chartValues.set(values);
	}

	async function handleLoadCryptoHeader() {
		const response = await getCryptoById($id);

		crypto.set(response);
	}

	async function handleLoadCryptoChart() {
		const response = await getCryptoCharts($currency, $id, formatDayString($days));

		cryptoChartData.set(response);
	}

	async function handleLoadCoin() {
		await handleLoadCryptoHeader();
		await handleLoadCryptoChart();

		serializeCryptoChart();
	}

	onMount(async () => {
		const urlParamsPromise = handleLoadUrlParams();
		const coinPromise = handleLoadCoin();

		await Promise.all([urlParamsPromise, coinPromise]);
	});
</script>

<main>
	{#if Boolean($crypto)}
		<div class="header">
			<div class="infos">
				<div class="rank">RANK #{$crypto.coingecko_rank}</div>
				<div class="name">{$crypto.id} ({$crypto.symbol})</div>
				<div class="value">
					{formatBrl($crypto.market_data.current_price['brl'])}
					{$crypto.market_data.market_cap_change_24h.toPrecision(2)}%
				</div>
			</div>

			<div class="days">
				{#each $daysOptions as day}
					<span
						cursor-pointer
						data-selected={$days === day ? 'S' : 'N'}
						on:click={async () => {
							days.set(day);
							isLoading.set(true);
							await handleLoadCryptoChart();
							serializeCryptoChart();
							isLoading.set(false);
						}}>{day}</span
					>
				{/each}
			</div>
		</div>
		{#if $chartLabels.length > 0 && $chartValues.length > 0 && $isLoading === false}
			<Graph {chartLabels} {chartValues} />
		{/if}
	{/if}
</main>

<style lang="scss">
	main {
		padding: 1rem 2rem;
	}
	main .header {
		display: flex;
		justify-content: space-between;
	}

	.days {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		padding: 2px;
		height: max-content;

		gap: 2px;

		background-color: var(--clr-gray200);

		border-radius: var(--br);

		& > span:first-child {
			border-top-left-radius: var(--br);
			border-bottom-left-radius: var(--br);
		}

		& > span:last-child {
			border-top-right-radius: var(--br);
			border-bottom-right-radius: var(--br);
		}

		& > span {
			padding: 0.5rem;

			margin: 0;
			height: auto;
			background: var(--clr-primary);
		}
	}

	[data-selected='S'] {
		filter: brightness(1.2);
	}
</style>
