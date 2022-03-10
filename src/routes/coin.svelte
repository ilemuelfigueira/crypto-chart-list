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
	export const days: Writable<number> = writable<number>(30);

	const crypto = writable<Crypto>();
	const cryptoChartData = writable<CryptoChart>();

	const chartLabels = writable<string[]>([]);
	const chartValues = writable<number[]>([]);

	function handleLoadUrlParams() {
		const query = $page.url.searchParams.get('id');

		const result = query || '';

		id.set(result);
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
		const response = await getCryptoCharts($currency, $id, $days);

		cryptoChartData.set(response);
	}

	onMount(async () => {
		const urlParamsPromise = handleLoadUrlParams();
		const cryptoHeaderPromise = handleLoadCryptoHeader();
		const cryptoChartPromise = handleLoadCryptoChart();

		await Promise.all([urlParamsPromise, cryptoHeaderPromise, cryptoChartPromise]);

		serializeCryptoChart();
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
				<span>1d</span>
				<span>7d</span>
				<span>30d</span>
			</div>
		</div>
		{#if $chartLabels.length > 0 && $chartValues.length > 0}
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
</style>
