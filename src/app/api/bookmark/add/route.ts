/**
 * API Route for Bookmark Add - Facade over GraphQL BookmarkProductMutation
 * SOLID Principles: SRP - Single responsibility for bookmark addition
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import BookmarkProductMutationDocument from '@/services/graphql/mutations/BookmarkProductMutation.graphql'
import { validateBookmarkProductResponse } from '@/services/graphql/mutations/BookmarkProductMutation.schema'
import type { BookmarkProductMutationVariables } from '@/services/graphql/mutations/BookmarkProductMutation.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

export async function POST(request: Request) {
  try {
    // Extract variables from request body
    const body = await request.json()
    const { company_id, customer_id, stock_id } = body

    if (!company_id || !customer_id || !stock_id) {
      return NextResponse.json(
        { error: 'company_id, customer_id, and stock_id are required' },
        { status: 400 }
      )
    }

    const variables: BookmarkProductMutationVariables = {
      company_id,
      customer_id,
      stock_id,
    }

    // Execute GraphQL mutation
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(BookmarkProductMutationDocument),
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
        { error: 'Failed to bookmark product', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateBookmarkProductResponse(result.data)

    return NextResponse.json({
      success: true,
      data: validatedData,
    })
  } catch (error) {
    console.error('Error in bookmark add API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
