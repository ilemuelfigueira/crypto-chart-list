import { Chart } from 'chart.js';

export function createChart(node: HTMLCanvasElement, options) {
	new Chart(node, options);
}
