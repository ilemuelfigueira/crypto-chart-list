<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	import Graph from '../components/Graph.svelte';
	import { formatBrl, formatUsd } from '../utils/currency';
	import type { CryptoChart, Crypto } from '../types/crypto';

	import { page } from '$app/stores';

	import { onMount, setContext } from 'svelte';
	import { getCryptoById, getCryptoCharts } from '../services/crypto';
	import { formatDate } from '../utils/date';

	import BiSolidDownArrow from 'svelte-icons-pack/bi/BiSolidDownArrow';
	import BiSolidUpArrow from 'svelte-icons-pack/bi/BiSolidUpArrow';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import { goto } from '$app/navigation';

	setContext('currency', {
		formatCurrency
	});

	export const id: Writable<string> = writable<string>();
	export const currency: Writable<string> = writable<'BRL' | 'USD'>('USD');
	export const days: Writable<string> = writable<string>('1D');

	const crypto = writable<Crypto>();
	const cryptoChartData = writable<CryptoChart>();

	const chartLabels = writable<string[]>([]);
	const chartValues = writable<number[]>([]);

	const daysOptions = writable<string[]>(['1D', '7D', '14D', '30D']);
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
		if (!$id) return goto('/');
		await handleLoadCryptoHeader();
		await handleLoadCryptoChart();

		serializeCryptoChart();
	}

	function formatCurrency(value: number) {
		if ($currency === 'USD') {
			return formatUsd(value);
		}

		return formatBrl(value);
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
				<div class="crypto-info">
					<img class="logo" src={$crypto.image.thumb} alt="" />
					<span class="name">{$crypto.name} </span>
					<span class="symbol">({$crypto.symbol.toUpperCase()})</span>
				</div>
				<div class="crypto-values">
					<span class="value">
						{formatCurrency($crypto.market_data.current_price[$currency.toLowerCase()])}
					</span>
					<div
						class="change"
						icon-positive={$crypto.market_data.market_cap_change_percentage_24h > 0 ? 'S' : 'N'}
					>
						{#if $crypto.market_data.market_cap_change_percentage_24h > 0}
							<Icon className="indicator-icon" src={BiSolidUpArrow} />
						{:else}
							<Icon className="indicator-icon" src={BiSolidDownArrow} />
						{/if}
						<span
							data-positive={$crypto.market_data.market_cap_change_percentage_24h > 0 ? 'S' : 'N'}
						>
							{$crypto.market_data.market_cap_change_percentage_24h
								.toPrecision(3)
								.replace('-', '')}%
						</span>
					</div>
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
							await handleLoadCoin();
							isLoading.set(false);
						}}>{day}</span
					>
				{/each}
			</div>
		</div>
		{#if $chartLabels.length > 0 && $chartValues.length > 0 && $isLoading === false}
			<Graph {chartLabels} {chartValues} label={'Preço de acordo com o período selecionado'} />
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

		max-width: 100%;
		overflow: hidden;

		@media (max-width: 600px) {
			flex-direction: column-reverse;

			.days {
				align-self: flex-end;
			}
		}
	}

	.crypto-values .change {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		text-align: center;

		gap: 0.2rem;
	}

	.crypto-values .change span {
		font-size: var(--font-xl);
		font-weight: 800;

		width: max-content;
		height: max-content;
	}

	.crypto-values .value {
		font-size: var(--font-3xl);
		font-weight: 800;

		width: max-content;
		height: max-content;

		@media (max-width: 600px) {
			font-size: var(--font-xl);
		}
	}

	.crypto-values {
		display: flex;
		align-items: center;

		gap: 0.4rem;

		padding: 0;
		margin: 0;

		width: max-content;
		height: auto;
	}

	.infos {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;

		gap: 0.3rem;

		width: max-content;
		height: max-content;
	}

	.crypto-info {
		display: flex;
		align-items: center;
		justify-content: flex-start;

		gap: 0.6rem;

		text-align: center;

		width: max-content;
		height: max-content;
	}

	.crypto-info .logo {
		width: 2rem;

		aspect-ratio: 1;
	}

	.crypto-info .name {
		font-size: var(--font-xl);
		font-weight: 600;
	}

	.rank {
		width: max-content;
		height: max-content;

		text-align: center;
		text-transform: uppercase;

		font-size: var(--font-base);
		font-weight: 700;

		padding: 0.2rem 0.4rem;
		background-color: var(--clr-gray700);

		border-radius: var(--br);

		color: var(--clr-gray100);
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
			color: var(--clr-gray100);
		}
	}

	[data-selected='S'] {
		filter: brightness(0.8);
	}

	[icon-positive='S'] {
		fill: green;
	}

	[icon-positive='N'] {
		fill: red;
	}
</style>
