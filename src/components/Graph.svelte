<script lang="ts">
	import { Chart } from 'chart.js';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	export let chartValues: Writable<number[]> = writable<number[]>([]);
	export let chartLabels: Writable<string[]> = writable<string[]>([]);
	export let label = 'Crypto';

	let ctx: any;
	let chartCanvas: HTMLCanvasElement;

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');

		const gradientFill = ctx?.createLinearGradient(0, 0, 0, 500);
		gradientFill?.addColorStop(0, 'rgb(110,50,166)');
		gradientFill?.addColorStop(0.5, 'rgb(110,50,166, 0.6)');
		gradientFill?.addColorStop(1, 'rgb(110,50,166, 0.2)');

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: $chartLabels,
				datasets: [
					{
						label: label.toUpperCase(),
						backgroundColor: gradientFill,
						borderColor: '#8a2be2',
						data: $chartValues,
						fill: true,
						tension: 0.1
					}
				]
			},
			options: {
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
