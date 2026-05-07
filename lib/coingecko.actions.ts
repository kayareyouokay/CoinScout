'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL ?? 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.COINGECKO_API_KEY;

export async function fetcher<T>(
  endPoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const endpoint = endPoint.replace(/^\/+/, '');
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (API_KEY) {
    headers['x-cg-demo-api-key'] = API_KEY;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
    throw new Error(`API ERROR: ${response.status}: ${errorBody.error || response.statusText}`);
  }

  return response.json();
}
 
