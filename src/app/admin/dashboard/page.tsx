/**
 * Admin Dashboard - Create Customer Account Page
 * SOLID Principles: SRP - Single responsibility for customer creation
 * Design Patterns: Form Component Pattern
 * Dependencies: React Hook Form, Clerk API
 */

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, UserPlus, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/schadcn/button'
import { Input } from '@/components/ui/schadcn/input'
import { Label } from '@/components/ui/schadcn/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn/card'
import { Alert, AlertDescription } from '@/components/ui/schadcn/alert'

// Form validation schema
const createCustomerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type CreateCustomerForm = z.infer<typeof createCustomerSchema>

export default function CreateCustomerPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CreateCustomerForm>({
    resolver: zodResolver(createCustomerSchema),
  })

  // Log form state
  const watchedValues = watch()
  console.log('Form values:', watchedValues)
  console.log('Form validation errors:', errors)

  const onSubmit = async (data: CreateCustomerForm) => {
    console.log('=== FORM SUBMISSION STARTED ===')
    console.log('Form data received:', data)
    console.log('Email:', data.email)
    console.log('Password:', data.password)
    
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      console.log('Calling API...')
      const response = await fetch('/api/admin/users/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create customer account')
      }

      setSuccess(true)
      reset()

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Error in form submission:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Customer Account</h1>
        <p className="text-muted-foreground mt-2">
          Create a new customer account in Clerk authentication system
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            New Customer Account
          </CardTitle>
          <CardDescription>
            Enter the customer details below. The account will be created with
            customer role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              console.log('=== FORM onSubmit EVENT TRIGGERED ===')
              console.log('Event:', e)
              console.log('Current form values:', watchedValues)
              console.log('Current form errors:', errors)
              
              const submitHandler = handleSubmit(
                (data) => {
                  console.log('handleSubmit SUCCESS callback called with:', data)
                  onSubmit(data)
                },
                (errors) => {
                  console.log('handleSubmit ERROR callback called with:', errors)
                  console.error('Form validation failed:', errors)
                }
              )
              
              console.log('Calling handleSubmit...')
              return submitHandler(e)
            }}
            className="space-y-4"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Success Alert */}
            {success && (
              <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Customer account created successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Customer Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">Important Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • The account will be created with &apos;customer&apos; role
            automatically
          </p>
          <p>
            • User will be able to sign in immediately with these credentials
          </p>
          <p>
            • Customer access to specific companies must be configured
            separately
          </p>
          <p>
            • Use the &apos;Authenticate User&apos; section to link customers to
            companies
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
