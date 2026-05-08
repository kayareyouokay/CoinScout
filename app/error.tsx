'use client';

import { RotateCcw } from "lucide-react";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="main-container">
      <section className="rounded-lg bg-dark-500 p-8">
        <p className="text-sm text-purple-100">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold">CoinScout could not load this view.</h1>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-green-500 px-4 py-2 font-semibold text-dark-900"
        >
          <RotateCcw width={18} height={18} />
          Try again
        </button>
      </section>
    </main>
  );
}
