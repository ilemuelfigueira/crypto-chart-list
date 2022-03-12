import { formatCurrency } from '@coingecko/cryptoformat';

export function formatUsd(value: number): string {
	return formatCurrency(value, 'USD', 'en', false);
}

export function formatBrl(value: number): string {
	return formatCurrency(value, 'BRL', 'pt-br', false);
}
