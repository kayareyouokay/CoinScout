import Link from "next/link";

export default function CoinNotFound() {
  return (
    <main className="main-container">
      <section className="rounded-lg bg-dark-500 p-8">
        <p className="text-sm text-purple-100">Coin not found</p>
        <h1 className="mt-2 text-3xl font-semibold">We could not find that market.</h1>
        <Link className="mt-6 inline-flex rounded-sm bg-green-500 px-4 py-2 font-semibold text-dark-900" href="/coins">
          Back to all coins
        </Link>
      </section>
    </main>
  );
}
