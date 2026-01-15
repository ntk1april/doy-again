import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { Transaction } from "@/lib/db/models";
import { ApiResponse } from "@/types";
import { requireAuth } from "@/lib/auth/middleware";

/**
 * GET /api/portfolio/transactions
 * Fetch all transactions for the authenticated user
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Require authentication
    const userId = requireAuth(request);

    await connectDB();

    const transactions = await Transaction.find({ userId }).sort({ date: -1 });

    return NextResponse.json(
      {
        success: true,
        data: transactions,
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch transactions",
      } as ApiResponse,
      { status: 500 }
    );
  }
}
