/**
 * GraphQL Response Mock Builders
 * SOLID Principles: SRP - Single responsibility for GraphQL response mocking
 * Design Patterns: Factory Pattern, Builder Pattern
 * Dependencies: GraphQL response types from services
 *
 * These mock builders return the EXACT structure that API routes return
 * (validated GraphQL responses, NOT transformed data)
 */

import type { GetCategoriesQueryResponse } from '@/services/graphql/queries/GetCategoriesQuery.types'
import type { GetProductsListWithPriceQueryResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'
// import type { GetProductsWithPriceListByCategoryQueryResponse } from '@/services/graphql/queries/GetProductsWithPriceListByCategryQuery.types'
interface GetProductsWithPriceListByCategoryQueryResponse {
  stock: Array<{
    stock_id: string
    stock_name: string | null
    stock_price: number | null
    stock_unit: string | null
    stock_group: string | null
    stock_image_link: string | null
  }>
  stock_aggregate?: {
    aggregate: {
      count: number
    }
  }
}
import type { GetCampaignProductsWithPricesQueryResponse } from '@/services/graphql/queries/GetCampaignProductsWithPrices.types'
import type { GetProductPricesQueryResponse } from '@/services/graphql/queries/GetProductPricesQuery.types'
import type { GetCustomerBookmarksQueryResponse } from '@/services/graphql/queries/GetCustomerBookmarksQuery.types'
import type { CheckBookmarkQueryResponse } from '@/services/graphql/queries/CheckBookmarkQuery.types'
// import type { GetCustomerBookmarksWithDetailsQueryResponse } from '@/services/graphql/queries/GetCustomerBookmarksWithDetailsQuery.types'
interface GetCustomerBookmarksWithDetailsQueryResponse {
  bookmarks: Array<{
    customerid: string
    stock_id: string
    created_at: string
    stock?: {
      stock_id: string
      stock_name: string | null
      stock_price: number | null
      stock_unit: string | null
      stock_group: string | null
      stock_image_link: string | null
    }
  }>
}
import type { GetMostPurchasedProductsQueryResponse } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.types'
import type { BookmarkProductMutationResponse } from '@/services/graphql/mutations/BookmarkProductMutation.types'
import type { UnbookmarkProductMutationResponse } from '@/services/graphql/mutations/UnbookmarkProductMutation.types'

/**
 * Mock GetCategoriesQuery response
 * Based on actual GraphQL response from GetCategoriesQuery.graphql
 */
export function mockGetCategoriesResponse(
  overrides?: Partial<GetCategoriesQueryResponse>
): GetCategoriesQueryResponse {
  return {
    _type_stock_groups: [
      {
        stock_groups: '1000 - Pizzakartonger',
        our_company: 'alfe',
        image_url:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        alt_text: 'category image',
      },
      {
        stock_groups: '1500 - Wellpap & Smörpapper',
        our_company: 'alfe',
        image_url:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        alt_text: 'category image',
      },
      {
        stock_groups: '1600 - Hygienpapper',
        our_company: 'alfe',
        image_url:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        alt_text: 'category image',
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetProductsListWithPriceQuery response
 * Returns products in GraphQL format (NOT transformed)
 */
export function mockGetProductsListResponse(
  overrides?: Partial<GetProductsListWithPriceQueryResponse>
): GetProductsListWithPriceQueryResponse {
  return {
    stock: [
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1001 0026',
        stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
        stock_unit: 'förp.',
        stock_price: 23000,
        stock_image_link:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
      },
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1002 0028',
        stock_name: 'Pizzakartonger 28*28*3,5 100 st/förp.',
        stock_unit: 'förp.',
        stock_price: 28900,
        stock_image_link:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
      },
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1003 G030',
        stock_name: 'Pizzakartong 30*30*3,5 Röd 100 st./förp.',
        stock_unit: 'förp.',
        stock_price: 21300,
        stock_image_link:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetProductsWithPriceListByCategoryQuery response
 * Includes both products and aggregate count
 */
export function mockGetProductsByCategoryResponse(
  overrides?: Partial<GetProductsWithPriceListByCategoryQueryResponse>
): GetProductsWithPriceListByCategoryQueryResponse {
  return {
    stock: [
      {
        stock_id: '1001 1001 0026',
        stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
        stock_unit: 'förp.',
        stock_price: 23000,
        stock_group: '1000 - Pizzakartonger',
        stock_image_link: null,
      },
      {
        stock_id: '1001 1002 0028',
        stock_name: 'Pizzakartonger 28*28*3,5 100 st/förp.',
        stock_unit: 'förp.',
        stock_price: 28900,
        stock_group: '1000 - Pizzakartonger',
        stock_image_link: null,
      },
    ],
    stock_aggregate: {
      aggregate: {
        count: 295,
      },
    },
    ...overrides,
  }
}

/**
 * Mock GetCampaignProductsWithPrices response
 * Products with campaign pricing
 */
export function mockGetCampaignProductsResponse(
  overrides?: Partial<GetCampaignProductsWithPricesQueryResponse>
): GetCampaignProductsWithPricesQueryResponse {
  return {
    stock: [
      {
        is_campaign_active: true,
        stock_id: '8501 1001 0002',
        stock_name: 'Gaffel Premium 100 pack.',
        stock_group: '8500 - Engångs produkter',
        stock_image_link:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        stock_unit: 'förp.',
        stock_price: 6000,
        campaign_price: 4500,
      },
      {
        is_campaign_active: true,
        stock_id: '6001 1019 1018',
        stock_name: 'Handsprit',
        stock_group: '6000 - Rengöringskem. & Rengöringstillbehör',
        stock_image_link:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        stock_unit: 'st.',
        stock_price: 5600,
        campaign_price: 4200,
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetProductPricesQuery response
 * Complex response with stock, customers, and customer price list
 */
export function mockGetProductPricesResponse(
  overrides?: Partial<GetProductPricesQueryResponse>
): GetProductPricesQueryResponse {
  return {
    stock: [
      {
        stock_price: 25000,
        stock_price_a: 19000,
        stock_price_b: 19000,
        stock_price_c: 19000,
        stock_price_d: 19000,
        stock_price_s: 19000,
        stock_price_hra: 19000,
        stock_price_hrb: 19000,
        stock_price_hrc: 19000,
        stock_price_hrd: 19000,
        stock_price_z: 19000,
        campaign_price: 0,
        is_campaign_active: false,
        stock_moms: 25,
      },
    ],
    customers: [
      {
        customer_price_class: 'c',
      },
    ],
    customer_price_list: [
      {
        customers_price: 18500,
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetCustomerBookmarksQuery response
 * Bookmarks with full stock details
 */
export function mockGetCustomerBookmarksResponse(
  overrides?: Partial<GetCustomerBookmarksQueryResponse>
): GetCustomerBookmarksQueryResponse {
  return {
    customer_bookmarks: [
      {
        company_id: 'alfe',
        customer_id: 'SE0 1001 1086',
        stock_id: '1001 1001 0026',
        stock: {
          stock_id: '1001 1001 0026',
          stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
          stock_price: 23000,
          stock_unit: 'förp.',
          stock_group: '1000 - Pizzakartonger',
          stock_image_link:
            'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        },
      },
      {
        company_id: 'alfe',
        customer_id: 'SE0 1001 1086',
        stock_id: '1001 1005 T030',
        stock: {
          stock_id: '1001 1005 T030',
          stock_name: 'Pizzakrtong 30*30*3,5 Tillfällig Besök100 st./förp.',
          stock_price: 19900,
          stock_unit: 'förp.',
          stock_group: '1000 - Pizzakartonger',
          stock_image_link:
            'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        },
      },
    ],
    ...overrides,
  }
}

/**
 * Mock CheckBookmarkQuery response
 * Simple bookmark check response
 */
export function mockCheckBookmarkResponse(
  exists: boolean = true,
  overrides?: Partial<CheckBookmarkQueryResponse>
): CheckBookmarkQueryResponse {
  if (!exists) {
    return {
      customer_bookmarks: [],
      ...overrides,
    }
  }

  return {
    customer_bookmarks: [
      {
        company_id: 'alfe',
        customer_id: 'SE0 1001 1697',
        stock_id: '1001 1003 G030',
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetCustomerBookmarksWithDetailsQuery response
 * Bookmarks with stock details (no image link)
 */
export function mockGetBookmarksWithDetailsResponse(
  overrides?: Partial<GetCustomerBookmarksWithDetailsQueryResponse>
): GetCustomerBookmarksWithDetailsQueryResponse {
  return {
    bookmarks: [
      {
        customerid: 'SE0 1001 1086',
        stock_id: '1001 1001 0026',
        created_at: '2024-01-01T00:00:00Z',
        stock: {
          stock_id: '1001 1001 0026',
          stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
          stock_price: 23000,
          stock_unit: 'förp.',
          stock_group: '1000 - Pizzakartonger',
          stock_image_link: null,
        },
      },
      {
        customerid: 'SE0 1001 1086',
        stock_id: '2001 1001 0200',
        created_at: '2024-01-01T00:00:00Z',
        stock: {
          stock_id: '2001 1001 0200',
          stock_name: 'Salladsbägare med Lock 200 ml 400 st/.kolli',
          stock_price: 24400,
          stock_unit: 'kolli',
          stock_group: '2000 - Bägare',
          stock_image_link: null,
        },
      },
    ],
    ...overrides,
  }
}

/**
 * Mock GetMostPurchasedProductsQuery response
 * Complex response with transactions and aggregates
 */
export function mockGetMostPurchasedResponse(
  overrides?: Partial<GetMostPurchasedProductsQueryResponse>
): GetMostPurchasedProductsQueryResponse {
  return {
    goods_transactions: [
      {
        stock_id: '1001 1001 0026',
        goods_transactions_stock_rel: {
          stock_id: '1001 1001 0026',
          stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
          stock_price: 23000,
          stock_unit: 'förp.',
          stock_group: '1000 - Pizzakartonger',
          stock_image_link:
            'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 1,
            },
          },
        },
      },
      {
        stock_id: '1001 1007 R033',
        goods_transactions_stock_rel: {
          stock_id: '1001 1007 R033',
          stock_name: 'Pizzakrtong 33*33*3,5 Premium 100 st./förp.',
          stock_price: 23900,
          stock_unit: 'förp.',
          stock_group: '1000 - Pizzakartonger',
          stock_image_link:
            'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 24,
            },
          },
        },
      },
    ],
    goods_transactions_aggregate: {
      aggregate: {
        count: 8,
      },
    },
    ...overrides,
  }
}

/**
 * Mock BookmarkProductMutation response
 * Based on actual GraphQL response from BookmarkProductMutation.graphql
 */
export function mockBookmarkProductMutationResponse(
  overrides?: Partial<BookmarkProductMutationResponse>
): BookmarkProductMutationResponse {
  return {
    insert_customer_bookmarks: {
      returning: [
        {
          company_id: 'alfe',
          customer: {
            customer_id: 'SE0 1001 1086',
            customer_nickname: 'La Perla Restaurang & Pizzeria Lanskrona',
          },
          stock: {
            stock_id: '1001 1005 T030',
            stock_name: 'Pizzakrtong 30*30*3,5 Tillfällig Besök100 st./förp.',
          },
        },
      ],
      affected_rows: 1,
    },
    ...overrides,
  }
}

/**
 * Mock UnbookmarkProductMutation response
 * Based on actual GraphQL response from UnbookmarkProductMutation.graphql
 */
export function mockUnbookmarkProductMutationResponse(
  overrides?: Partial<UnbookmarkProductMutationResponse>
): UnbookmarkProductMutationResponse {
  return {
    delete_customer_bookmarks: {
      returning: [
        {
          company_id: 'alfe',
          customer: {
            customer_id: 'SE0 1001 1086',
            customer_nickname: 'La Perla Restaurang & Pizzeria Lanskrona',
          },
          stock: {
            stock_id: '1001 1005 T030',
            stock_name: 'Pizzakrtong 30*30*3,5 Tillfällig Besök100 st./förp.',
          },
        },
      ],
      affected_rows: 1,
    },
    ...overrides,
  }
}

/**
 * Helper to create empty responses for error cases
 */
export const emptyResponses = {
  categories: (): GetCategoriesQueryResponse => ({
    _type_stock_groups: [],
  }),
  products: (): GetProductsListWithPriceQueryResponse => ({
    stock: [],
  }),
  productsByCategory: (): GetProductsWithPriceListByCategoryQueryResponse => ({
    stock: [],
  }),
  campaignProducts: (): GetCampaignProductsWithPricesQueryResponse => ({
    stock: [],
  }),
  bookmarks: (): GetCustomerBookmarksQueryResponse => ({
    customer_bookmarks: [],
  }),
  mostPurchased: (): GetMostPurchasedProductsQueryResponse => ({
    goods_transactions: [],
    goods_transactions_aggregate: {
      aggregate: {
        count: 0,
      },
    },
  }),
  bookmarkMutation: (): BookmarkProductMutationResponse => ({
    insert_customer_bookmarks: {
      returning: [],
      affected_rows: 0,
    },
  }),
  unbookmarkMutation: (): UnbookmarkProductMutationResponse => ({
    delete_customer_bookmarks: {
      returning: [],
      affected_rows: 0,
    },
  }),
}
