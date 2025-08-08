/**
 * Mock data for campaign products matching GraphQL query structure
 * SOLID Principles: SRP - Single responsibility for campaign mock data
 * Design Patterns: Mock Data Pattern
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
}

export const mockCampaignProducts: CampaignProduct[] = [
  {
    stock_id: '8501 1001 0002',
    stock_name: 'Gaffel Premium 100 pack.',
    stock_group: '8500 - Engångs produkter',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'förp.',
    stock_price: 6000,
    campaign_price: 4200, // 30% discount
  },
  {
    stock_id: '6001 1019 1018',
    stock_name: 'Handsprit',
    stock_group: '6000 - Rengöringskem. & Rengöringstillbehör',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'st.',
    stock_price: 5600,
    campaign_price: 3920, // 30% discount
  },
  {
    stock_id: '6001 1014 0001',
    stock_name: 'Fönsterputs / Snabbrent Spray 500 ml.',
    stock_group: '6000 - Rengöringskem. & Rengöringstillbehör',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'st.',
    stock_price: 1900,
    campaign_price: 1140, // 40% discount
  },
  {
    stock_id: '8501 1016 1015',
    stock_name: 'Pizzabärare',
    stock_group: '8500 - Engångs produkter',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'förp.',
    stock_price: 5900,
    campaign_price: 4130, // 30% discount
  },
  {
    stock_id: '2001 1010 L002',
    stock_name: 'Lock till Kaffebägare 8 Oz 1000 st./kolli',
    stock_group: '2000 - Bägare',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'kolli',
    stock_price: 33900, // Note: In the query response, price is 27000 but campaign_price is 33900 (seems inverted)
    campaign_price: 27000,
  },
  {
    stock_id: '1501 1007 0006',
    stock_name: 'Hamburgareficka PREMIUM 500 st./förp.',
    stock_group: '1500 - Wellpap & Smörpapper',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'förp.',
    stock_price: 19900,
    campaign_price: 13930, // 30% discount
  },
  {
    stock_id: '2001 1001 E200',
    stock_name: 'Salladsbägare med Lock ECO 200 ml 500 st/.kolli',
    stock_group: '2000 - Bägare',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'förp.',
    stock_price: 24900,
    campaign_price: 17430, // 30% discount
  },
  {
    stock_id: '1501 1009 1008',
    stock_name: 'Falafelpapper',
    stock_group: '1500 - Wellpap & Smörpapper',
    stock_image_link:
      'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
    stock_unit: 'förp.',
    stock_price: 29900,
    campaign_price: 20930, // 30% discount
  },
]

// Helper function to calculate discount percentage
export function calculateDiscountPercentage(
  originalPrice: number,
  campaignPrice: number
): number {
  if (campaignPrice === 0 || campaignPrice >= originalPrice) return 0
  return Math.round(((originalPrice - campaignPrice) / originalPrice) * 100)
}
