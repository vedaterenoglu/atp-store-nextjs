/**
 * Admin Dashboard - Authenticate User Page
 * SOLID Principles: SRP - Single responsibility for user authentication
 * Design Patterns: Form Component Pattern, State Management Pattern
 * Dependencies: React Hook Form, Customer API, User Search API
 */

'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Loader2,
  Search,
  UserCheck,
  CheckCircle,
  AlertCircle,
  User,
  Shield,
  Users,
} from 'lucide-react'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/schadcn/alert'
import { Badge } from '@/components/ui/schadcn/badge'
import { Checkbox } from '@/components/ui/schadcn/checkbox'

// Types
interface Customer {
  customer_id: string
  customer_title: string
  customer_nickname: string
}

interface FoundUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: 'admin' | 'customer' | null
  customerIds: string[]
  createdAt: string
}

// Form schemas
const searchFormSchema = z.object({
  email: z.string().email('Invalid email address'),
})

type SearchForm = z.infer<typeof searchFormSchema>

export default function AuthenticateUserPage() {
  const [isSearching, setIsSearching] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authSuccess, setAuthSuccess] = useState(false)
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true)
  const [customerFilter, setCustomerFilter] = useState('')

  // Search form
  const searchForm = useForm<SearchForm>({
    resolver: zodResolver(searchFormSchema),
  })

  // Load customers on mount
  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch('/api/admin/customers')
        if (!response.ok) {
          throw new Error('Failed to load customers')
        }
        const data = await response.json()
        setCustomers(data.customers || [])
      } catch (error) {
        console.error('Error loading customers:', error)
        setAuthError('Failed to load customer list')
      } finally {
        setIsLoadingCustomers(false)
      }
    }
    loadCustomers()
  }, [])

  // Search for user
  const onSearch = async (data: SearchForm) => {
    console.log('Searching for user:', data.email)
    setIsSearching(true)
    setSearchError(null)
    setFoundUser(null)
    setAuthSuccess(false)
    setSelectedCustomers([])

    try {
      const response = await fetch(
        `/api/admin/users/search?email=${encodeURIComponent(data.email)}`
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to search user')
      }

      if (result.user) {
        setFoundUser(result.user)
        // Only pre-select customer access for non-admin users
        if (result.user.role !== 'admin') {
          setSelectedCustomers(result.user.customerIds || [])
        } else {
          setSelectedCustomers([])
        }
      } else {
        setSearchError('No user found with this email address')
      }
    } catch (err) {
      console.error('Error searching user:', err)
      setSearchError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsSearching(false)
    }
  }

  // Authenticate user with selected customers
  const onAuthenticate = async () => {
    if (!foundUser || selectedCustomers.length === 0) return

    console.log('Authenticating user with customers:', selectedCustomers)
    setIsAuthenticating(true)
    setAuthError(null)
    setAuthSuccess(false)

    try {
      const response = await fetch('/api/admin/users/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: foundUser.id,
          customerIds: selectedCustomers,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to authenticate user')
      }

      setAuthSuccess(true)
      // Update found user with new customer IDs
      setFoundUser({
        ...foundUser,
        customerIds: selectedCustomers,
      })

      // Clear success message after 5 seconds
      setTimeout(() => setAuthSuccess(false), 5000)
    } catch (err) {
      console.error('Error authenticating user:', err)
      setAuthError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsAuthenticating(false)
    }
  }

  // Toggle customer selection
  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.customer_title.toLowerCase().includes(customerFilter.toLowerCase()) ||
    customer.customer_id.toLowerCase().includes(customerFilter.toLowerCase())
  )

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Authenticate User</h1>
        <p className="text-muted-foreground mt-2">
          Search for users and link them to customer accounts
        </p>
      </div>

      {/* Search Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search User
          </CardTitle>
          <CardDescription>
            Enter the email address of the user you want to authenticate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={searchForm.handleSubmit(onSearch)} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="user@example.com"
                  {...searchForm.register('email')}
                  disabled={isSearching}
                />
                {searchForm.formState.errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {searchForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={isSearching}>
                {isSearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </form>

          {searchError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* User Details Card */}
      {foundUser && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{foundUser.email}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="font-medium">
                  {foundUser.firstName || foundUser.lastName
                    ? `${foundUser.firstName || ''} ${foundUser.lastName || ''}`.trim()
                    : 'Not set'}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <div className="mt-1">
                  {foundUser.role === 'admin' ? (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Shield className="mr-1 h-3 w-3" />
                      Admin
                    </Badge>
                  ) : foundUser.role === 'customer' ? (
                    <Badge className="bg-blue-100 text-blue-800">
                      <Users className="mr-1 h-3 w-3" />
                      Customer
                    </Badge>
                  ) : (
                    <Badge variant="secondary">No role</Badge>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Created</Label>
                <p className="font-medium">
                  {new Date(foundUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {foundUser.customerIds.length > 0 && (
              <div>
                <Label className="text-muted-foreground">
                  Current Customer Access ({foundUser.customerIds.length})
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {foundUser.customerIds.map(id => {
                    const customer = customers.find(c => c.customer_id === id)
                    return (
                      <Badge key={id} variant="outline">
                        {customer?.customer_title || id}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Admin User Warning */}
      {foundUser && foundUser.role === 'admin' && (
        <Alert className="mb-6 border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 dark:text-amber-500">
            Admin User Detected
          </AlertTitle>
          <AlertDescription className="text-amber-800 dark:text-amber-400">
            You cannot edit admin users! Admin accounts have full system access and don't need customer associations.
            Customer IDs are only for users with 'customer' role.
          </AlertDescription>
        </Alert>
      )}

      {/* Selected Customers Card */}
      {foundUser && foundUser.role !== 'admin' && selectedCustomers.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Selected Customers ({selectedCustomers.length})
            </CardTitle>
            <CardDescription>
              These customers will be linked to the user
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedCustomers.map(customerId => {
                const customer = customers.find(c => c.customer_id === customerId)
                return (
                  <Badge
                    key={customerId}
                    variant="secondary"
                    className="px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => toggleCustomer(customerId)}
                  >
                    <span>{customer?.customer_title || customerId}</span>
                    <span className="text-xs opacity-60">×</span>
                  </Badge>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Click on any customer badge to remove it from selection
            </p>
          </CardContent>
        </Card>
      )}

      {/* Customer Selection Card - Only for non-admin users */}
      {foundUser && foundUser.role !== 'admin' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Link to Customers
            </CardTitle>
            <CardDescription>
              Select which customer accounts this user should have access to
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingCustomers ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : customers.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  No customers available. Please ensure customers exist in the system.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                {/* Customer Search Box */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search customers by name or ID..."
                      value={customerFilter}
                      onChange={(e) => setCustomerFilter(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {customerFilter && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Showing {filteredCustomers.length} of {customers.length} customers
                    </p>
                  )}
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto border rounded-lg p-4">
                  {filteredCustomers.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No customers found matching "{customerFilter}"
                    </div>
                  ) : (
                    filteredCustomers.map(customer => (
                    <div
                      key={customer.customer_id}
                      className="flex items-center space-x-3 py-2 px-3 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => toggleCustomer(customer.customer_id)}
                    >
                      <Checkbox
                        checked={selectedCustomers.includes(customer.customer_id)}
                        onCheckedChange={() => toggleCustomer(customer.customer_id)}
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      />
                      <Label className="flex-1 cursor-pointer">
                        <div className="font-medium">{customer.customer_title}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {customer.customer_id}
                        </div>
                      </Label>
                    </div>
                  )))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {selectedCustomers.length} customer(s) selected
                  </p>
                  <Button
                    onClick={onAuthenticate}
                    disabled={
                      isAuthenticating || selectedCustomers.length === 0
                    }
                  >
                    {isAuthenticating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Update Access
                      </>
                    )}
                  </Button>
                </div>

                {authSuccess && (
                  <Alert className="mt-4 border-green-500 bg-green-50 dark:bg-green-950/20">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">Success!</AlertTitle>
                    <AlertDescription className="text-green-600">
                      User access has been updated successfully.
                    </AlertDescription>
                  </Alert>
                )}

                {authError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}