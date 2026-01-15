/**
 * StockLogo Component
 * Displays stock logo with fallback to 2-letter symbol if logo fails to load
 */

"use client";

import { useState } from "react";
import { getStockLogo } from "@/lib/utils/logos";

interface Props {
  symbol: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StockLogo({ symbol, size = "md", className = "" }: Props) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const logoUrl = getStockLogo(symbol);
  const fallbackText = symbol.substring(0, 2).toUpperCase();

  if (imageError) {
    // Show 2-letter fallback
    return (
      <div
        className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-sm`}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={symbol}
      className={`${sizeClasses[size]} ${className} rounded-full object-cover bg-gray-100`}
      onError={() => setImageError(true)}
    />
  );
}
