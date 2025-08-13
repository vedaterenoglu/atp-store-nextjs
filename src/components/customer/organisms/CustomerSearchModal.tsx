/**
 * Customer Search Modal Organism - Admin customer selector with search
 * SOLID Principles: SRP - Single responsibility for customer search and selection
 * Design Patterns: Atomic Design - Organism
 * Dependencies: shadcn Dialog, Command components
 */

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/schadcn/dialog'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/schadcn/command'
import { Badge } from '@/components/ui/schadcn/badge'
import { cn } from '@/lib/utils'
import type { CustomerAccount } from '@/lib/types/customer.types'

interface CustomerSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customers: CustomerAccount[]
  onSelect: (customerId: string) => void
  isLoading?: boolean
  isAdmin?: boolean
  showWelcome?: boolean
}

export function CustomerSearchModal({
  open,
  onOpenChange,
  customers,
  onSelect,
  isLoading = false,
  isAdmin = false,
  showWelcome = false,
}: CustomerSearchModalProps) {
  const [search, setSearch] = useState('')

  // Manual filtering with substring matching (not fuzzy)
  const filteredCustomers = customers.filter(customer => {
    if (!search) return true

    const searchLower = search.toLowerCase()
    const customerId = customer.customer_id.toLowerCase()
    const customerTitle = (
      customer.customer_title ||
      customer.customer_nickname ||
      ''
    ).toLowerCase()

    // Check if search term appears as a substring in ID or title
    return (
      customerId.includes(searchLower) || customerTitle.includes(searchLower)
    )
  })

  const handleSelect = (customerId: string) => {
    onSelect(customerId)
    onOpenChange(false)
    setSearch('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-w-2xl')}>
        <DialogHeader>
          <DialogTitle>
            {showWelcome ? 'Welcome Back!' : 'Select Customer Account'}
          </DialogTitle>
          {showWelcome && (
            <div className="space-y-1 mt-1">
              <p className="text-sm text-muted-foreground">
                Please select which customer account you&apos;d like to work
                with today.
              </p>
            </div>
          )}
          {isAdmin && (
            <Badge variant="destructive" className="w-fit mt-2">
              Admin Mode - Viewing as Customer
            </Badge>
          )}
        </DialogHeader>

        <Command className="rounded-lg border" shouldFilter={false}>
          <CommandInput
            placeholder="Search by name or ID..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading ? (
              <div className="py-6 text-center text-sm">
                Loading customers...
              </div>
            ) : filteredCustomers.length === 0 ? (
              <CommandEmpty>No customers found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredCustomers.map(customer => (
                  <CommandItem
                    key={customer.customer_id}
                    value={customer.customer_id}
                    onSelect={() => handleSelect(customer.customer_id)}
                    className="cursor-pointer"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {customer.customer_title ||
                            customer.customer_nickname ||
                            'Unnamed Customer'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ID: {customer.customer_id}
                        </span>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
