import { CandlestickChart } from "@/components/CandlestickChart";
import { CoinDetails } from "@/components/coin/CoinDetails";
import { CoinHeader } from "@/components/coin/CoinHeader";
import { Converter } from "@/components/coin/Converter";
import { ExchangeTable } from "@/components/coin/ExchangeTable";
import { fetcher } from "@/lib/coingecko.actions";
import { notFound } from "next/navigation";

async function getCoinDetails(coinId: string) {
  return Promise.all([
    fetcher<CoinDetailsData>(
      `/coins/${coinId}`,
      {
        localization: false,
        tickers: true,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      60,
    ),
    fetcher<OHLCData[]>(
      `/coins/${coinId}/ohlc`,
      {
        vs_currency: 'usd',
        days: 1,
        precision: 'full',
      },
      60,
    ),
  ]);
}

export async function generateMetadata({ params }: NextPageProps) {
  const { coinId } = await params;

  return {
    title: `${coinId} | CoinScout`,
  };
}

export default async function CoinDetailsPage({ params }: NextPageProps) {
  const { coinId } = await params;
  let coin: CoinDetailsData;
  let coinOHLCData: OHLCData[];

  try {
    [coin, coinOHLCData] = await getCoinDetails(coinId);
  } catch (error) {
    console.error('Error fetching coin details:', error);
    notFound();
  }

  return (
    <main id="coin-details-page">
      <section className="primary">
        <CoinHeader coin={coin} />
        <CandlestickChart data={coinOHLCData} coinId={coinId} />

        <div className="exchange-section">
          <h4>Exchange Markets</h4>
          <ExchangeTable tickers={coin.tickers ?? []} />
        </div>
      </section>

      <aside className="secondary">
        <Converter
          symbol={coin.symbol}
          icon={coin.image.small}
          priceList={coin.market_data.current_price}
        />
        <CoinDetails coin={coin} />
      </aside>
    </main>
  );
}
