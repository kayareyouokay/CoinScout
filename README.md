# CoinScout

CoinScout is a Next.js crypto market dashboard powered by CoinGecko. It includes a market overview, interactive candlestick charts, trending coins, category performance, full-market pagination, search, detail pages, exchange markets, and a quick currency converter.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

CoinScout defaults to the public CoinGecko API:

```bash
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
```

For higher rate limits, add a demo API key:

```bash
COINGECKO_API_KEY=your_demo_key
```

## Scripts

```bash
npm run lint
npm run build
```

## App Routes

- `/` market overview, Bitcoin chart, trending coins, and categories
- `/coins` paginated market screener
- `/coins/[coinId]` coin detail page with chart, markets, converter, and links
