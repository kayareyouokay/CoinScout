import { PERIOD_CONFIG } from "@/constants";
import { fetcher } from "@/lib/coingecko.actions";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ coinId: string }> },
) {
  const { coinId } = await params;
  const period = request.nextUrl.searchParams.get('period') as Period | null;
  const config = PERIOD_CONFIG[period ?? 'daily'] ?? PERIOD_CONFIG.daily;

  try {
    const data = await fetcher<OHLCData[]>(
      `/coins/${coinId}/ohlc`,
      {
        vs_currency: 'usd',
        days: config.days,
        precision: 'full',
      },
      60,
    );

    return Response.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return Response.json([], { status: 502 });
  }
}
