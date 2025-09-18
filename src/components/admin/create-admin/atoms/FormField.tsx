/**
 * FormField Atom - Reusable form field component with label and error display
 * SOLID Principles: SRP - Single responsibility for rendering form fields
 * Design Patterns: Controlled Component Pattern
 * Dependencies: shadcn/ui Input, Label
 */

import { Input, Label } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { FormFieldProps } from '../types/admin.types'

export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  required,
  disabled,
  register,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={cn(error && 'text-destructive')}>
        {label}
        {required && (
          <span className="ml-1 text-destructive" aria-label="required">
            *
          </span>
        )}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(error && 'border-destructive')}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...register}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
