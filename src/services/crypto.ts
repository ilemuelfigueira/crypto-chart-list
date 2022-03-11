import type { AxiosRequestConfig } from 'axios';
import type { Crypto, CryptoChart, CryptoOptionsResponse, CryptoResponse } from 'src/types/crypto';
import { api } from './api';

export async function getCryptoData(
	id: string[] = ['bitcoin', 'ethereum', 'ripple'],
	orderBy = 'market_cap_desc'
): Promise<CryptoResponse[]> {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `/coins/markets?vs_currency=brl&ids=${id.join(
			','
		)}&order=${orderBy}&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d`
	};

	const { data } = await api.request<CryptoResponse[]>(options);

	return data;
}

export async function getCryptoCharts(
	currency: string,
	cryptoName: string,
	days: string
): Promise<CryptoChart> {
	const { data } = await api.get(
		`/coins/${cryptoName}/market_chart?vs_currency=${currency}&days=${days}`
	);

	return data;
}

export async function getCryptoById(id: string): Promise<Crypto> {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `/coins/${id}`
	};

	const { data } = await api.request<Crypto>(options);

	return data;
}
export async function getCryptoOptions(value: string): Promise<CryptoOptionsResponse> {
	const options: AxiosRequestConfig = {
		method: 'get',
		url: `/search?query=${value}`
	};

	const { data } = await api.request<CryptoOptionsResponse>(options);

	return data;
}
