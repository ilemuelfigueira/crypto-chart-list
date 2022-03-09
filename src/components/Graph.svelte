<script lang="ts">
	import { Chart } from 'chart.js';
	import { onMount } from 'svelte';

	export let chartValues = [191744.4420445337, 191503.87712139543, 191492.3220022162];
	let chartLabels = ['07/03 17:30', '07/03 17:34', '07/03 17:39'];
	let ctx: any;
	let chartCanvas: HTMLCanvasElement;

	export let label = 'Crypto';

	onMount(async () => {
		ctx = chartCanvas.getContext('2d');

		const gradientFill = ctx?.createLinearGradient(0, 0, 0, 500);
		gradientFill?.addColorStop(0, 'rgb(110,50,166)');
		gradientFill?.addColorStop(0.5, 'rgb(110,50,166, 0.6)');
		gradientFill?.addColorStop(1, 'rgb(110,50,166, 0.2)');

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: label,
						backgroundColor: gradientFill,
						borderColor: '#8a2be2',
						data: chartValues,
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
