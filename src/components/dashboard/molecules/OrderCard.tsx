/**
 * @file OrderCard.tsx
 * @role Display card for individual waiting order
 * @patterns Atomic Design, Presentation Component
 * @solid SRP - Single responsibility for order display
 * @tests /src/components/dashboard/molecules/__tests__/OrderCard.test.tsx
 */

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'
import { formatDate } from '@/lib/utils/invoice-calculations'
import type { WaitingOrder } from '@/lib/types/dashboard.types'
import { Package, Calendar, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface OrderCardProps {
  order: WaitingOrder
  className?: string
}

/**
 * OrderCard - Display component for waiting order information
 */
export function OrderCard({ order, className }: OrderCardProps) {
  const { t } = useTranslation('customerDashboard')
  const totalItems = order.order_heders_goods_transactions_rel.reduce(
    (sum, item) => sum + item.amount_credit,
    0
  )

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            {order.order_number}
          </span>
          <span className="text-sm text-muted-foreground">
            {order.order_source.toUpperCase()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{formatDate(order.order_date)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span>
            {totalItems}{' '}
            {totalItems === 1
              ? t('waitingOrders.item')
              : t('waitingOrders.items')}
          </span>
        </div>

        {order.order_heders_goods_transactions_rel.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              {t('waitingOrders.orderItems')}
            </p>
            <ul className="space-y-1">
              {order.order_heders_goods_transactions_rel
                .slice(0, 3)
                .map((item, index) => (
                  <li
                    key={index}
                    className="text-xs text-muted-foreground truncate"
                  >
                    {item.amount_credit}x {item.line_info}
                  </li>
                ))}
              {order.order_heders_goods_transactions_rel.length > 3 && (
                <li className="text-xs text-muted-foreground italic">
                  {t('waitingOrders.moreItems', {
                    count: order.order_heders_goods_transactions_rel.length - 3,
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
