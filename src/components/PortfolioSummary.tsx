/**
 * PortfolioSummary Component
 * Displays portfolio overview: total invested, current value, P/L summary
 */

import { PortfolioSummary as PortfolioSummaryType } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils/calculations";

interface Props {
  summary: PortfolioSummaryType;
}

export default function PortfolioSummary({ summary }: Props) {
  const isProfit = summary.netPnl >= 0;

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      {/* Total Invested */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Total Invested</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {formatCurrency(summary.totalInvested)}
        </p>
      </div>

      {/* Current Value */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Current Value</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {formatCurrency(summary.currentValue)}
        </p>
      </div>

      {/* Unrealized P/L */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Unrealized P/L</p>
        <p
          className={`mt-2 text-2xl font-bold ${
            summary.unrealizedPnl >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(summary.unrealizedPnl)}
        </p>
      </div>

      {/* Realized P/L */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Realized P/L</p>
        <p
          className={`mt-2 text-2xl font-bold ${
            summary.realizedPnl >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(summary.realizedPnl)}
        </p>
      </div>

      {/* Net P/L */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-600">Net P/L</p>
        <p
          className={`mt-2 text-2xl font-bold ${
            isProfit ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatCurrency(summary.netPnl)}
        </p>
        <p
          className={`mt-1 text-sm font-medium ${
            isProfit ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatPercent(summary.netPnlPercent)}
        </p>
      </div>
    </div>
  );
}
