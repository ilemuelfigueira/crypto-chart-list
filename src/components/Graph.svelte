<script lang="ts">
	import { Chart } from 'chart.js';
	import { getContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let chartValues: Writable<number[]> = writable<number[]>([]);
	export let chartLabels: Writable<string[]> = writable<string[]>([]);
	export let label = 'Crypto';
	export let backgroundColor = '#D33A02';
	export let borderColor = '#D33A02';

	const { formatCurrency } = getContext('currency');

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
						label: label.toUpperCase(),
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
						fontColor: 'white',
						fontSize: 16
					}
				},
				scales: {
					yAxes: [
						{
							ticks: {
								fontColor: 'white',
								fontSize: 18,
								callback: formatCurrency
								// stepSize: 1
								// beginAtZero: true
							}
						}
					],
					xAxes: [
						{
							ticks: {
								fontColor: 'white',
								fontSize: 14

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

<canvas bind:this={chartCanvas} id="myChart" width="400" />

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;

		padding: 1rem;
	}
</style>
