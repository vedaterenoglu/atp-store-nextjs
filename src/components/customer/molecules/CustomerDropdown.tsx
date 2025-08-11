/**
 * Customer Dropdown Molecule - Customer account selector
 * SOLID Principles: SRP - Single responsibility for customer selection
 * Design Patterns: Atomic Design - Molecule
 * Dependencies: shadcn Select, CustomerBadge atom
 */

'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/schadcn/select'
import { CustomerBadge } from '../atoms/CustomerBadge'
import { cn } from '@/lib/utils'
import type { CustomerAccount } from '@/lib/types/customer.types'

interface CustomerDropdownProps {
  customers: CustomerAccount[]
  activeCustomerId: string | null
  onSelect: (customerId: string) => void
  isLoading?: boolean
  className?: string
  isAdmin?: boolean
  onSearchClick?: () => void
}

export function CustomerDropdown({
  customers,
  activeCustomerId,
  onSelect,
  isLoading = false,
  className,
  isAdmin = false,
  onSearchClick,
}: CustomerDropdownProps) {
  const [open, setOpen] = useState(false)

  const activeCustomer = customers.find(c => c.customer_id === activeCustomerId)

  const handleSelect = (value: string) => {
    if (value === 'search-customers' && onSearchClick) {
      onSearchClick()
      setOpen(false)
    } else {
      onSelect(value)
      setOpen(false)
    }
  }

  // For non-admin users with no customers, hide the dropdown
  if (!isAdmin && customers.length === 0) {
    return null
  }

  // Single customer - no dropdown needed (but admin always gets dropdown)
  if (!isAdmin && customers.length === 1) {
    const customer = customers[0]
    if (!customer) return null
    return (
      <CustomerBadge
        customerId={customer.customer_id}
        customerTitle={customer.customer_title || customer.customer_nickname}
        className={className}
      />
    )
  }

  return (
    <Select
      value={activeCustomerId ?? undefined}
      onValueChange={handleSelect}
      open={open}
      onOpenChange={setOpen}
      disabled={isLoading}
    >
      <SelectTrigger className={cn('w-[250px]', className)}>
        <SelectValue placeholder={isAdmin ? "No customer selected" : "Select customer account"}>
          {activeCustomer && (
            <span className="truncate">
              {activeCustomer.customer_title ||
                activeCustomer.customer_nickname ||
                activeCustomer.customer_id}
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {customers.map(customer => (
          <SelectItem
            key={customer.customer_id}
            value={customer.customer_id}
            className="cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {customer.customer_title ||
                  customer.customer_nickname ||
                  'Unnamed'}
              </span>
              <span className="text-xs text-muted-foreground">
                {customer.customer_id}
              </span>
            </div>
          </SelectItem>
        ))}
        {isAdmin && (
          <>
            {customers.length > 0 && (
              <div className="my-1 h-px bg-border" />
            )}
            <SelectItem
              value="search-customers"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <span>Search Customers...</span>
              </div>
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
