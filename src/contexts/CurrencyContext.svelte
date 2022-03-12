<script lang="ts">
	import type { GenericOption } from 'src/types';

	import { onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	import { formatBrl, formatUsd } from '../utils/currency';
	const currency: Writable<string> = writable<'BRL' | 'USD'>('BRL');

	setContext<{
		context: {
			currency: Writable<string>;
			currencyOptions: GenericOption[];
			formatCurrency: (value: number) => string;
			changeCurrency;
		};
	}>('currency', {
		context: {
			currency,
			currencyOptions: [
				{
					label: 'USD',
					value: 'USD'
				},
				{
					label: 'BRL',
					value: 'BRL'
				}
			],
			formatCurrency,
			changeCurrency
		}
	});

	function formatCurrency(value: number) {
		if ($currency === 'USD') {
			return formatUsd(value);
		}

		return formatBrl(value);
	}

	function changeCurrency(value: 'BRL' | 'USD') {
		currency.set(value);
		sessionStorage.setItem('currency', value);

		window.location.reload();
	}

	onMount(() => {
		const storagedCurrency = sessionStorage.getItem('currency');

		if (storagedCurrency) {
			if (storagedCurrency === 'BRL' || storagedCurrency === 'USD') {
				currency.set(storagedCurrency);
			}
		}
	});
</script>

<slot />
