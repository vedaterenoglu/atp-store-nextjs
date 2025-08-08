/**
 * PriceDisplay - Shows original and campaign prices in öre (divide by 100 for SEK)
 * SOLID Principles: SRP - Single responsibility for price display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React
 */

interface PriceDisplayProps {
  stock_price: number // Price in öre
  campaign_price: number // Campaign price in öre
  currency?: string
  className?: string
}

export function PriceDisplay({
  stock_price,
  campaign_price,
  currency = 'SEK',
  className = '',
}: PriceDisplayProps) {
  // Convert from öre to SEK (divide by 100)
  const displayPrice = campaign_price / 100
  const originalPrice = stock_price / 100
  const hasDiscount = campaign_price <= stock_price

  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-2xl font-bold text-primary">
        {displayPrice.toFixed(2)} {currency}
      </span>
      {hasDiscount && (
        <span className="text-xl text-muted-foreground line-through">
          {originalPrice.toFixed(2)} {currency}
        </span>
      )}
    </div>
  )
}
