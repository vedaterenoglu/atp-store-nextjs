/**
 * Admin Customers API Route - Fetches all active customers for admin impersonation
 * SOLID Principles: SRP - Single responsibility for fetching all customers
 * Design Patterns: Facade Pattern over GraphQL with runtime validation
 * Dependencies: Clerk auth, GraphQL query, Zod validation
 */

import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { env } from '@/lib/config/env'
import type { AllCustomersResponse } from '@/lib/types/customer.types'
import { validateGetAllActiveCustomersResponse } from '@/services/graphql/queries/GetAllActiveCustomersQuery.schema'

// GraphQL query for all active customers
const GET_ALL_ACTIVE_CUSTOMERS = `
  query GetAllActiveCustomersQuery($company_id: String!) {
    customers(where: {customer_is_active: {_eq: true}, company_id: {_eq: $company_id}}, order_by: {customer_title: asc}) {
      customer_id
      customer_title
    }
  }
`

export async function GET() {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json({ customers: [] } as AllCustomersResponse, {
        status: 401,
      })
    }

    // Check if user is admin
    const userRole = user.publicMetadata?.['role'] as string

    if (userRole !== 'admin') {
      return NextResponse.json({ customers: [] } as AllCustomersResponse, {
        status: 403,
      })
    }


    // Fetch from Hasura
    const response = await fetch(env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET!,
      },
      body: JSON.stringify({
        query: GET_ALL_ACTIVE_CUSTOMERS,
        variables: {
          company_id: env.COMPANY_ID,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch customers from Hasura')
    }

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error('GraphQL query failed')
    }

    // Validate response with Zod
    const validatedData = validateGetAllActiveCustomersResponse(result.data)

    // Map to expected response format with customer_nickname
    const customersWithNicknames = validatedData.customers.map(customer => ({
      customer_id: customer.customer_id,
      customer_title: customer.customer_title,
      customer_nickname: customer.customer_title, // Use title as nickname for backward compatibility
    }))

    return NextResponse.json({
      customers: customersWithNicknames,
    } as AllCustomersResponse)
  } catch (error) {
    console.error('Admin customers error:', error)
    return NextResponse.json({ customers: [] } as AllCustomersResponse, {
      status: 500,
    })
  }
}
