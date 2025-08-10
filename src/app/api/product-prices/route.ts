/**
 * API Route for Product Prices - Facade over GraphQL GetProductPricesQuery
 * SOLID Principles: SRP - Single responsibility for product pricing endpoint
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import GetProductPricesQueryDocument from '@/services/graphql/queries/GetProductPricesQuery.graphql'
import { validateGetProductPricesResponse } from '@/services/graphql/queries/GetProductPricesQuery.schema'
import type { GetProductPricesQueryVariables } from '@/services/graphql/queries/GetProductPricesQuery.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

export async function GET(request: Request) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('company_id')
    const customerId = searchParams.get('customer_id')
    const stockId = searchParams.get('stock_id')

    if (!companyId || !customerId || !stockId) {
      return NextResponse.json(
        { error: 'company_id, customer_id, and stock_id are required' },
        { status: 400 }
      )
    }

    const variables: GetProductPricesQueryVariables = {
      company_id: companyId,
      customer_id: customerId,
      stock_id: stockId,
    }

    // Execute GraphQL query
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(GetProductPricesQueryDocument),
        variables,
      }),
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      return NextResponse.json(
        { error: 'Failed to fetch product prices', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateGetProductPricesResponse(result.data)

    return NextResponse.json(validatedData)
  } catch (error) {
    console.error('Error in product prices API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
