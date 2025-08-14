/**
 * Impersonation Banner Molecule - Shows when admin is viewing as customer
 * SOLID Principles: SRP - Single responsibility for displaying impersonation status
 * Design Patterns: Atomic Design - Molecule
 * Dependencies: shadcn Alert, Badge components
 */

'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/schadcn/alert'
import { Badge } from '@/components/ui/schadcn/badge'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import type { ActiveCustomerContext } from '@/lib/types/customer.types'

export function ImpersonationBanner() {
  const { t } = useSafeTranslation('common')
  const [context, setContext] = useState<ActiveCustomerContext | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for impersonation status
    fetch('/api/customer/active')
      .then(res => res.json())
      .then((data: ActiveCustomerContext) => {
        if (data.isImpersonating) {
          setContext(data)

          // Fetch customer title if we have an ID
          if (data.customerId) {
            fetch('/api/customers/titles', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ customerIds: [data.customerId] }),
            })
              .then(res => res.json())
              .then(titlesData => {
                const customer = titlesData.customers?.[0]
                if (customer) {
                  setContext(prev =>
                    prev
                      ? {
                          ...prev,
                          customerTitle:
                            customer.customer_title ||
                            customer.customer_nickname ||
                            null,
                        }
                      : null
                  )
                }
              })
              .catch(console.error)
          }
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Failed to check impersonation status:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading || !context?.isImpersonating) {
    return null
  }

  return (
    <Alert
      className={cn(
        'rounded-none border-x-0 border-t-0 border-b',
        'bg-destructive/10 border-destructive/20'
      )}
    >
      <AlertDescription className="flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="gap-1">
            <User className="h-3 w-3" />
            {t('navbar.adminMode')}
          </Badge>
          <span className="text-sm">
            {t('navbar.viewingAs')}{' '}
            <strong>
              {context.customerTitle || context.customerId || 'Unknown'}
            </strong>
          </span>
        </div>
      </AlertDescription>
    </Alert>
  )
}
