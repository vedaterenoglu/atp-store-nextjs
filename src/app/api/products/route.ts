/**
 * API Route for Products - Facade over GraphQL GetProductsListWithPriceQuery
 * SOLID Principles: SRP - Single responsibility for products endpoint
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import GetProductsListWithPriceQueryDocument from '@/services/graphql/queries/GetProductsListWithPriceQuery.graphql'
import { validateGetProductsListWithPriceResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.schema'
import type { GetProductsListWithPriceQueryVariables } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'

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
    // Extract company_id from query params
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get('company_id')

    if (!companyId) {
      return NextResponse.json(
        { error: 'company_id is required' },
        { status: 400 }
      )
    }

    const variables: GetProductsListWithPriceQueryVariables = {
      company_id: companyId,
    }

    // Execute GraphQL query
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(GetProductsListWithPriceQueryDocument),
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
        { error: 'Failed to fetch products', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateGetProductsListWithPriceResponse(result.data)

    return NextResponse.json(validatedData)
  } catch (error) {
    console.error('Error in products API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
