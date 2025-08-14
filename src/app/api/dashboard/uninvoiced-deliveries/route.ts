/**
 * @file route.ts
 * @role API route for fetching customer's uninvoiced deliveries
 * @patterns Facade Pattern, Error Boundary
 * @solid SRP - Single responsibility for uninvoiced deliveries API
 * @tests /src/app/api/dashboard/uninvoiced-deliveries/__tests__/route.test.ts
 */

import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import type { UninvoicedDeliveriesResponse } from '@/lib/types/dashboard.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

const GET_UNINVOICED_DELIVERIES = `
  query GetCustomersUninvoicedDispatchesQuery(
    $company_id: String!
    $customer_id: String!
  ) {
    dispatch_headers(
      where: {
        customer_id: { _eq: $customer_id }
        company_id: { _eq: $company_id }
        dispatch_invoiced: { _eq: false }
        dispatch_canceled: { _eq: false }
      }
      order_by: { dispatch_date: desc }
    ) {
      dispatch_date
      dispatch_number
      _goods_transactions {
        amount_credit
        line_info
      }
    }
  }
`

export async function GET() {
  try {
    // Check authentication
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get active customer from cookies
    const cookieStore = await cookies()
    const userRole = user.publicMetadata?.['role'] as string
    let customerId: string | null = null

    if (userRole === 'admin') {
      customerId =
        cookieStore.get('active_customer_id')?.value ||
        cookieStore.get('impersonating_customer_id')?.value ||
        null
    } else if (userRole === 'customer') {
      const customerIds = user.publicMetadata?.['customerids'] as
        | string[]
        | undefined
      if (customerIds && customerIds.length === 1) {
        customerId = customerIds[0] || null
      } else {
        customerId = cookieStore.get('active_customer_id')?.value || null
      }
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'No active customer selected' },
        { status: 400 }
      )
    }

    // Execute GraphQL query
    const response = await fetch(HASURA_GRAPHQL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET as string,
      },
      body: JSON.stringify({
        query: GET_UNINVOICED_DELIVERIES,
        variables: {
          company_id: process.env['NEXT_PUBLIC_COMPANY_ID'] || 'alfe',
          customer_id: customerId,
        },
      }),
      cache: 'no-store',
    })

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error(result.errors[0]?.message || 'GraphQL query failed')
    }

    const data = result.data as UninvoicedDeliveriesResponse

    return NextResponse.json({
      success: true,
      deliveries: data.dispatch_headers || [],
    })
  } catch (error) {
    console.error('Error fetching uninvoiced deliveries:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch uninvoiced deliveries',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
