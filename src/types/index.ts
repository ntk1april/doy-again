// Portfolio Stock Record
export interface PortfolioStock {
  _id?: string;
  symbol: string;
  units: number;
  avgPrice: number;
  realizedPnl: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Transaction Record
export interface Transaction {
  _id?: string;
  symbol: string;
  type: "BUY" | "SELL";
  units: number;
  price: number;
  realizedPnl?: number;
  date: Date;
  createdAt?: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Portfolio Summary
export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  unrealizedPnl: number;
  realizedPnl: number;
  netPnl: number;
  netPnlPercent: number;
}

// PortfolioTableFiled with Calculated Fields
export interface PortfolioTableFiled extends PortfolioStock {
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  unrealizedPnl: number;
  netPnl: number;
  unrealizedPnlPercent: number;
  netPnlPercent: number;
  logo?: string;
}
