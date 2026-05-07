'use client';

import { cn, formatCurrency, formatPercent } from "@/lib/utils";
import { Search, TrendingDown, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchModal() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [coins, setCoins] = useState<SearchCoin[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setCoins([]);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data: { coins: SearchCoin[] } = await response.json();
        setCoins(data.coins);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error searching coins:', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const selectCoin = (coinId: string) => {
    setOpen(false);
    setQuery('');
    router.push(`/coins/${coinId}`);
  };

  return (
    <div id="search-modal">
      <button className="trigger" type="button" onClick={() => setOpen(true)}>
        <Search width={18} height={18} />
        Search
        <span className="kbd">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 px-4 pt-24" onMouseDown={() => setOpen(false)}>
          <div className="dialog rounded-lg border border-purple-600/30 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="cmd-input flex items-center gap-2 border-b border-purple-600/20 px-4 py-3">
              <Search width={18} height={18} className="text-purple-100" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search coins..."
                className="w-full bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close search">
                <X width={18} height={18} />
              </button>
            </div>

            <div className="list custom-scrollbar overflow-y-auto p-2">
              {!query && <p className="empty">Start typing a coin name or ticker.</p>}
              {query && loading && <p className="empty">Searching...</p>}
              {query && !loading && coins.length === 0 && <p className="empty">No coins found.</p>}
              {coins.map((coin) => {
                const change = coin.data?.price_change_percentage_24h ?? 0;
                const isPositive = change >= 0;

                return (
                  <button
                    key={coin.id}
                    type="button"
                    className="search-item w-full text-left"
                    onClick={() => selectCoin(coin.id)}
                  >
                    <div className="coin-info">
                      <Image src={coin.thumb || coin.large} alt={coin.name} width={36} height={36} />
                      <div>
                        <span>{coin.name}</span>
                        <span className="coin-symbol">{coin.symbol}</span>
                      </div>
                    </div>
                    <span className="coin-price">{coin.data?.price ? formatCurrency(coin.data.price) : 'N/A'}</span>
                    <span className={cn('coin-change', isPositive ? 'text-green-500' : 'text-red-500')}>
                      {isPositive ? <TrendingUp width={15} height={15} /> : <TrendingDown width={15} height={15} />}
                      {formatPercent(change)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
