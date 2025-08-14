/**
 * Customer Addresses API Route
 * SOLID Principles: SRP - Single responsibility for fetching customer addresses
 * Design Patterns: Facade Pattern, API Route Pattern
 * Dependencies: GraphQL, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { print } from 'graphql'
import { z } from 'zod'
import GetCustomerAddressesQueryDocument from '@/services/graphql/queries/GetCustomerAddressesQuery.graphql'
import { GetCustomerAddressesQueryResponseSchema } from '@/services/graphql/queries/GetCustomerAddressesQuery.schema'
import type { GetCustomerAddressesQueryVariables } from '@/services/graphql/queries/GetCustomerAddressesQuery.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

// Request body schema
const RequestBodySchema = z.object({
  companyId: z.string().min(1),
  customerId: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedBody = RequestBodySchema.parse(body)

    const variables: GetCustomerAddressesQueryVariables = {
      company_id: validatedBody.companyId,
      owner_id: validatedBody.customerId,
    }

    // Execute GraphQL query using fetch
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(GetCustomerAddressesQueryDocument),
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
          success: false,
          error: 'Failed to fetch customer addresses',
          details: result.errors,
        },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = GetCustomerAddressesQueryResponseSchema.parse(
      result.data
    )

    // Format addresses for UI
    const formattedAddresses = validatedData.addresses.map(address => ({
      id: address.address_id,
      label: `${address.address_nickname}: ${address.line_1}${
        address.line_2 ? ' ' + address.line_2 : ''
      } ${address.city}`,
      fullAddress: address,
    }))

    return NextResponse.json({
      success: true,
      data: {
        addresses: validatedData.addresses,
        formattedAddresses,
      },
    })
  } catch (error) {
    console.error('Error fetching customer addresses:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch customer addresses',
      },
      { status: 500 }
    )
  }
}
