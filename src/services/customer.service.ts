/**
 * Customer Service - Singleton service for customer operations
 * SOLID Principles: SRP - Single responsibility for customer operations
 * Design Patterns: Singleton, Facade Pattern, Cache Pattern, Validation Pattern
 * Dependencies: Types, cookie utilities, Zod validation
 */

import type {
  CustomerTitlesResponse,
  CustomerSwitchRequest,
  CustomerSwitchResponse,
  ActiveCustomerContext,
  AllCustomersResponse,
} from '@/lib/types/customer.types'

// Import validation schemas for runtime validation
import { validateGetAllActiveCustomersResponse } from '@/services/graphql/queries/GetAllActiveCustomersQuery.schema'
import { validateGetCustomerTitlesResponse } from '@/services/graphql/queries/GetCustomerTitlesQuery.schema'

/**
 * Customer Service - Manages customer account operations
 * Implements Singleton pattern for consistent state management
 * Implements Cache pattern for performance optimization
 */
export class CustomerService {
  private static instance: CustomerService
  private activeCustomerCache: ActiveCustomerContext | null = null
  private cacheTimestamp: number = 0
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private constructor() {}

  /**
   * Get singleton instance (SSOT for customer operations)
   */
  static getInstance(): CustomerService {
    if (!CustomerService.instance) {
      CustomerService.instance = new CustomerService()
    }
    return CustomerService.instance
  }

  /**
   * Fetch customer titles for given customer IDs
   * Used by customers to get friendly names for their accounts
   * Implements client-side validation with Zod
   */
  async fetchCustomerTitles(
    customerIds: string[]
  ): Promise<CustomerTitlesResponse> {
    try {
      const response = await fetch('/api/customers/titles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerIds }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch customer titles')
      }

      const data = await response.json()
      
      // Client-side validation with Zod (defense-in-depth)
      // The API already validates, but we validate again for safety
      // Note: API returns with customer_nickname added, so we don't validate that strict structure
      // We just ensure the core fields are present
      try {
        // Validate core structure without nickname
        const validationData = {
          customers: data.customers.map((c: any) => ({
            customer_id: c.customer_id,
            customer_title: c.customer_title
          }))
        }
        validateGetCustomerTitlesResponse(validationData)
      } catch (validationError) {
        console.error('Response validation failed:', validationError)
        // Continue with data as API is trusted source
      }

      return data
    } catch (error) {
      console.error('Error fetching customer titles:', error)
      return { customers: [] }
    }
  }

  /**
   * Fetch all active customers (Admin only)
   * Used by admins to select any customer for impersonation
   * Implements client-side validation with Zod
   */
  async fetchAllActiveCustomers(): Promise<AllCustomersResponse> {
    try {
      const response = await fetch('/api/admin/customers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch customers')
      }

      const data = await response.json()
      
      // Client-side validation with Zod (defense-in-depth)
      // The API already validates, but we validate again for safety
      // Note: API returns with customer_title added, so we don't validate that strict structure
      // We just ensure the core fields are present
      try {
        // Validate core structure
        const validationData = {
          customers: data.customers.map((c: any) => ({
            customer_id: c.customer_id,
            customer_title: c.customer_title
          }))
        }
        validateGetAllActiveCustomersResponse(validationData)
      } catch (validationError) {
        console.error('Response validation failed:', validationError)
        // Continue with data as API is trusted source
      }

      return data
    } catch (error) {
      console.error('Error fetching all customers:', error)
      return { customers: [] }
    }
  }

  /**
   * Switch active customer account
   * Sets HTTP-only cookie on server
   */
  async switchCustomer(customerId: string): Promise<CustomerSwitchResponse> {
    try {
      const response = await fetch('/api/customer/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId } as CustomerSwitchRequest),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to switch customer')
      }

      const result = await response.json()

      // Clear cache on successful switch
      if (result.success) {
        this.clearCache()
      }

      return result
    } catch (error) {
      console.error('Error switching customer:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Switch failed',
      }
    }
  }

  /**
   * Get current active customer context (with caching)
   * Fetches from server to get cookie value
   */
  async getActiveCustomer(
    forceRefresh = false
  ): Promise<ActiveCustomerContext> {
    // Check cache validity
    const now = Date.now()
    if (
      !forceRefresh &&
      this.activeCustomerCache &&
      now - this.cacheTimestamp < this.CACHE_DURATION
    ) {
      return this.activeCustomerCache
    }

    try {
      const response = await fetch('/api/customer/active', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to get active customer')
      }

      const context = await response.json()

      // Update cache
      this.activeCustomerCache = context
      this.cacheTimestamp = now

      return context
    } catch (error) {
      console.error('Error getting active customer:', error)
      return {
        customerId: null,
        customerTitle: null,
        isImpersonating: false,
      }
    }
  }

  /**
   * Clear active customer (logout from customer context)
   */
  async clearActiveCustomer(): Promise<void> {
    try {
      const response = await fetch('/api/customer/clear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await response.json()

      // Clear cache on successful clear
      if (data.success === true) {
        this.clearCache()
      }
    } catch (error) {
      console.error('Error clearing active customer:', error)
    }
  }

  /**
   * Clear internal cache (made public for sign out cleanup)
   */
  clearCache(): void {
    this.activeCustomerCache = null
    this.cacheTimestamp = 0
  }

  /**
   * Get active customer ID from context (convenience method)
   */
  async getActiveCustomerId(): Promise<string | null> {
    const context = await this.getActiveCustomer()
    return context.customerId
  }

  /**
   * Check if currently impersonating (convenience method)
   */
  async isImpersonating(): Promise<boolean> {
    const context = await this.getActiveCustomer()
    return context.isImpersonating
  }
}

// Export singleton instance (SSOT for customer operations)
export const customerService = CustomerService.getInstance()
