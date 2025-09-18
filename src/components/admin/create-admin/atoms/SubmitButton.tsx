/**
 * SubmitButton Atom - Reusable submit button with loading state
 * SOLID Principles: SRP - Single responsibility for button submission UI
 * Design Patterns: Presentational Component Pattern
 * Dependencies: shadcn/ui Button, lucide-react icons
 */

import { Button } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SubmitButtonProps } from '../types/admin.types'

export default function SubmitButton({
  isLoading,
  loadingText,
  children,
  disabled,
  onClick,
  type = 'submit',
  className,
  variant = 'default',
}: SubmitButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn('min-w-[100px]', className)}
      variant={variant}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || 'Loading...'}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
