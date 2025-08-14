/**
 * @file dashboard.service.ts
 * @role Service layer for customer dashboard data fetching
 * @patterns Singleton Pattern, Service Layer Pattern
 * @solid SRP - Single responsibility for dashboard data operations
 * @tests /src/services/__tests__/dashboard.service.test.ts
 */

import type {
  WaitingOrder,
  UninvoicedDelivery,
  CalculatedInvoice,
} from '@/lib/types/dashboard.types'

export interface DashboardDataResponse<T> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Dashboard Service - Manages dashboard data operations
 * Implements Singleton pattern for consistent data management
 */
export class DashboardService {
  private static instance: DashboardService

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService()
    }
    return DashboardService.instance
  }

  /**
   * Fetch waiting orders for the active customer
   */
  async fetchWaitingOrders(): Promise<DashboardDataResponse<WaitingOrder[]>> {
    try {
      const response = await fetch('/api/dashboard/waiting-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch waiting orders')
      }

      const data = await response.json()
      return {
        success: true,
        data: data.orders || [],
      }
    } catch (error) {
      console.error('Error fetching waiting orders:', error)
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch waiting orders',
      }
    }
  }

  /**
   * Fetch uninvoiced deliveries for the active customer
   */
  async fetchUninvoicedDeliveries(): Promise<
    DashboardDataResponse<UninvoicedDelivery[]>
  > {
    try {
      const response = await fetch('/api/dashboard/uninvoiced-deliveries', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch uninvoiced deliveries')
      }

      const data = await response.json()
      return {
        success: true,
        data: data.deliveries || [],
      }
    } catch (error) {
      console.error('Error fetching uninvoiced deliveries:', error)
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch uninvoiced deliveries',
      }
    }
  }

  /**
   * Fetch unpaid invoices for the active customer
   */
  async fetchUnpaidInvoices(): Promise<
    DashboardDataResponse<CalculatedInvoice[]>
  > {
    try {
      const response = await fetch('/api/dashboard/unpaid-invoices', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch unpaid invoices')
      }

      const data = await response.json()
      return {
        success: true,
        data: data.invoices || [],
      }
    } catch (error) {
      console.error('Error fetching unpaid invoices:', error)
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch unpaid invoices',
      }
    }
  }

  /**
   * Fetch all dashboard data in parallel
   */
  async fetchAllDashboardData() {
    const [orders, deliveries, invoices] = await Promise.all([
      this.fetchWaitingOrders(),
      this.fetchUninvoicedDeliveries(),
      this.fetchUnpaidInvoices(),
    ])

    return {
      orders,
      deliveries,
      invoices,
    }
  }
}

// Export singleton instance
export const dashboardService = DashboardService.getInstance()
