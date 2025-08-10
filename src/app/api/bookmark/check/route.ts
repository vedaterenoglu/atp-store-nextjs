/**
 * API Route for Check Bookmark - Facade over GraphQL CheckBookmarkQuery
 * SOLID Principles: SRP - Single responsibility for checking bookmark status
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import CheckBookmarkQueryDocument from '@/services/graphql/queries/CheckBookmarkQuery.graphql'
import { validateCheckBookmarkResponse } from '@/services/graphql/queries/CheckBookmarkQuery.schema'
import type { CheckBookmarkQueryVariables } from '@/services/graphql/queries/CheckBookmarkQuery.types'

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

    const variables: CheckBookmarkQueryVariables = {
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
        query: print(CheckBookmarkQueryDocument),
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
        { error: 'Failed to check bookmark', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateCheckBookmarkResponse(result.data)

    // Return boolean indicating if bookmark exists
    return NextResponse.json({
      isBookmarked: validatedData.customer_bookmarks.length > 0,
    })
  } catch (error) {
    console.error('Error in bookmark check API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
