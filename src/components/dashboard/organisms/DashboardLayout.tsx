/**
 * @file DashboardLayout.tsx
 * @role Main container component for customer dashboard
 * @patterns Container/Presenter, State Management, Error Boundary
 * @solid SRP - Single responsibility for dashboard orchestration, DIP - Depends on abstractions
 * @tests /src/components/dashboard/organisms/__tests__/DashboardLayout.test.tsx
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardSidebar } from '../molecules/DashboardSidebar'
import { WaitingOrdersView } from './WaitingOrdersView'
import { UninvoicedDeliveriesView } from './UninvoicedDeliveriesView'
import { UnpaidInvoicesView } from './UnpaidInvoicesView'
import { dashboardService } from '@/services/dashboard.service'
import { Card } from '@/components/ui/schadcn'
import type {
  DashboardView,
  WaitingOrder,
  UninvoicedDelivery,
  CalculatedInvoice,
} from '@/lib/types/dashboard.types'

interface DashboardData {
  orders: WaitingOrder[]
  deliveries: UninvoicedDelivery[]
  invoices: CalculatedInvoice[]
}

interface LoadingStates {
  orders: boolean
  deliveries: boolean
  invoices: boolean
}

interface ErrorStates {
  orders: string | undefined
  deliveries: string | undefined
  invoices: string | undefined
}

/**
 * DashboardLayout - Main orchestrator for customer dashboard
 * Manages state, data fetching, and view rendering
 */
export function DashboardLayout() {
  const { t } = useTranslation('customerDashboard')
  const [activeView, setActiveView] = useState<DashboardView>('waiting-orders')
  const [data, setData] = useState<DashboardData>({
    orders: [],
    deliveries: [],
    invoices: [],
  })
  const [loading, setLoading] = useState<LoadingStates>({
    orders: true,
    deliveries: true,
    invoices: true,
  })
  const [errors, setErrors] = useState<ErrorStates>({
    orders: undefined,
    deliveries: undefined,
    invoices: undefined,
  })

  const fetchDashboardData = useCallback(async () => {
    // Fetch all data in parallel
    const results = await dashboardService.fetchAllDashboardData()

    // Update orders
    if (results.orders.success) {
      setData(prev => ({ ...prev, orders: results.orders.data || [] }))
      setErrors(prev => ({ ...prev, orders: undefined }))
    } else {
      setErrors(prev => ({ ...prev, orders: results.orders.error }))
    }
    setLoading(prev => ({ ...prev, orders: false }))

    // Update deliveries
    if (results.deliveries.success) {
      setData(prev => ({ ...prev, deliveries: results.deliveries.data || [] }))
      setErrors(prev => ({ ...prev, deliveries: undefined }))
    } else {
      setErrors(prev => ({ ...prev, deliveries: results.deliveries.error }))
    }
    setLoading(prev => ({ ...prev, deliveries: false }))

    // Update invoices
    if (results.invoices.success) {
      setData(prev => ({ ...prev, invoices: results.invoices.data || [] }))
      setErrors(prev => ({ ...prev, invoices: undefined }))
    } else {
      setErrors(prev => ({ ...prev, invoices: results.invoices.error }))
    }
    setLoading(prev => ({ ...prev, invoices: false }))
  }, [])

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const renderView = () => {
    switch (activeView) {
      case 'waiting-orders':
        return (
          <WaitingOrdersView
            orders={data.orders}
            isLoading={loading.orders}
            error={errors.orders}
          />
        )
      case 'uninvoiced-deliveries':
        return (
          <UninvoicedDeliveriesView
            deliveries={data.deliveries}
            isLoading={loading.deliveries}
            error={errors.deliveries}
          />
        )
      case 'unpaid-invoices':
        return (
          <UnpaidInvoicesView
            invoices={data.invoices}
            isLoading={loading.invoices}
            error={errors.invoices}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - responsive: full width on mobile, 1/4 on desktop */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <DashboardSidebar
              activeView={activeView}
              onViewChange={setActiveView}
            />
          </Card>
        </div>

        {/* Main content - responsive: full width on mobile, 3/4 on desktop */}
        <div className="lg:col-span-3">
          <Card className="p-6">{renderView()}</Card>
        </div>
      </div>
    </div>
  )
}
