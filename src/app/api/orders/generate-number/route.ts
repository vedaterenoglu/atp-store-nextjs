/**
 * Generate Order Number API Route
 * SOLID Principles: SRP - Single responsibility for generating order numbers
 * Design Patterns: Facade Pattern, API Route Pattern
 * Dependencies: GraphQL, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { print } from 'graphql'
import { z } from 'zod'
import CreateOrderNumberMutationDocument from '@/services/graphql/mutations/CreateOrderNumberMutation.graphql'
import { CreateOrderNumberMutationResponseSchema } from '@/services/graphql/mutations/CreateOrderNumberMutation.schema'
import type { CreateOrderNumberMutationVariables } from '@/services/graphql/mutations/CreateOrderNumberMutation.types'

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
  companyNickname: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedBody = RequestBodySchema.parse(body)

    const variables: CreateOrderNumberMutationVariables = {
      company_nickname: validatedBody.companyNickname,
    }

    // Execute GraphQL mutation using fetch
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(CreateOrderNumberMutationDocument),
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
          error: 'Failed to generate order number',
          details: result.errors,
        },
        { status: 500 }
      )
    }

    // Validate response with Zod
    const validatedData = CreateOrderNumberMutationResponseSchema.parse(
      result.data
    )

    // Check if we got a result
    if (!validatedData.update_companies.returning.length) {
      throw new Error('No order number generated')
    }

    const orderData = validatedData.update_companies.returning[0]

    if (!orderData) {
      throw new Error('Invalid order data received')
    }

    // Format the order number
    const formattedOrderNumber = `${orderData.letter_code} ${orderData.order_number}`

    return NextResponse.json({
      success: true,
      data: {
        orderNumber: orderData.order_number,
        letterCode: orderData.letter_code,
        fullOrderNumber: formattedOrderNumber,
      },
    })
  } catch (error) {
    console.error('Error generating order number:', error)

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
        error: 'Failed to generate order number',
      },
      { status: 500 }
    )
  }
}
