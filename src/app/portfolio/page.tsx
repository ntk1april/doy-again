/**
 * Portfolio Dashboard Page
 * Main page displaying all stocks and portfolio summary
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PortfolioSummary from "@/components/PortfolioSummary";
import PortfolioTable from "@/components/PortfolioTable";
import { EnhancedStock, PortfolioSummary as PortfolioSummaryType, ApiResponse } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { authFetch } from "@/lib/utils/auth-fetch";

export default function PortfolioDashboard() {
  const [stocks, setStocks] = useState<EnhancedStock[]>([]);
  const [summary, setSummary] = useState<PortfolioSummaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, signOut, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to signin if not authenticated
    if (!authLoading && !user) {
      router.push("/signin");
      return;
    }

    if (user) {
      fetchPortfolio();
    }
  }, [user, authLoading, router]);

  const fetchPortfolio = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await authFetch("/api/portfolio/stocks");
      const data: ApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch portfolio");
      }

      const { stocks: fetchedStocks, summary: fetchedSummary } = data.data as {
        stocks: EnhancedStock[];
        summary: PortfolioSummaryType;
      };

      setStocks(fetchedStocks);
      setSummary(fetchedSummary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching portfolio:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/portfolio/history"
              className="rounded-md bg-gray-600 px-4 py-2 font-medium text-white hover:bg-gray-700"
            >
              📊 View History
            </Link>
            <Link
              href="/portfolio/add"
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              + Add Stock
            </Link>
            <button
              onClick={signOut}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading portfolio...</p>
          </div>
        )}

        {/* Portfolio Summary */}
        {!isLoading && summary && (
          <>
            <PortfolioSummary summary={summary} />

            {/* Portfolio Table */}
            <div className="mt-8">
              <PortfolioTable stocks={stocks} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
