/**
 * Price formatting utilities
 * SOLID Principles: SRP - Single responsibility for price formatting
 * Design Patterns: Utility Pattern
 * Dependencies: None
 */

/**
 * Formats a price from öre to SEK with Swedish locale formatting
 * @param priceInOre - Price in öre (smallest unit)
 * @param showCurrency - Whether to append "SEK" to the formatted price
 * @returns Formatted price string (e.g., "1 154,38" or "1 154,38 SEK")
 */
export function formatPrice(
  priceInOre: number,
  showCurrency: boolean = true
): string {
  // Convert öre to SEK
  const priceInSEK = priceInOre / 100

  // Format with Swedish locale (space as thousand separator, comma as decimal)
  const formatted = new Intl.NumberFormat('sv-SE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInSEK)

  return showCurrency ? `${formatted} SEK` : formatted
}

/**
 * Formats a price range from öre to SEK
 * @param minPrice - Minimum price in öre
 * @param maxPrice - Maximum price in öre
 * @returns Formatted price range string (e.g., "100,00 - 500,00 SEK")
 */
export function formatPriceRange(minPrice: number, maxPrice: number): string {
  const min = formatPrice(minPrice, false)
  const max = formatPrice(maxPrice, false)
  return `${min} - ${max} SEK`
}
