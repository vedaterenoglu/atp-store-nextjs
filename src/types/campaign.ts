/**
 * Campaign Types - Type definitions for campaign products
 * SOLID Principles: ISP - Interface segregation for campaign types
 * Design Patterns: Type Definition Pattern
 * Dependencies: None
 */

export interface CampaignProduct {
  stock_id: string
  stock_name: string
  stock_group: string
  stock_image_link: string
  stock_unit: string
  stock_price: number
  campaign_price: number
  discount_percentage?: number
}

export interface CampaignSliderProps {
  products: CampaignProduct[]
  autoPlay?: boolean
  autoPlayInterval?: number
  onProductClick?: (product: CampaignProduct) => void
}

export interface CampaignSectionProps {
  showCampaigns: boolean
  products?: CampaignProduct[]
  isLoading?: boolean
}

// Type guard functions for runtime type checking
export function isCampaignProduct(obj: unknown): obj is CampaignProduct {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'stock_id' in obj &&
    'stock_name' in obj &&
    'stock_group' in obj &&
    'stock_image_link' in obj &&
    'stock_unit' in obj &&
    'stock_price' in obj &&
    'campaign_price' in obj
  )
}
