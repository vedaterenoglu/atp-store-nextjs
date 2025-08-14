/**
 * GetCustomerAddressesQuery Zod Schemas
 * SOLID Principles: SRP - Single responsibility for address query validation
 * Design Patterns: Schema Validation Pattern
 * Dependencies: zod
 */

import { z } from 'zod'
import type {
  CustomerAddress,
  GetCustomerAddressesQueryResponse,
  GetCustomerAddressesQueryVariables,
} from './GetCustomerAddressesQuery.types'

// Schema for query variables
export const GetCustomerAddressesQueryVariablesSchema = z.object({
  company_id: z.string().min(1),
  owner_id: z.string().min(1),
}) satisfies z.ZodType<GetCustomerAddressesQueryVariables>

// Schema for individual address
export const CustomerAddressSchema = z.object({
  address_id: z.string().uuid(),
  address_nickname: z.string(),
  line_1: z.string(),
  line_2: z.string(),
  city: z.string(),
  country: z.string(),
}) satisfies z.ZodType<CustomerAddress>

// Schema for the query response
export const GetCustomerAddressesQueryResponseSchema = z.object({
  addresses: z.array(CustomerAddressSchema),
}) satisfies z.ZodType<GetCustomerAddressesQueryResponse>

// Validate at module load time with example data
if (process.env['NODE_ENV'] === 'development') {
  const exampleResponse: GetCustomerAddressesQueryResponse = {
    addresses: [
      {
        address_id: '0d4bb43d-b45b-5ebe-952e-7f047dd480a7',
        address_nickname: 'Södergatan 2 - Svedala',
        line_1: 'Södergatan 2',
        line_2: '',
        city: 'Svedala',
        country: 'Sverige',
      },
      {
        address_id: '52a4cd94-d006-5045-96c2-9ff65c7af017',
        address_nickname: 'Cevapi Bulltofta - Malmö',
        line_1: 'Flygplansgatan 12',
        line_2: '',
        city: 'Malmö',
        country: 'Sverige',
      },
    ],
  }

  try {
    GetCustomerAddressesQueryResponseSchema.parse(exampleResponse)
  } catch (error) {
    console.error(
      '❌ GetCustomerAddressesQuery schema validation failed:',
      error
    )
  }
}
