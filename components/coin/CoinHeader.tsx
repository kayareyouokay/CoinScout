import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";

export function CoinHeader({ coin }: { coin: CoinDetailsData }) {
  const priceChange = coin.market_data.price_change_percentage_24h_in_currency.usd;
  const isPositive = priceChange >= 0;

  return (
    <section id="coin-header">
      <div className="info">
        <Image src={coin.image.large} alt={coin.name} width={77} height={77} />
        <div>
          <h3>{coin.name}</h3>
          <p className="text-purple-100 uppercase">{coin.symbol}</p>
        </div>
      </div>

      <div className="price-row">
        <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
        <span className={cn('badge', isPositive ? 'text-green-500' : 'text-red-500')}>
          {isPositive ? <TrendingUp width={18} height={18} /> : <TrendingDown width={18} height={18} />}
          {formatPercent(priceChange)}
        </span>
      </div>

      <ul className="stats">
        <li>
          <span className="label">Rank</span>
          <span className="value">#{coin.market_cap_rank}</span>
        </li>
        <li>
          <span className="label">Market Cap</span>
          <span className="value">{formatCurrency(coin.market_data.market_cap.usd)}</span>
        </li>
        <li>
          <span className="label">Volume</span>
          <span className="value">{formatCurrency(coin.market_data.total_volume.usd)}</span>
        </li>
      </ul>
    </section>
  );
}
