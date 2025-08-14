/**
 * @file route.ts
 * @role API route for fetching customer's waiting orders
 * @patterns Facade Pattern, Error Boundary
 * @solid SRP - Single responsibility for waiting orders API
 * @tests /src/app/api/dashboard/waiting-orders/__tests__/route.test.ts
 */

import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import type { WaitingOrdersResponse } from '@/lib/types/dashboard.types'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

const GET_WAITING_ORDERS = `
  query GetCustomersWaitingOrdersQuery(
    $company_id: String!
    $customer_id: String!
  ) {
    order_headers(
      where: {
        customer_id: { _eq: $customer_id }
        company_id: { _eq: $company_id }
        order_dispatched: { _eq: false }
        order_canceled: { _eq: false }
      }
    ) {
      order_date
      order_number
      order_source
      order_heders_goods_transactions_rel {
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
        query: GET_WAITING_ORDERS,
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

    const data = result.data as WaitingOrdersResponse

    return NextResponse.json({
      success: true,
      orders: data.order_headers || [],
    })
  } catch (error) {
    console.error('Error fetching waiting orders:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch waiting orders',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
