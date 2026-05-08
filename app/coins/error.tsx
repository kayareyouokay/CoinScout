'use client';

import { RotateCcw } from "lucide-react";
import Link from "next/link";

export default function CoinsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="main-container">
      <section className="rounded-lg bg-dark-500 p-8">
        <p className="text-sm text-purple-100">Market data unavailable</p>
        <h1 className="mt-2 text-3xl font-semibold">The screener could not refresh right now.</h1>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-sm bg-green-500 px-4 py-2 font-semibold text-dark-900"
          >
            <RotateCcw width={18} height={18} />
            Retry
          </button>
          <Link className="rounded-sm bg-dark-400 px-4 py-2 font-semibold" href="/">
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
