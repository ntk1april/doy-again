/**
 * Utility function to get company logo URL for a stock symbol
 * Uses Yahoo Finance logo CDN for reliable stock logos
 */

const LOGO_CACHE = new Map<string, string>();

export function getStockLogo(symbol: string): string {
  if (LOGO_CACHE.has(symbol)) {
    return LOGO_CACHE.get(symbol)!;
  }

  const upperSymbol = symbol.toUpperCase();
  
  // Use Yahoo Finance logo CDN - very reliable and works for most stocks
  // Format: https://logo.clearbit.com/{domain} or use a public CDN
  const logoUrl = `https://financialmodelingprep.com/image-stock/${upperSymbol}.png`;
  
  LOGO_CACHE.set(symbol, logoUrl);
  
  return logoUrl;
}
