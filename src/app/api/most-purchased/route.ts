/**
 * API Route for Most Purchased Products - Facade over GraphQL GetMostPurchasedProductsQuery
 * SOLID Principles: SRP - Single responsibility for most purchased products endpoint
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import GetMostPurchasedProductsQueryDocument from '@/services/graphql/queries/GetMostPurchasedProductsQuery.graphql'
import { validateGetMostPurchasedProductsResponse } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.schema'
import type { GetMostPurchasedProductsQueryVariables } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']
const CONSUMPTION_PERIOD_IN_DAYS = process.env[
  'NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'
]
  ? parseInt(process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'], 10)
  : 90

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

    if (!companyId || !customerId) {
      return NextResponse.json(
        { error: 'company_id and customer_id are required' },
        { status: 400 }
      )
    }

    // Calculate date range
    const endDate = new Date()
    const beginDate = new Date()
    beginDate.setDate(beginDate.getDate() - CONSUMPTION_PERIOD_IN_DAYS)

    const variables: GetMostPurchasedProductsQueryVariables = {
      company_id: companyId,
      customer_id: customerId,
      bd: beginDate.toISOString().split('T')[0]!, // Format: YYYY-MM-DD
      ed: endDate.toISOString().split('T')[0]!, // Format: YYYY-MM-DD
    }

    // Execute GraphQL query
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(GetMostPurchasedProductsQueryDocument),
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
        {
          error: 'Failed to fetch most purchased products',
          details: result.errors,
        },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateGetMostPurchasedProductsResponse(result.data)

    return NextResponse.json(validatedData)
  } catch (error) {
    console.error('Error in most purchased API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
