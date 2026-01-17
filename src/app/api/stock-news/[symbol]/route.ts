import { NextResponse } from "next/server";

/**
 * GET /api/stock-news/[symbol]
 * Fetch company-specific news for a stock symbol
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ symbol: string }> },
) {
  try {
    const { symbol } = await params;
    const apiKey = process.env.FINNHUB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "API key not configured",
        },
        { status: 500 },
      );
    }

    // Get news for the specific stock from last 60 days
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 60);

    const response = await fetch(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol.toUpperCase()}&from=${fromDate.toISOString().split("T")[0]}&to=${toDate.toISOString().split("T")[0]}&token=${apiKey}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch news from Finnhub");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return NextResponse.json(
        {
          success: true,
          data: [],
        },
        { status: 200 },
      );
    }

    // Return top 6 news articles
    return NextResponse.json(
      {
        success: true,
        data: data.slice(0, 6),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching stock news:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch news",
      },
      { status: 500 },
    );
  }
}
