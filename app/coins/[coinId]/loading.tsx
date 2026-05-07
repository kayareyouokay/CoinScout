import { CoinOverviewFallback } from "@/components/fallback";

export default function LoadingCoinDetails() {
  return (
    <main id="coin-details-page">
      <section className="primary">
        <div className="h-34 rounded-lg bg-dark-500 animate-pulse" />
        <CoinOverviewFallback />
      </section>
      <aside className="secondary space-y-6">
        <div className="h-54 rounded-lg bg-dark-500 animate-pulse" />
        <div className="h-64 rounded-lg bg-dark-500 animate-pulse" />
      </aside>
    </main>
  );
}
