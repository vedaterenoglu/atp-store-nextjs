/**
 * Address Selection Modal Component
 * SOLID Principles: SRP - Single responsibility for address selection UI
 * Design Patterns: Controlled Component Pattern
 * Dependencies: shadcn/ui, React
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/schadcn/dialog'
import { Button } from '@/components/ui/schadcn/button'
import { Label } from '@/components/ui/schadcn/label'
import { Loader2 } from 'lucide-react'
import {
  AddressService,
  type FormattedAddress,
} from '@/services/address.service'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { cn } from '@/lib/utils'
import {
  useAddressStore,
  useCustomerAddresses,
} from '@/lib/stores/address.store'

interface AddressSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  companyId: string
  customerId: string
  onAddressSelect: (dispatchAddress: string, invoiceAddress: string) => void
}

export function AddressSelectionModal({
  isOpen,
  onClose,
  companyId,
  customerId,
  onAddressSelect,
}: AddressSelectionModalProps) {
  const { t } = useSafeTranslation('cart')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dispatchAddressId, setDispatchAddressId] = useState<string>('')
  const [invoiceAddressId, setInvoiceAddressId] = useState<string>('')

  // Use address store
  const addresses = useCustomerAddresses()
  const setCustomerAddresses = useAddressStore(
    state => state.setCustomerAddresses
  )

  const fetchAddresses = useCallback(async () => {
    setLoading(true)
    setError(null)

    const result = await AddressService.getCustomerAddresses(
      companyId,
      customerId
    )

    if (result.success && result.data) {
      // Store addresses in the address store
      setCustomerAddresses(result.data.formattedAddresses)

      // Set default selections if available
      if (result.data.formattedAddresses.length > 0) {
        const defaultAddress = result.data.formattedAddresses[0]
        if (defaultAddress) {
          setDispatchAddressId(defaultAddress.id)
          setInvoiceAddressId(defaultAddress.id)
        }
      }
    } else {
      setError(result.error || t('errors.fetchAddressesFailed'))
    }

    setLoading(false)
  }, [companyId, customerId, setCustomerAddresses, t])

  // Fetch addresses when modal opens
  useEffect(() => {
    if (isOpen && companyId && customerId) {
      fetchAddresses()
    }
  }, [isOpen, companyId, customerId, fetchAddresses])

  const handleSubmit = () => {
    if (!dispatchAddressId || !invoiceAddressId) {
      setError(t('errors.selectDispatchAddress'))
      return
    }

    onAddressSelect(dispatchAddressId, invoiceAddressId)
    onClose()
  }

  // Format address for display in dropdown
  const formatAddressOption = (address: FormattedAddress): string => {
    const { address_nickname, line_1, line_2, city } = address.fullAddress
    const line2Part = line_2 ? ` ${line_2}` : ''
    return `${address_nickname}: ${line_1}${line2Part} ${city}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:max-w-[600px]'
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {t('addressSelection.title')}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            {t('addressSelection.description')}
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className={cn('flex items-center justify-center py-8')}>
            <Loader2 className={cn('h-8 w-8 animate-spin')} />
          </div>
        )}

        {error && (
          <div
            className={cn('rounded-md bg-destructive/10 p-3 text-destructive')}
          >
            {error}
          </div>
        )}

        {!loading && !error && addresses.length > 0 && (
          <div className={cn('space-y-6')}>
            {/* Dispatch Address Selection */}
            <div className={cn('space-y-3')}>
              <Label htmlFor="dispatch-address">
                {t('addressSelection.dispatchAddress')}
              </Label>
              <select
                id="dispatch-address"
                value={dispatchAddressId}
                onChange={e => setDispatchAddressId(e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-2',
                  'text-sm ring-offset-background',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              >
                <option value="">{t('addressSelection.selectAddress')}</option>
                {addresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {formatAddressOption(address)}
                  </option>
                ))}
              </select>
            </div>

            {/* Invoice Address Selection */}
            <div className={cn('space-y-3')}>
              <Label htmlFor="invoice-address">
                {t('addressSelection.invoiceAddress')}
              </Label>
              <select
                id="invoice-address"
                value={invoiceAddressId}
                onChange={e => setInvoiceAddressId(e.target.value)}
                className={cn(
                  'w-full rounded-md border border-input bg-background px-3 py-2',
                  'text-sm ring-offset-background',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              >
                <option value="">{t('addressSelection.selectAddress')}</option>
                {addresses.map(address => (
                  <option key={address.id} value={address.id}>
                    {formatAddressOption(address)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {!loading && !error && addresses.length === 0 && (
          <div className={cn('py-8 text-center text-muted-foreground')}>
            {t('addressSelection.noAddresses')}
          </div>
        )}

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {t('addressSelection.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!dispatchAddressId || !invoiceAddressId || loading}
            className="w-full sm:w-auto"
          >
            {t('addressSelection.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
