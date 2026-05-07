import { DataTable } from "@/components/DataTable";
import { cn, formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CoinsTable({ coins }: { coins: CoinMarketData[] }) {
  const columns: DataTableColumn<CoinMarketData>[] = [
    {
      header: '#',
      cellClassName: 'rank-cell',
      cell: (coin) => (
        <>
          <Link href={`/coins/${coin.id}`} aria-label={`Open ${coin.name}`} />
          {coin.market_cap_rank}
        </>
      ),
    },
    {
      header: 'Token',
      cellClassName: 'token-cell',
      cell: (coin) => (
        <div className="token-info">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>{coin.name} <span className="text-purple-100 uppercase">{coin.symbol}</span></p>
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.current_price),
    },
    {
      header: '24h',
      cellClassName: 'change-cell',
      cell: (coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <span className={cn('change-value', isPositive ? 'text-green-500' : 'text-red-500')}>
            {isPositive ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
            {formatPercent(coin.price_change_percentage_24h)}
          </span>
        );
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: (coin) => formatCompactNumber(coin.market_cap),
    },
    {
      header: 'Volume',
      cellClassName: 'market-cap-cell',
      cell: (coin) => formatCompactNumber(coin.total_volume),
    },
  ];

  return (
    <DataTable
      data={coins}
      columns={columns}
      rowKey={(coin) => coin.id}
      tableClassName="coins-table"
    />
  );
}
