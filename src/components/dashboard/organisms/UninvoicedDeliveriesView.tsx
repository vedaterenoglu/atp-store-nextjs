/**
 * @file UninvoicedDeliveriesView.tsx
 * @role Container component for uninvoiced deliveries display
 * @patterns Container/Presenter, Error Boundary
 * @solid SRP - Single responsibility for uninvoiced deliveries view
 * @tests /src/components/dashboard/organisms/__tests__/UninvoicedDeliveriesView.test.tsx
 */

import { GridContainer } from '../atoms/GridContainer'
import { DeliveryCard } from '../molecules/DeliveryCard'
import { Alert, AlertDescription } from '@/components/ui/schadcn'
import { Truck } from 'lucide-react'
import type { UninvoicedDelivery } from '@/lib/types/dashboard.types'
import { useTranslation } from 'react-i18next'

interface UninvoicedDeliveriesViewProps {
  deliveries: UninvoicedDelivery[]
  isLoading: boolean
  error: string | undefined
}

/**
 * UninvoicedDeliveriesView - Display container for uninvoiced deliveries
 */
export function UninvoicedDeliveriesView({
  deliveries,
  isLoading,
  error,
}: UninvoicedDeliveriesViewProps) {
  const { t } = useTranslation('customerDashboard')
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {t('uninvoicedDeliveries.title')}
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
          <Truck className="h-5 w-5" />
          {t('uninvoicedDeliveries.title')}
        </h2>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (deliveries.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {t('uninvoicedDeliveries.title')}
        </h2>
        <Alert>
          <AlertDescription>{t('uninvoicedDeliveries.empty')}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Truck className="h-5 w-5" />
          {t('uninvoicedDeliveries.title')}
        </h2>
        <span className="text-sm text-muted-foreground">
          {deliveries.length}{' '}
          {deliveries.length === 1
            ? t('uninvoicedDeliveries.delivery')
            : t('uninvoicedDeliveries.deliveries')}
        </span>
      </div>
      <GridContainer>
        {deliveries.map(delivery => (
          <DeliveryCard key={delivery.dispatch_number} delivery={delivery} />
        ))}
      </GridContainer>
    </div>
  )
}
