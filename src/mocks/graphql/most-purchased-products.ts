/**
 * Mock data for GetMostPurchasedProductsQuery with manual workflow
 *
 * SOLID Principles: SRP - Single responsibility for most purchased products mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import { GetMostPurchasedProductsQueryResponseSchema } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.schema'
import type { GetMostPurchasedProductsQueryResponse } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.types'

/**
 * Sample of actual most purchased products data from Hasura
 * Validated at module load time
 */
export const mockMostPurchasedProductsData: GetMostPurchasedProductsQueryResponse =
  GetMostPurchasedProductsQueryResponseSchema.parse({
    goods_transactions: [
      {
        goods_transactions_stock_rel: {
          stock_id: '1001 1001 0026',
          stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
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
        goods_transactions_stock_rel: {
          stock_id: '1001 1007 R033',
          stock_name: 'Pizzakrtong 33*33*3,5 Premium 100 st./förp.',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 24,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1001 1010 0050',
          stock_name: 'Pizzakartong 50*50*4 50 st./förp.',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 5,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1001 1011 2816',
          stock_name: 'Pizzakartong Calzone 28*16*8 100 st./förp. Röda',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 3,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1001 1014 V033',
          stock_name: 'Pizzakartong 33*33*3,5 Tillfälligt Besök 100 st./förp.',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 2,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1601 1002 0002',
          stock_name: 'XXL Rulle Nyfiber ',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 2,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1601 1002 P002',
          stock_name: 'XXL Rulle Nyfiber  Premium 1200 meter',
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
        goods_transactions_stock_rel: {
          stock_id: '1601 1003 0003',
          stock_name: 'Minirulle 12 st./kolli',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 3,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '1601 1008 0007',
          stock_name: 'Toalettpapper Mini-Jumbo 12 st/förp.',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 2,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '2001 1001 0200',
          stock_name: 'Salladsbägare med Lock 200 ml 400 st/.kolli',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 9,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '2001 1001 E200',
          stock_name: 'Salladsbägare med Lock ECO 200 ml 500 st/.kolli',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 3,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '2001 1004 0100',
          stock_name: 'Såsbägare med Lock 100 ml 1000 st./kolli',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 3,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '2501 1001 0002',
          stock_name: 'Salladsskål UFO 1000 ml 300 pack',
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
        goods_transactions_stock_rel: {
          stock_id: '3001 1001 XPP1',
          stock_name: 'Hämtbox Bruna 1-fack 100 st./förp. Premium',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 9,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '4001 1004 0004',
          stock_name: 'Servetter 40*40 Vit 2-Lag 1400 pack',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 3,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '5001 1002 0045',
          stock_name: 'Aluminiumfolie 45 cm ',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 8,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '5001 1006 0060',
          stock_name: 'Plastfolie 60 cm perforerad',
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
        goods_transactions_stock_rel: {
          stock_id: '6001 1001 0001',
          stock_name: 'Maskindiskmedel Diversy 12,8 kg',
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
        goods_transactions_stock_rel: {
          stock_id: '6001 1002 0002',
          stock_name: 'Handdiskmedel Orginal, 750 ml',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 24,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '6001 1002 C002',
          stock_name: 'Handdiskmedel Citron, 750 ml',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 8,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '6001 1006 1004',
          stock_name: 'Fylttande Handtvål 500 ml Orkide',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 8,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '6001 1009 G007',
          stock_name: 'Dasty Gul Fetlösare',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 12,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '6001 1017 0016',
          stock_name: 'Klorin 1,5 L',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 24,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: '7001 1006 0014',
          stock_name: 'Babsrulle Liten 100 st./kolli',
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
        goods_transactions_stock_rel: {
          stock_id: '8001 1001 0001',
          stock_name: 'Panasonic DGP-72',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 5,
            },
          },
        },
      },
    ],
    goods_transactions_aggregate: {
      aggregate: {
        count: 25,
      },
    },
  })

/**
 * Empty most purchased products response for testing empty states
 */
export const mockMostPurchasedProductsEmpty: GetMostPurchasedProductsQueryResponse =
  GetMostPurchasedProductsQueryResponseSchema.parse({
    goods_transactions: [],
    goods_transactions_aggregate: {
      aggregate: {
        count: 0,
      },
    },
  })

/**
 * Most purchased products with null amount_credit
 */
export const mockMostPurchasedProductsWithNullAmounts: GetMostPurchasedProductsQueryResponse =
  GetMostPurchasedProductsQueryResponseSchema.parse({
    goods_transactions: [
      {
        goods_transactions_stock_rel: {
          stock_id: 'TEST001',
          stock_name: 'Test Product Without Amount',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: null,
            },
          },
        },
      },
      {
        goods_transactions_stock_rel: {
          stock_id: 'TEST002',
          stock_name: 'Test Product With Amount',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: 10,
            },
          },
        },
      },
    ],
    goods_transactions_aggregate: {
      aggregate: {
        count: 2,
      },
    },
  })

/**
 * Factory function to create custom mock data
 */
export function createMockMostPurchasedProductsData(
  overrides?: Partial<GetMostPurchasedProductsQueryResponse>
): GetMostPurchasedProductsQueryResponse {
  const data = {
    ...mockMostPurchasedProductsData,
    ...overrides,
  }

  // Validate the custom mock data
  return GetMostPurchasedProductsQueryResponseSchema.parse(data)
}

/**
 * Get top N most purchased products from mock data
 */
export function getTopMostPurchasedProducts(n: number = 5) {
  return {
    ...mockMostPurchasedProductsData,
    goods_transactions: mockMostPurchasedProductsData.goods_transactions
      .slice(0, n)
      .sort((a, b) => {
        const aCredit =
          a.goods_transaction_goods_transaction_rel_aggregate?.aggregate?.sum
            ?.amount_credit || 0
        const bCredit =
          b.goods_transaction_goods_transaction_rel_aggregate?.aggregate?.sum
            ?.amount_credit || 0
        return bCredit - aCredit
      }),
    goods_transactions_aggregate: {
      aggregate: {
        count: n,
      },
    },
  }
}
