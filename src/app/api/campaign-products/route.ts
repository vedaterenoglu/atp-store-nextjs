/**
 * API Route for Campaign Products - Facade over GraphQL GetCampaignProductsWithPricesQuery
 * SOLID Principles: SRP - Single responsibility for campaign products endpoint
 * Design Patterns: Facade Pattern - Simplifies GraphQL complexity
 * Dependencies: GraphQL, Hasura
 */

import { NextResponse } from 'next/server'
import { print } from 'graphql'
import GetCampaignProductsWithPricesDocument from '@/services/graphql/queries/GetCampaignProductsWithPrices.graphql'
import { validateGetCampaignProductsWithPricesResponse } from '@/services/graphql/queries/GetCampaignProductsWithPrices.schema'
import type { GetCampaignProductsWithPricesQueryVariables } from '@/services/graphql/queries/GetCampaignProductsWithPrices.types'

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

    const variables: GetCampaignProductsWithPricesQueryVariables = {
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
        query: print(GetCampaignProductsWithPricesDocument),
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
        { error: 'Failed to fetch campaign products', details: result.errors },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = validateGetCampaignProductsWithPricesResponse(
      result.data
    )

    return NextResponse.json(validatedData)
  } catch (error) {
    console.error('Error in campaign products API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
