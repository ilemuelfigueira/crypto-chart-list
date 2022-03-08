import api, { AxiosRequestConfig } from "axios";
import type { CryptoResponse } from "../types/crypto";

export async function getCryptoData(
  id: string[] = ["bitcoin", "ethereum", "ripple"],
  orderBy: string = "market_cap_desc"
): Promise<CryptoResponse[]> {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=${id.join(
      ","
    )}&order=${orderBy}&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d`,
  };

  const { data } = await api.request<CryptoResponse[]>(options);

  return data;
}
