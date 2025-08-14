/**
 * CreateOrderHeadersMutation Zod Schemas
 * SOLID Principles: SRP - Single responsibility for order creation validation
 * Design Patterns: Schema Validation Pattern
 * Dependencies: zod
 */

import { z } from 'zod'
import type {
  GoodsTransactionInput,
  OrderHeaderInput,
  CreateOrderHeadersMutationVariables,
  CreateOrderHeadersMutationResponse,
  AddressResponse,
} from './CreateOrderHeadersMutation.types'

// Schema for goods transaction (order line)
export const GoodsTransactionInputSchema = z.object({
  goods_transaction_id: z.string().uuid(),
  transaction_type: z.literal('customer order'),
  stock_id: z.string().min(1),
  line_info: z.string().min(1),
  amount_credit: z.number().int().positive(),
  order_amount: z.number().int().positive(),
  dispatch_amount: z.number().int().positive(),
  unit_price: z.number().int().nonnegative(),
  vat_percent: z.number().nonnegative(),
  vat_credit: z.number().int().nonnegative(),
  invoice_price: z.number().int().nonnegative(),
  line_price_total_credit: z.number().int().nonnegative(),
  vat_credit_exchange: z.number().int().nonnegative(),
  invoice_price_exchange: z.number().int().nonnegative(),
  line_price_total_credit_exchange: z.number().int().nonnegative(),
}) satisfies z.ZodType<GoodsTransactionInput>

// Schema for order header
export const OrderHeaderInputSchema = z.object({
  company_id: z.string().min(1),
  order_number: z.string().regex(/^[A-Z]{1,3}\s\d+$/), // e.g., "AL 130130"
  order_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // yyyy-mm-dd format
  order_source: z.literal('internet'),
  order_type: z.enum(['Inland', 'Inside EU', 'Outside EU']),
  order_exchange_unit: z.string().min(1),
  order_exchange_rate: z.number().positive(),
  order_language: z.enum(['se', 'en']),
  customer_id: z.string().min(1),
  dispatch_address_id: z.string().uuid(),
  invoice_address_id: z.string().uuid(),
  order_lock: z.boolean(),
  order_heders_goods_transactions_rel: z.object({
    data: z.array(GoodsTransactionInputSchema).min(1),
  }),
}) satisfies z.ZodType<OrderHeaderInput>

// Schema for mutation variables
export const CreateOrderHeadersMutationVariablesSchema = z.object({
  input: z.array(OrderHeaderInputSchema).min(1),
}) satisfies z.ZodType<CreateOrderHeadersMutationVariables>

// Schema for address response
export const AddressResponseSchema = z.object({
  address_nickname: z.string(),
  line_1: z.string(),
  line_2: z.string().nullable(),
  city: z.string(),
}) satisfies z.ZodType<AddressResponse>

// Schema for mutation response
export const CreateOrderHeadersMutationResponseSchema = z.object({
  insert_order_headers: z.object({
    affected_rows: z.number().int().positive(),
    returning: z.array(
      z.object({
        order_number: z.string(),
        order_date: z.string(),
        _dispatch_address: AddressResponseSchema,
        _invoice_address: AddressResponseSchema,
        customer: z.object({
          customer_title: z.string(),
        }),
      })
    ),
  }),
}) satisfies z.ZodType<CreateOrderHeadersMutationResponse>
