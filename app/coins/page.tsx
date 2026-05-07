import { Pagination } from "@/components/Pagination";
import { CoinsTable } from "@/components/coins/CoinsTable";
import { fetcher } from "@/lib/coingecko.actions";

const PAGE_SIZE = 50;

export default async function CoinsPage({ searchParams }: NextPageProps) {
  const params = await searchParams;
  const pageParam = Array.isArray(params.page) ? params.page[0] : params.page;
  const currentPage = Math.max(1, Number(pageParam ?? 1) || 1);

  const coins = await fetcher<CoinMarketData[]>(
    '/coins/markets',
    {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: PAGE_SIZE,
      page: currentPage,
      sparkline: false,
      price_change_percentage: '24h',
    },
    60,
  );

  return (
    <main id="coins-page">
      <div className="content">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-purple-100">Market screener</p>
            <h4>All Coins</h4>
          </div>
          <p className="text-sm text-purple-100">Page {currentPage}</p>
        </div>

        <CoinsTable coins={coins} />
        <Pagination
          currentPage={currentPage}
          totalPages={20}
          hasMorePages={coins.length === PAGE_SIZE && currentPage < 20}
        />
      </div>
    </main>
  );
}
