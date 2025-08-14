/**
 * CreateOrderNumberMutation Zod Schemas
 * SOLID Principles: SRP - Single responsibility for order number mutation validation
 * Design Patterns: Schema Validation Pattern
 * Dependencies: zod
 */

import { z } from 'zod'
import type {
  CreateOrderNumberMutationVariables,
  OrderNumberData,
  CreateOrderNumberMutationResponse,
} from './CreateOrderNumberMutation.types'

// Schema for mutation variables
export const CreateOrderNumberMutationVariablesSchema = z.object({
  company_nickname: z.string().min(1),
}) satisfies z.ZodType<CreateOrderNumberMutationVariables>

// Schema for order number data
export const OrderNumberDataSchema = z.object({
  order_number: z.number().int().positive(),
  letter_code: z.string().min(1).max(10),
}) satisfies z.ZodType<OrderNumberData>

// Schema for the mutation response
export const CreateOrderNumberMutationResponseSchema = z.object({
  update_companies: z.object({
    returning: z.array(OrderNumberDataSchema).min(1),
  }),
}) satisfies z.ZodType<CreateOrderNumberMutationResponse>

// Validate at module load time with example data
if (process.env['NODE_ENV'] === 'development') {
  const exampleResponse: CreateOrderNumberMutationResponse = {
    update_companies: {
      returning: [
        {
          order_number: 130130,
          letter_code: 'AL',
        },
      ],
    },
  }

  try {
    CreateOrderNumberMutationResponseSchema.parse(exampleResponse)
    console.log('✅ CreateOrderNumberMutation schema validation passed')
  } catch (error) {
    console.error('❌ CreateOrderNumberMutation schema validation failed:', error)
  }
}