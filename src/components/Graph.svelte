<script lang="ts">
	import { Chart } from 'chart.js';
	import { getContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let chartValues: Writable<number[]> = writable<number[]>([]);
	export let chartLabels: Writable<string[]> = writable<string[]>([]);
	export let label = 'Crypto';
	export let backgroundColor = '#D33A02';
	export let borderColor = '#D33a02aa';

	const { context } = getContext('currency');

	const { formatCurrency } = context;

	let ctx: any;
	let chartCanvas: HTMLCanvasElement;

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');

		const gradientFill = ctx?.createLinearGradient(0, 0, 0, 500);
		gradientFill?.addColorStop(0, `${backgroundColor}ff`);
		gradientFill?.addColorStop(0.5, `${backgroundColor}dd`);
		gradientFill?.addColorStop(1, `${backgroundColor}55`);

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: $chartLabels,
				datasets: [
					{
						label: label,
						backgroundColor: gradientFill,
						borderColor: `${borderColor}ff`,
						data: $chartValues,
						fill: true,
						tension: 0.1
					}
				]
			},
			options: {
				tooltip: {
					callbacks: {
						label: formatCurrency
					}
				},
				legend: {
					labels: {
						fontSize: 16
					}
				},
				scales: {
					yAxes: [
						{
							ticks: {
								callback: formatCurrency
								// fontSize: 18
								// stepSize: 1
								// beginAtZero: true
							}
						}
					],
					xAxes: [
						{
							ticks: {
								fontSize: 8
								// callback: () => ''
								// stepSize: 0.5
								// beginAtZero: true
							}
						}
					]
				},
				elements: {
					line: {
						tension: 0.1
					},
					point: {
						radius: 2
					}
				}
			}
		});
	});
</script>

<div class="canvas">
	<canvas bind:this={chartCanvas} id="myChart" height="600" />
</div>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;

		padding: 1rem;
	}
</style>
