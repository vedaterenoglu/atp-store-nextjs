/**
 * Order Confirmation Modal Component
 * SOLID Principles: SRP - Single responsibility for modal orchestration
 * Design Patterns: Container Component Pattern, Composition Pattern
 * Dependencies: React, shadcn/ui, decomposed components
 */

'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/schadcn/dialog'
import { ScrollArea } from '@/components/ui/schadcn/scroll-area'
import { Button } from '@/components/ui/schadcn/button'
import { Separator } from '@/components/ui/schadcn/separator'
import { OrderHeader } from './order-confirmation/presentation/OrderHeader'
import { OrderLinesTable } from './order-confirmation/presentation/OrderLinesTable'
import {
  OrderSummary,
  OrderSummaryCompact,
} from './order-confirmation/presentation/OrderSummary'
import { useIsMobile } from '@/hooks/use-media-query'
import type { OrderConfirmationModalProps } from './order-confirmation/types/order-confirmation.types'

/**
 * Modal component displaying order confirmation details
 * Composes presentation components for header, table, and summary
 * @param props - Component props
 * @returns Rendered order confirmation modal
 */
export function OrderConfirmationModal({
  isOpen,
  onClose,
  orderData,
  dispatchAddress,
  invoiceAddress,
  orderLines,
  orderSummary,
  orderMetadata,
}: OrderConfirmationModalProps) {
  const isMobile = useIsMobile()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Order Confirmation
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Your order has been successfully placed. Below are the details of
            your order.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh]">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 p-1">
            {/* Order Header Section */}
            <OrderHeader
              orderData={orderData}
              dispatchAddress={dispatchAddress}
              invoiceAddress={invoiceAddress}
              orderType={orderMetadata.orderType}
            />

            <Separator />

            {/* Order Lines Table Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base font-semibold sm:text-lg">
                Order Items
              </h3>
              <OrderLinesTable orderLines={orderLines} />
            </div>

            <Separator />

            {/* Order Summary Section */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base font-semibold sm:text-lg">
                Order Summary
              </h3>
              {isMobile ? (
                <OrderSummaryCompact
                  orderSummary={orderSummary}
                  orderMetadata={orderMetadata}
                />
              ) : (
                <OrderSummary
                  orderSummary={orderSummary}
                  orderMetadata={orderMetadata}
                />
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions - Stack on mobile, inline on larger screens */}
        <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end sm:gap-3 sm:pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
