/**
 * ProductInfo - Displays product details
 * SOLID Principles: SRP - Single responsibility for product info display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React
 */

interface ProductInfoProps {
  stock_name: string
  stock_group: string
  stock_id: string
  stock_unit: string
  className?: string
}

export function ProductInfo({
  stock_name,
  stock_group,
  stock_id,
  stock_unit,
  className = '',
}: ProductInfoProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold line-clamp-2 text-base">{stock_name}</h3>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Category:</span> {stock_group}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">ID:</span> {stock_id}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Unit:</span> {stock_unit}
        </p>
      </div>
    </div>
  )
}
