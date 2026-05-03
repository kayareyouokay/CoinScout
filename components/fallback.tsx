import { DataTable } from "./DataTable";

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image bg-dark-400 animate-pulse"></div>
        <div className="info">
          <div className="header-line-sm bg-dark-400 animate-pulse rounded"></div>
          <div className="header-line-lg bg-dark-400 animate-pulse rounded"></div>
        </div>
      </div>
      <div className="chart">
        <div className="chart-skeleton bg-dark-400 animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  const skeletonRows = Array.from({ length: 7 }, (_, i) => ({ id: i }));

  const columns = [
    {
      header: 'Name',
      cellClassName: 'cell-name',
      cell: () => (
        <div className="name-link">
          <div className="name-image bg-dark-400 animate-pulse rounded-full"></div>
          <div className="name-line bg-dark-400 animate-pulse rounded"></div>
        </div>
      )
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="change-cell">
          <div className="change-line bg-dark-400 animate-pulse rounded"></div>
        </div>
      )
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => (
        <div className="price-line bg-dark-400 animate-pulse rounded"></div>
      )
    }
  ];

  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <div className="trending-coins-table">
        <DataTable
          columns={columns}
          data={skeletonRows}
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}