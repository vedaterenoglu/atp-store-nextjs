/**
 * Order Header Presentation Component
 * SOLID Principles: SRP - Single responsibility for order header presentation
 * Design Patterns: Composite Component Pattern
 * Dependencies: React, atom components, utilities, types
 */

'use client'

import { MapPin, FileText } from 'lucide-react'
import { Separator } from '@/components/ui/schadcn/separator'
import { AddressDisplay } from '../atoms/AddressDisplay'
import { OrderBadge } from '../atoms/OrderBadge'
import { formatOrderDate } from '../utils/order-formatters'
import type { OrderHeaderProps } from '../types/order-confirmation.types'

/**
 * Displays the order header section with order details and addresses
 * @param props - Component props
 * @returns Rendered order header
 */
export function OrderHeader({
  orderData,
  dispatchAddress,
  invoiceAddress,
  orderType,
}: OrderHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Order Information Section */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Order #{orderData.orderNumber}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatOrderDate(orderData.orderDate)}
            </p>
          </div>
          <OrderBadge type={orderType} />
        </div>

        <Separator />

        {/* Customer Information */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Customer
          </h4>
          <div className="space-y-1">
            <p className="text-sm font-medium">{orderData.customerTitle}</p>
            <p className="text-xs text-muted-foreground">
              ID: {orderData.customerId}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Addresses Section */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AddressDisplay
          address={dispatchAddress}
          label="Dispatch Address"
          icon={<MapPin className="size-4" />}
        />
        <AddressDisplay
          address={invoiceAddress}
          label="Invoice Address"
          icon={<FileText className="size-4" />}
        />
      </div>
    </div>
  )
}

/**
 * Compact version for smaller displays
 * @param props - Component props
 * @returns Rendered compact header
 */
export function OrderHeaderCompact({
  orderData,
  orderType,
}: Pick<OrderHeaderProps, 'orderData' | 'orderType'>) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">#{orderData.orderNumber}</p>
        <p className="text-xs text-muted-foreground">
          {formatOrderDate(orderData.orderDate)}
        </p>
      </div>
      <OrderBadge type={orderType} />
    </div>
  )
}
