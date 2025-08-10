/**
 * API Route for Customer Bookmarks - Facade over GraphQL GetCustomerBookmarksQuery
 * SOLID Principles: SRP - Single responsibility for fetching bookmarks
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import GetCustomerBookmarksQueryDocument from '@/services/graphql/queries/GetCustomerBookmarksQuery.graphql'
import { validateGetCustomerBookmarksResponse } from '@/services/graphql/queries/GetCustomerBookmarksQuery.schema'
import type { GetCustomerBookmarksQueryVariables } from '@/services/graphql/queries/GetCustomerBookmarksQuery.types'

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

    if (!companyId || !customerId) {
      return NextResponse.json(
        { error: 'company_id and customer_id are required' },
        { status: 400 }
      )
    }

    const variables: GetCustomerBookmarksQueryVariables = {
      company_id: companyId,
      customer_id: customerId,
    }

    // Execute GraphQL query
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(GetCustomerBookmarksQueryDocument),
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
        { error: 'Failed to fetch bookmarks', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateGetCustomerBookmarksResponse(result.data)

    return NextResponse.json(validatedData)
  } catch (error) {
    console.error('Error in bookmarks API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
