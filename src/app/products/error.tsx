/**
 * Products Page Error Boundary
 * SOLID Principles: Single Responsibility - Error handling UI
 * Design Patterns: Error Boundary Pattern - Next.js App Router error
 * Dependencies: React, Next.js error types
 */

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/schadcn'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Products page error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>

        <p className="text-muted-foreground mb-6">
          We&apos;re having trouble loading the products. Please try again.
        </p>

        <Button onClick={() => reset()} variant="default" className="gap-2">
          Try again
        </Button>
      </div>
    </div>
  )
}
