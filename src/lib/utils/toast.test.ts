/**
 * Toast Utility Unit Tests
 * SOLID Principles: Single Responsibility (testing toast functionality)
 * Design Patterns: Mock Pattern for external dependencies
 * Dependencies: Jest, Sonner mocks
 */

import { toast } from './toast'
import { toast as sonnerToast } from 'sonner'
import type { ReactNode } from 'react'

// Mock sonner library
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    loading: jest.fn(),
    promise: jest.fn(),
    custom: jest.fn(),
    dismiss: jest.fn(),
  },
}))

describe('Toast Utility', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('success', () => {
    it('should call sonner success with default duration', () => {
      const message = 'Success message'
      toast.success(message)

      expect(sonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 4000,
      })
    })

    it('should call sonner success with custom duration', () => {
      const message = 'Success message'
      const options = { duration: 5000 }
      toast.success(message, options)

      expect(sonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 5000,
      })
    })

    it('should include id when provided', () => {
      const message = 'Success message'
      const options = { id: 'test-id' }
      toast.success(message, options)

      expect(sonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 4000,
        id: 'test-id',
      })
    })

    it('should include position when provided', () => {
      const message = 'Success message'
      const options = { position: 'top-right' as const }
      toast.success(message, options)

      expect(sonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 4000,
        position: 'top-right',
      })
    })

    it('should handle onDismiss callback', () => {
      const message = 'Success message'
      const onDismiss = jest.fn()
      const options = { onDismiss }
      toast.success(message, options)

      const calledOptions = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      expect(calledOptions.onDismiss).toBeDefined()

      // Execute the wrapped callback
      calledOptions.onDismiss()
      expect(onDismiss).toHaveBeenCalled()
    })

    it('should handle onAutoClose callback', () => {
      const message = 'Success message'
      const onAutoClose = jest.fn()
      const options = { onAutoClose }
      toast.success(message, options)

      const calledOptions = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      expect(calledOptions.onAutoClose).toBeDefined()

      // Execute the wrapped callback
      calledOptions.onAutoClose()
      expect(onAutoClose).toHaveBeenCalled()
    })

    it('should handle action button', () => {
      const message = 'Success message'
      const onClick = jest.fn()
      const options = {
        action: {
          label: 'Undo',
          onClick,
        },
      }
      toast.success(message, options)

      const calledOptions = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      expect(calledOptions.action).toEqual({
        label: 'Undo',
        onClick: expect.any(Function),
      })

      // Execute the wrapped onClick
      calledOptions.action.onClick()
      expect(onClick).toHaveBeenCalled()
    })

    it('should handle cancel button', () => {
      const message = 'Success message'
      const onClick = jest.fn()
      const options = {
        cancel: {
          label: 'Cancel',
          onClick,
        },
      }
      toast.success(message, options)

      const calledOptions = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      expect(calledOptions.cancel).toEqual({
        label: 'Cancel',
        onClick: expect.any(Function),
      })

      // Execute the wrapped onClick
      calledOptions.cancel.onClick()
      expect(onClick).toHaveBeenCalled()
    })

    it('should handle all options together', () => {
      const message = 'Success message'
      const onDismiss = jest.fn()
      const onAutoClose = jest.fn()
      const actionClick = jest.fn()
      const cancelClick = jest.fn()

      const options = {
        id: 'full-test',
        duration: 3000,
        position: 'bottom-left' as const,
        onDismiss,
        onAutoClose,
        action: {
          label: 'Action',
          onClick: actionClick,
        },
        cancel: {
          label: 'Cancel',
          onClick: cancelClick,
        },
      }

      toast.success(message, options)

      const calledOptions = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe('full-test')
      expect(calledOptions.duration).toBe(3000)
      expect(calledOptions.position).toBe('bottom-left')
      expect(calledOptions.onDismiss).toBeDefined()
      expect(calledOptions.onAutoClose).toBeDefined()
      expect(calledOptions.action.label).toBe('Action')
      expect(calledOptions.cancel.label).toBe('Cancel')
    })
  })

  describe('error', () => {
    it('should call sonner error with default duration of 6000', () => {
      const message = 'Error message'
      toast.error(message)

      expect(sonnerToast.error).toHaveBeenCalledWith(message, {
        duration: 6000,
      })
    })

    it('should handle all options for error toast', () => {
      const message = 'Error message'
      const onDismiss = jest.fn()
      const onAutoClose = jest.fn()
      const actionClick = jest.fn()
      const cancelClick = jest.fn()

      const options = {
        id: 123,
        duration: 8000,
        position: 'top-center' as const,
        onDismiss,
        onAutoClose,
        action: {
          label: 'Retry',
          onClick: actionClick,
        },
        cancel: {
          label: 'Dismiss',
          onClick: cancelClick,
        },
      }

      toast.error(message, options)

      const calledOptions = (sonnerToast.error as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe(123)
      expect(calledOptions.duration).toBe(8000)
      expect(calledOptions.position).toBe('top-center')

      // Test callbacks
      calledOptions.onDismiss()
      expect(onDismiss).toHaveBeenCalled()

      calledOptions.onAutoClose()
      expect(onAutoClose).toHaveBeenCalled()

      calledOptions.action.onClick()
      expect(actionClick).toHaveBeenCalled()

      calledOptions.cancel.onClick()
      expect(cancelClick).toHaveBeenCalled()
    })
  })

  describe('warning', () => {
    it('should call sonner warning with default duration of 5000', () => {
      const message = 'Warning message'
      toast.warning(message)

      expect(sonnerToast.warning).toHaveBeenCalledWith(message, {
        duration: 5000,
      })
    })

    it('should handle all options for warning toast', () => {
      const message = 'Warning message'
      const onDismiss = jest.fn()
      const onAutoClose = jest.fn()
      const actionClick = jest.fn()
      const cancelClick = jest.fn()

      const options = {
        id: 'warning-1',
        duration: 7000,
        position: 'bottom-right' as const,
        onDismiss,
        onAutoClose,
        action: {
          label: 'Fix',
          onClick: actionClick,
        },
        cancel: {
          label: 'Ignore',
          onClick: cancelClick,
        },
      }

      toast.warning(message, options)

      const calledOptions = (sonnerToast.warning as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe('warning-1')
      expect(calledOptions.duration).toBe(7000)
      expect(calledOptions.position).toBe('bottom-right')

      // Test all callbacks work
      calledOptions.onDismiss()
      calledOptions.onAutoClose()
      calledOptions.action.onClick()
      calledOptions.cancel.onClick()

      expect(onDismiss).toHaveBeenCalled()
      expect(onAutoClose).toHaveBeenCalled()
      expect(actionClick).toHaveBeenCalled()
      expect(cancelClick).toHaveBeenCalled()
    })
  })

  describe('info', () => {
    it('should call sonner info with default duration of 4000', () => {
      const message = 'Info message'
      toast.info(message)

      expect(sonnerToast.info).toHaveBeenCalledWith(message, {
        duration: 4000,
      })
    })

    it('should handle all options for info toast', () => {
      const message = 'Info message'
      const onDismiss = jest.fn()
      const onAutoClose = jest.fn()
      const actionClick = jest.fn()
      const cancelClick = jest.fn()

      const options = {
        id: 999,
        duration: 2000,
        position: 'top-left' as const,
        onDismiss,
        onAutoClose,
        action: {
          label: 'Learn More',
          onClick: actionClick,
        },
        cancel: {
          label: 'Close',
          onClick: cancelClick,
        },
      }

      toast.info(message, options)

      const calledOptions = (sonnerToast.info as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe(999)
      expect(calledOptions.duration).toBe(2000)
      expect(calledOptions.position).toBe('top-left')

      // Execute and verify all callbacks
      calledOptions.onDismiss()
      calledOptions.onAutoClose()
      calledOptions.action.onClick()
      calledOptions.cancel.onClick()

      expect(onDismiss).toHaveBeenCalled()
      expect(onAutoClose).toHaveBeenCalled()
      expect(actionClick).toHaveBeenCalled()
      expect(cancelClick).toHaveBeenCalled()
    })
  })

  describe('loading', () => {
    it('should call sonner loading with no duration', () => {
      const message = 'Loading...'
      toast.loading(message)

      expect(sonnerToast.loading).toHaveBeenCalledWith(message, {})
    })

    it('should handle id option', () => {
      const message = 'Loading...'
      const options = { id: 'load-1' }
      toast.loading(message, options)

      expect(sonnerToast.loading).toHaveBeenCalledWith(message, {
        id: 'load-1',
      })
    })

    it('should handle position option', () => {
      const message = 'Loading...'
      const options = { position: 'bottom-center' as const }
      toast.loading(message, options)

      expect(sonnerToast.loading).toHaveBeenCalledWith(message, {
        position: 'bottom-center',
      })
    })

    it('should handle onDismiss callback', () => {
      const message = 'Loading...'
      const onDismiss = jest.fn()
      const options = { onDismiss }
      toast.loading(message, options)

      const calledOptions = (sonnerToast.loading as jest.Mock).mock.calls[0][1]
      calledOptions.onDismiss()
      expect(onDismiss).toHaveBeenCalled()
    })

    it('should handle cancel button', () => {
      const message = 'Loading...'
      const onClick = jest.fn()
      const options = {
        cancel: {
          label: 'Stop',
          onClick,
        },
      }
      toast.loading(message, options)

      const calledOptions = (sonnerToast.loading as jest.Mock).mock.calls[0][1]
      expect(calledOptions.cancel.label).toBe('Stop')
      calledOptions.cancel.onClick()
      expect(onClick).toHaveBeenCalled()
    })

    it('should handle all options together', () => {
      const message = 'Processing...'
      const onDismiss = jest.fn()
      const cancelClick = jest.fn()

      const options = {
        id: 'loader',
        position: 'top-right' as const,
        onDismiss,
        cancel: {
          label: 'Cancel',
          onClick: cancelClick,
        },
      }

      toast.loading(message, options)

      const calledOptions = (sonnerToast.loading as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe('loader')
      expect(calledOptions.position).toBe('top-right')
      expect(calledOptions.onDismiss).toBeDefined()
      expect(calledOptions.cancel).toBeDefined()
    })
  })

  describe('promise', () => {
    it('should call sonner promise with basic messages', async () => {
      const promise = Promise.resolve('data')
      const messages = {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error!',
      }

      toast.promise(promise, messages)

      expect(sonnerToast.promise).toHaveBeenCalledWith(promise, messages)
    })

    it('should handle function messages', async () => {
      const promise = Promise.resolve({ id: 1, name: 'Test' })
      const messages = {
        loading: 'Loading...',
        success: (data: { id: number; name: string }) => `Created ${data.name}`,
        error: (err: unknown) => `Error: ${err}`,
      }

      toast.promise(promise, messages)

      expect(sonnerToast.promise).toHaveBeenCalledWith(promise, messages)
    })

    it('should handle options with id', () => {
      const promise = Promise.resolve('data')
      const messages = {
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      }
      const options = { id: 'promise-1' }

      toast.promise(promise, messages, options)

      expect(sonnerToast.promise).toHaveBeenCalledWith(promise, messages)
    })

    it('should handle options with position', () => {
      const promise = Promise.resolve('data')
      const messages = {
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      }
      const options = { position: 'top-center' as const }

      toast.promise(promise, messages, options)

      expect(sonnerToast.promise).toHaveBeenCalledWith(promise, messages)
    })

    it('should handle all options', async () => {
      const promise = Promise.reject(new Error('Test error'))
      const messages = {
        loading: 'Processing...',
        success: 'Completed!',
        error: (err: unknown) => String(err),
      }
      const options = {
        id: 'async-op',
        position: 'bottom-left' as const,
        duration: 5000, // This is ignored for promise
      }

      toast.promise(promise, messages, options)

      expect(sonnerToast.promise).toHaveBeenCalledWith(promise, messages)

      // Catch the rejection to prevent unhandled promise rejection
      await promise.catch(() => {})
    })
  })

  describe('custom', () => {
    it('should call sonner custom with ReactNode', () => {
      const jsx: ReactNode = 'Custom toast content'
      toast.custom(jsx)

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        duration: 4000,
      })

      // Verify the function returns the jsx as ReactElement
      const calledFunction = (sonnerToast.custom as jest.Mock).mock.calls[0][0]
      expect(calledFunction()).toBe(jsx)
    })

    it('should handle custom duration', () => {
      const jsx: ReactNode = 'Test content'
      const options = { duration: 10000 }
      toast.custom(jsx, options)

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        duration: 10000,
      })
    })

    it('should handle all options', () => {
      const jsx: ReactNode = null
      const onDismiss = jest.fn()
      const onAutoClose = jest.fn()

      const options = {
        id: 'custom-toast',
        duration: 3000,
        position: 'top-right' as const,
        onDismiss,
        onAutoClose,
      }

      toast.custom(jsx, options)

      const calledOptions = (sonnerToast.custom as jest.Mock).mock.calls[0][1]
      expect(calledOptions.id).toBe('custom-toast')
      expect(calledOptions.duration).toBe(3000)
      expect(calledOptions.position).toBe('top-right')

      // Test callbacks
      calledOptions.onDismiss()
      calledOptions.onAutoClose()

      expect(onDismiss).toHaveBeenCalled()
      expect(onAutoClose).toHaveBeenCalled()
    })

    it('should handle complex ReactNode', () => {
      const complexJsx: ReactNode = ['Text', 123, true, null, undefined]
      toast.custom(complexJsx)

      const calledFunction = (sonnerToast.custom as jest.Mock).mock.calls[0][0]
      expect(calledFunction()).toBe(complexJsx)
    })
  })

  describe('dismiss', () => {
    it('should call sonner dismiss with id', () => {
      const id = 'toast-123'
      toast.dismiss(id)

      expect(sonnerToast.dismiss).toHaveBeenCalledWith(id)
    })

    it('should call sonner dismiss with numeric id', () => {
      const id = 456
      toast.dismiss(id)

      expect(sonnerToast.dismiss).toHaveBeenCalledWith(456)
    })

    it('should call sonner dismiss without arguments when no id provided', () => {
      toast.dismiss()

      expect(sonnerToast.dismiss).toHaveBeenCalledWith()
    })

    it('should handle undefined id explicitly', () => {
      toast.dismiss(undefined)

      expect(sonnerToast.dismiss).toHaveBeenCalledWith()
    })
  })

  describe('ToastFacade instance', () => {
    it('should export a singleton instance', () => {
      expect(toast).toBeDefined()
      expect(toast.success).toBeDefined()
      expect(toast.error).toBeDefined()
      expect(toast.warning).toBeDefined()
      expect(toast.info).toBeDefined()
      expect(toast.loading).toBeDefined()
      expect(toast.promise).toBeDefined()
      expect(toast.custom).toBeDefined()
      expect(toast.dismiss).toBeDefined()
    })
  })
})
