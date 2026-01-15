import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { PortfolioStock, Transaction } from "@/lib/db/models";
import {
  calculateRealizedPnl,
  calculateNewAvgPrice,
} from "@/lib/utils/calculations";
import { ApiResponse, PortfolioStock as PortfolioStockType } from "@/types";
import { requireAuth } from "@/lib/auth/middleware";

/**
 * GET /api/portfolio/stocks/[symbol]
 * Fetch a specific stock
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
): Promise<NextResponse> {
  try {
    // Require authentication
    const userId = requireAuth(req);

    await connectDB();
    const { symbol } = await params;

    const stock = (await PortfolioStock.findOne({
      userId,
      symbol: symbol.toUpperCase(),
    })) as any;

    if (!stock) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock not found",
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: stock,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch stock",
      } as ApiResponse,
      { status: 500 }
    );
  }
}

/**
 * PUT /api/portfolio/stocks/[symbol]
 * Update a stock (buy more or sell)
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
): Promise<NextResponse> {
  try {
    // Require authentication
    const userId = requireAuth(req);

    await connectDB();
    const { symbol } = await params;
    const { action, units, price } = await req.json();

    if (!action || !units || !price) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: action, units, price",
        } as ApiResponse,
        { status: 400 }
      );
    }

    const normalizedSymbol = symbol.toUpperCase();

    const stock = (await PortfolioStock.findOne({
      userId,
      symbol: normalizedSymbol,
    })) as any;

    if (!stock) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock not found",
        } as ApiResponse,
        { status: 404 }
      );
    }

    if (action === "BUY") {
      // Buying more: recalculate average price
      const newAvgPrice = calculateNewAvgPrice(
        stock.units,
        stock.avgPrice,
        units,
        price
      );

      stock.units += units;
      stock.avgPrice = newAvgPrice;
      stock.updatedAt = new Date();

      // Record transaction
      await Transaction.create({
        userId,
        symbol: normalizedSymbol,
        type: "BUY",
        units,
        price,
        date: new Date(),
      });
    } else if (action === "SELL") {
      // Selling: validate units, calculate realized P/L
      if (units > stock.units) {
        return NextResponse.json(
          {
            success: false,
            error: `Cannot sell ${units} units. Only ${stock.units} available.`,
          } as ApiResponse,
          { status: 400 }
        );
      }

      // Calculate realized P/L for this sale
      const realizedPnl = calculateRealizedPnl(price, stock.avgPrice, units);

      stock.units -= units;
      stock.realizedPnl += realizedPnl;
      stock.updatedAt = new Date();

      // Record transaction
      await Transaction.create({
        userId,
        symbol: normalizedSymbol,
        type: "SELL",
        units,
        price,
        realizedPnl,
        date: new Date(),
      });

      // If all units sold, remove from portfolio
      if (stock.units === 0) {
        await PortfolioStock.deleteOne({ userId, symbol: normalizedSymbol });
        return NextResponse.json(
          {
            success: true,
            data: {
              message: "All units sold. Stock removed from portfolio.",
              realizedPnl,
            },
          } as ApiResponse,
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid action. Must be BUY or SELL.",
        } as ApiResponse,
        { status: 400 }
      );
    }

    const updatedStock = await stock.save();

    return NextResponse.json(
      {
        success: true,
        data: updatedStock,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update stock",
      } as ApiResponse,
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/portfolio/stocks/[symbol]
 * Delete a stock from portfolio
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
): Promise<NextResponse> {
  try {
    // Require authentication
    const userId = requireAuth(req);

    await connectDB();
    const { symbol } = await params;

    const result = await PortfolioStock.deleteOne({
      userId,
      symbol: symbol.toUpperCase(),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Stock not found",
        } as ApiResponse,
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: { message: "Stock deleted successfully" },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting stock:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete stock",
      } as ApiResponse,
      { status: 500 }
    );
  }
}
