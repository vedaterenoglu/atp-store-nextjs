/**
 * Toast Wrapper Utility - Consistent notification system
 * SOLID Principles: SRP - Single responsibility for toast notifications
 * Design Patterns: Facade Pattern - Simplifies toast API
 * Dependencies: sonner (toast library)
 */

import { toast as sonnerToast } from 'sonner'
import type { ExternalToast } from 'sonner'

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading'

export interface ToastOptions extends ExternalToast {
  title?: string
  description?: string
}

/**
 * Toast wrapper utility for consistent notifications
 */
export const toast = {
  /**
   * Show a success toast
   */
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(options?.title || message, {
      description: options?.description,
      ...options,
    })
  },

  /**
   * Show an error toast
   */
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(options?.title || message, {
      description: options?.description || message,
      ...options,
    })
  },

  /**
   * Show an info toast
   */
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(options?.title || message, {
      description: options?.description,
      ...options,
    })
  },

  /**
   * Show a warning toast
   */
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(options?.title || message, {
      description: options?.description,
      ...options,
    })
  },

  /**
   * Show a loading toast with promise
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading?: string
      success?: string | ((data: T) => string)
      error?: string | ((error: unknown) => string)
    },
    options?: ToastOptions
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Error occurred',
      ...options,
    })
  },

  /**
   * Show a custom toast
   */
  custom: (component: React.ReactNode, options?: ToastOptions) => {
    return sonnerToast.custom(() => component as React.ReactElement, options)
  },

  /**
   * Dismiss a toast or all toasts
   */
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id)
  },
}

/**
 * Helper function to show API response toasts
 */
export const showApiResponseToast = (
  response: { ok: boolean; message?: string; error?: string },
  successMessage = 'Operation successful',
  errorMessage = 'Operation failed'
) => {
  if (response.ok) {
    toast.success(response.message || successMessage)
  } else {
    toast.error(response.error || errorMessage)
  }
}

/**
 * Helper function to show form validation toasts
 */
export const showValidationToast = (errors: Record<string, string[]>) => {
  const errorMessages = Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('\n')

  toast.error('Validation failed', {
    description: errorMessages,
  })
}

/**
 * Helper function for async operations with toast feedback
 */
export const withToast = async <T>(
  asyncFn: () => Promise<T>,
  messages?: {
    loading?: string
    success?: string | ((data: T) => string)
    error?: string | ((error: unknown) => string)
  }
): Promise<T | null> => {
  try {
    const loadingToast = toast.info(messages?.loading || 'Processing...', {
      duration: Infinity,
    })

    const result = await asyncFn()

    toast.dismiss(loadingToast)

    const successMsg =
      typeof messages?.success === 'function'
        ? messages.success(result)
        : messages?.success || 'Success!'

    toast.success(successMsg)

    return result
  } catch (error) {
    const errorMsg =
      typeof messages?.error === 'function'
        ? messages.error(error)
        : messages?.error || 'An error occurred'

    toast.error(errorMsg)

    return null
  }
}
