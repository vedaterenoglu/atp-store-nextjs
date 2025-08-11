/**
 * Customer Titles API Route - Fetches titles for customer IDs
 * SOLID Principles: SRP - Single responsibility for fetching customer titles
 * Design Patterns: Facade Pattern over GraphQL
 * Dependencies: Clerk auth, GraphQL query
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { env } from '@/lib/config/env'
import type { CustomerTitlesResponse } from '@/lib/types/customer.types'

// GraphQL query for customer titles
const GET_CUSTOMER_TITLES = `
  query GetCustomerTitlesQuery($company_id: String!, $customerids: [String!]) {
    customers(where: {customer_id: {_in: $customerids}, company_id: {_eq: $company_id}}) {
      customer_id
      customer_title
    }
  }
`

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()
    
    if (!authData.userId || !user) {
      return NextResponse.json(
        { customers: [] } as CustomerTitlesResponse,
        { status: 401 }
      )
    }

    // Parse request
    const { customerIds } = await request.json()
    
    if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
      return NextResponse.json(
        { customers: [] } as CustomerTitlesResponse,
        { status: 400 }
      )
    }

    // Validate user has access to these customer IDs
    const userRole = user.publicMetadata?.['role'] as string
    
    if (userRole === 'customer') {
      const allowedIds = user.publicMetadata?.['customerids'] as string[] | undefined
      
      if (!allowedIds) {
        return NextResponse.json(
          { customers: [] } as CustomerTitlesResponse,
          { status: 403 }
        )
      }
      
      // Check all requested IDs are in user's allowed list
      const hasAccess = customerIds.every(id => allowedIds.includes(id))
      if (!hasAccess) {
        return NextResponse.json(
          { customers: [] } as CustomerTitlesResponse,
          { status: 403 }
        )
      }
    }

    // Fetch from Hasura
    const response = await fetch(env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET!,
      },
      body: JSON.stringify({
        query: GET_CUSTOMER_TITLES,
        variables: {
          company_id: env.COMPANY_ID,
          customerids: customerIds,
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch customer titles from Hasura')
    }

    const result = await response.json()
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors)
      throw new Error('GraphQL query failed')
    }

    return NextResponse.json({
      customers: result.data?.customers || [],
    } as CustomerTitlesResponse)
  } catch (error) {
    console.error('Customer titles error:', error)
    return NextResponse.json(
      { customers: [] } as CustomerTitlesResponse,
      { status: 500 }
    )
  }
}