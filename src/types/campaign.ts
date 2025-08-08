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
