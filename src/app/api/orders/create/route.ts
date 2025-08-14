/**
 * Create Order API Route
 * SOLID Principles: SRP - Single responsibility for order creation
 * Design Patterns: Facade Pattern, API Route Pattern
 * Dependencies: GraphQL, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { print } from 'graphql'
import { z } from 'zod'
import CreateOrderHeadersMutationDocument from '@/services/graphql/mutations/CreateOrderHeadersMutation.graphql'
import { CreateOrderHeadersMutationVariablesSchema } from '@/services/graphql/mutations/CreateOrderHeadersMutation.schema'
import type {
  CreateOrderHeadersMutationVariables,
  CreateOrderHeadersMutationResponse,
} from '@/services/graphql/mutations/CreateOrderHeadersMutation.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate the entire order structure with Zod
    const validatedBody = CreateOrderHeadersMutationVariablesSchema.parse(
      body
    ) as CreateOrderHeadersMutationVariables

    // Execute GraphQL mutation using fetch
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: print(CreateOrderHeadersMutationDocument),
        variables: validatedBody,
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
          error: 'Failed to create order',
          details: result.errors,
        },
        { status: 500 }
      )
    }

    const data = result.data as CreateOrderHeadersMutationResponse

    // Check if order was created successfully
    if (!data?.insert_order_headers?.affected_rows) {
      throw new Error('Order creation failed')
    }

    const createdOrder = data.insert_order_headers.returning[0]

    // Fallback empty address structure for when GraphQL doesn't return address data
    const emptyAddress = {
      address_nickname: '',
      line_1: '',
      line_2: '',
      city: '',
    }

    return NextResponse.json({
      success: true,
      data: {
        orderNumber: createdOrder?.order_number || '',
        orderDate: createdOrder?.order_date || '',
        customerTitle: createdOrder?.customer?.customer_title || '',
        affectedRows: data.insert_order_headers.affected_rows,
        dispatchAddress: createdOrder?._dispatch_address || emptyAddress,
        invoiceAddress: createdOrder?._invoice_address || emptyAddress,
      },
      message: 'Order created successfully',
    })
  } catch (error) {
    console.error('Error creating order:', error)

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

    // Handle GraphQL errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create order',
          message: error.message,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}
