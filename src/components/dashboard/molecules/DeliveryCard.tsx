/**
 * @file DeliveryCard.tsx
 * @role Display card for individual uninvoiced delivery
 * @patterns Atomic Design, Presentation Component
 * @solid SRP - Single responsibility for delivery display
 * @tests /src/components/dashboard/molecules/__tests__/DeliveryCard.test.tsx
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'
import { formatDate } from '@/lib/utils/invoice-calculations'
import type { UninvoicedDelivery } from '@/lib/types/dashboard.types'
import { Truck, Calendar, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface DeliveryCardProps {
  delivery: UninvoicedDelivery
  className?: string
}

/**
 * DeliveryCard - Display component for uninvoiced delivery information
 */
export function DeliveryCard({ delivery, className }: DeliveryCardProps) {
  const { t } = useTranslation('customerDashboard')
  const totalItems = delivery._goods_transactions.reduce(
    (sum, item) => sum + item.amount_credit,
    0
  )

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            {delivery.dispatch_number}
          </span>
          <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
            {t('uninvoicedDeliveries.uninvoiced')}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(delivery.dispatch_date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span>
            {t('uninvoicedDeliveries.itemsDelivered', {
              count: totalItems,
              items:
                totalItems === 1
                  ? t('uninvoicedDeliveries.item')
                  : t('uninvoicedDeliveries.items'),
            })}
          </span>
        </div>

        {delivery._goods_transactions.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              {t('uninvoicedDeliveries.deliveredItems')}
            </p>
            <ul className="space-y-1">
              {delivery._goods_transactions.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  className="text-xs text-muted-foreground truncate"
                >
                  {item.amount_credit}x {item.line_info}
                </li>
              ))}
              {delivery._goods_transactions.length > 3 && (
                <li className="text-xs text-muted-foreground italic">
                  {t('uninvoicedDeliveries.moreItems', {
                    count: delivery._goods_transactions.length - 3,
                  })}
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
