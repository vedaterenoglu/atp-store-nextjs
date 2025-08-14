/**
 * @file route.ts
 * @role API route for fetching customer's unpaid invoices
 * @patterns Facade Pattern, Error Boundary
 * @solid SRP - Single responsibility for unpaid invoices API
 * @tests /src/app/api/dashboard/unpaid-invoices/__tests__/route.test.ts
 */

import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import type { UnpaidInvoicesResponse } from '@/lib/types/dashboard.types'
import { enrichInvoice } from '@/lib/utils/invoice-calculations'

const HASURA_GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT']
const HASURA_ADMIN_SECRET = process.env['HASURA_GRAPHQL_ADMIN_SECRET']

if (!HASURA_GRAPHQL_ENDPOINT) {
  throw new Error('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT is not configured')
}

if (!HASURA_ADMIN_SECRET) {
  throw new Error('HASURA_GRAPHQL_ADMIN_SECRET is not configured')
}

const GET_UNPAID_INVOICES = `
  query GetCustomersUnpaidInvoicesQuery(
    $company_id: String!
    $customer_id: String!
  ) {
    document_transactions(
      order_by: { invoice_date: desc }
      where: {
        is_invoice_paid: { _eq: "false" }
        customer_id: { _eq: $customer_id }
        our_company: { _eq: $company_id }
        transaction_type: { _eq: "sales invoice " }
      }
    ) {
      invoice_date
      invoice_due_date
      invoice_number
      is_invoice_paid
      is_invoice_reminded
      is_sent_in_the_bailiffs
      is_fee_addable
      paper_invoice_fee
      paper_invoice_fee_vat
      _invoice_lines_aggregate {
        aggregate {
          sum {
            line_price_total_credit_exchange
            vat_credit_exchange
          }
        }
      }
      invoice_exchange_unit
      invoice_payments_aggregate {
        aggregate {
          sum {
            payment_credit_in_exchange
          }
        }
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
        query: GET_UNPAID_INVOICES,
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

    const data = result.data as UnpaidInvoicesResponse

    // Enrich invoices with calculated fields
    const enrichedInvoices = (data?.document_transactions || []).map(
      enrichInvoice
    )

    return NextResponse.json({
      success: true,
      invoices: enrichedInvoices,
    })
  } catch (error) {
    console.error('Error fetching unpaid invoices:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch unpaid invoices',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
