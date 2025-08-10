# Toast Wrapper Usage Guide

## Overview

The toast wrapper utility provides a consistent and simplified API for showing notifications throughout the application.

## Installation

The wrapper uses `sonner` as the underlying toast library. Ensure it's installed:

```bash
npm install sonner
```

## Basic Usage

### Import the toast wrapper

```typescript
import { toast } from '@/lib/utils/toast-wrapper'
```

### Success Toast

```typescript
// Simple success message
toast.success('User created successfully')

// With title and description
toast.success('Success', {
  description: 'User has been created and email sent',
  duration: 5000,
})
```

### Error Toast

```typescript
// Simple error
toast.error('Failed to save data')

// With details
toast.error('Error', {
  description: 'Network connection failed. Please try again.',
})
```

### Info Toast

```typescript
toast.info('New update available')
```

### Warning Toast

```typescript
toast.warning('Your session will expire in 5 minutes')
```

### Promise Toast

```typescript
// Automatically shows loading, success, or error based on promise
const saveData = async () => {
  return fetch('/api/save', { method: 'POST' })
}

toast.promise(saveData(), {
  loading: 'Saving data...',
  success: 'Data saved successfully',
  error: 'Failed to save data',
})
```

## Helper Functions

### API Response Toast

```typescript
import { showApiResponseToast } from '@/lib/utils/toast-wrapper'

// After API call
const response = await fetch('/api/users')
const data = await response.json()

showApiResponseToast(
  { ok: response.ok, message: data.message, error: data.error },
  'User fetched successfully',
  'Failed to fetch user'
)
```

### Validation Toast

```typescript
import { showValidationToast } from '@/lib/utils/toast-wrapper'

const errors = {
  email: ['Email is required', 'Invalid email format'],
  password: ['Password must be at least 8 characters'],
}

showValidationToast(errors)
```

### With Toast Wrapper

```typescript
import { withToast } from '@/lib/utils/toast-wrapper'

// Wrap async operations with automatic toast feedback
const result = await withToast(
  async () => {
    const response = await fetch('/api/users')
    if (!response.ok) throw new Error('Failed')
    return response.json()
  },
  {
    loading: 'Fetching users...',
    success: data => `Loaded ${data.length} users`,
    error: err => `Error: ${err.message}`,
  }
)
```

## Advanced Options

### Custom Duration

```typescript
toast.success('Message sent', {
  duration: 10000, // 10 seconds
})
```

### With Action Button

```typescript
toast.error('Failed to delete', {
  action: {
    label: 'Retry',
    onClick: () => handleRetry(),
  },
})
```

### Dismissible

```typescript
const toastId = toast.info('Processing...', {
  duration: Infinity,
})

// Later dismiss it
toast.dismiss(toastId)
```

### Custom Component

```typescript
toast.custom(
  <div className="flex items-center gap-2">
    <Spinner />
    <span>Custom loading message</span>
  </div>
)
```

## Best Practices

1. **Use consistent messages**: Keep success/error messages consistent across the app
2. **Provide context**: Include relevant details in descriptions
3. **Set appropriate durations**: Errors might need longer duration than success
4. **Use promise toast for async operations**: Automatically handles loading states
5. **Don't spam toasts**: Avoid showing too many toasts at once

## Migration from Direct Toast Usage

Before:

```typescript
import { toast } from 'sonner'
toast('Hello')
```

After:

```typescript
import { toast } from '@/lib/utils/toast-wrapper'
toast.info('Hello')
```

## TypeScript Support

The wrapper is fully typed with TypeScript, providing autocomplete and type safety:

```typescript
interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  // ... other sonner options
}
```
