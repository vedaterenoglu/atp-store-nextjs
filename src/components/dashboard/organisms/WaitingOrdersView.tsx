/**
 * @file WaitingOrdersView.tsx
 * @role Container component for waiting orders display
 * @patterns Container/Presenter, Error Boundary
 * @solid SRP - Single responsibility for waiting orders view
 * @tests /src/components/dashboard/organisms/__tests__/WaitingOrdersView.test.tsx
 */

import { GridContainer } from '../atoms/GridContainer'
import { OrderCard } from '../molecules/OrderCard'
import { Alert, AlertDescription } from '@/components/ui/schadcn'
import { Package } from 'lucide-react'
import type { WaitingOrder } from '@/lib/types/dashboard.types'
import { useTranslation } from 'react-i18next'

interface WaitingOrdersViewProps {
  orders: WaitingOrder[]
  isLoading: boolean
  error: string | undefined
}

/**
 * WaitingOrdersView - Display container for waiting orders
 */
export function WaitingOrdersView({
  orders,
  isLoading,
  error,
}: WaitingOrdersViewProps) {
  const { t } = useTranslation('customerDashboard')
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          {t('waitingOrders.title')}
        </h2>
        <GridContainer>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </GridContainer>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          {t('waitingOrders.title')}
        </h2>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          {t('waitingOrders.title')}
        </h2>
        <Alert>
          <AlertDescription>{t('waitingOrders.empty')}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="h-5 w-5" />
          {t('waitingOrders.title')}
        </h2>
        <span className="text-sm text-muted-foreground">
          {orders.length}{' '}
          {orders.length === 1
            ? t('waitingOrders.order')
            : t('waitingOrders.orders')}
        </span>
      </div>
      <GridContainer>
        {orders.map(order => (
          <OrderCard key={order.order_number} order={order} />
        ))}
      </GridContainer>
    </div>
  )
}
