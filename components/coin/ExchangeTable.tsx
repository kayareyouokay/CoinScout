import { DataTable } from "@/components/DataTable";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import Link from "next/link";

export function ExchangeTable({ tickers }: { tickers: Ticker[] }) {
  const columns: DataTableColumn<Ticker>[] = [
    {
      header: 'Exchange',
      cellClassName: 'exchange-name',
      cell: (ticker) => (
        <>
          {ticker.trade_url && <Link href={ticker.trade_url} target="_blank" rel="noreferrer" aria-label={`Open ${ticker.market.name}`} />}
          {ticker.market.name}
        </>
      ),
    },
    {
      header: 'Pair',
      cellClassName: 'pair',
      cell: (ticker) => (
        <>
          <p>{ticker.base}</p>/<p>{ticker.target}</p>
        </>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (ticker) => formatCurrency(ticker.converted_last.usd),
    },
    {
      header: 'Updated',
      cellClassName: 'time-cell',
      cell: (ticker) => formatDateTime(ticker.timestamp),
    },
  ];

  return (
    <div className="exchange-table">
      <DataTable
        columns={columns}
        data={tickers.filter((ticker) => ticker.converted_last?.usd).slice(0, 10)}
        rowKey={(ticker, index) => `${ticker.market.name}-${ticker.base}-${ticker.target}-${index}`}
      />
    </div>
  );
}
