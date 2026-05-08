import { fetcher } from "@/lib/coingecko.actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim();

  if (!query) {
    return Response.json({ coins: [] });
  }

  try {
    const data = await fetcher<{ coins: SearchCoin[] }>(
      '/search',
      { query },
      60,
    );

    return Response.json({ coins: data.coins.slice(0, 8) });
  } catch (error) {
    console.error('Error searching coins:', error);
    return Response.json({ coins: [] }, { status: 502 });
  }
}
