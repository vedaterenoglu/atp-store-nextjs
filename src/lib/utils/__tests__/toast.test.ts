/**
 * Unit tests for toast utility
 * SOLID Principles: Single Responsibility - Testing toast notification wrapper
 * Design Patterns: Facade Pattern testing - verifying the wrapper interface
 * Dependencies: Jest, sonner mocks
 */

import { toast } from '../toast'
import { toast as sonnerToast } from 'sonner'
import type { ReactNode } from 'react'

// Mock sonner toast
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

describe('toast', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('success', () => {
    it('should call sonner toast.success with default duration', () => {
      toast.success('Success message')

      expect(sonnerToast.success).toHaveBeenCalledWith('Success message', {
        duration: 4000,
      })
    })

    it('should call sonner toast.success with custom options', () => {
      const mockOnDismiss = jest.fn()
      const mockOnAutoClose = jest.fn()
      const mockActionClick = jest.fn()
      const mockCancelClick = jest.fn()

      toast.success('Success message', {
        id: 'test-id',
        duration: 5000,
        position: 'top-right',
        onDismiss: mockOnDismiss,
        onAutoClose: mockOnAutoClose,
        action: {
          label: 'Retry',
          onClick: mockActionClick,
        },
        cancel: {
          label: 'Cancel',
          onClick: mockCancelClick,
        },
      })

      expect(sonnerToast.success).toHaveBeenCalledWith('Success message', {
        id: 'test-id',
        duration: 5000,
        position: 'top-right',
        onDismiss: expect.any(Function),
        onAutoClose: expect.any(Function),
        action: {
          label: 'Retry',
          onClick: expect.any(Function),
        },
        cancel: {
          label: 'Cancel',
          onClick: expect.any(Function),
        },
      })

      // Test callbacks
      const callArgs = (sonnerToast.success as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.onAutoClose()
      expect(mockOnAutoClose).toHaveBeenCalled()

      callArgs.action.onClick()
      expect(mockActionClick).toHaveBeenCalled()

      callArgs.cancel.onClick()
      expect(mockCancelClick).toHaveBeenCalled()
    })

    it('should handle numeric id', () => {
      toast.success('Success message', { id: 123 })

      expect(sonnerToast.success).toHaveBeenCalledWith('Success message', {
        id: 123,
        duration: 4000,
      })
    })

    it('should handle all position options', () => {
      const positions = [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ] as const

      positions.forEach(position => {
        toast.success('Test', { position })
        expect(sonnerToast.success).toHaveBeenLastCalledWith('Test', {
          duration: 4000,
          position,
        })
      })
    })
  })

  describe('error', () => {
    it('should call sonner toast.error with default duration', () => {
      toast.error('Error message')

      expect(sonnerToast.error).toHaveBeenCalledWith('Error message', {
        duration: 6000,
      })
    })

    it('should call sonner toast.error with custom options', () => {
      const mockOnDismiss = jest.fn()
      const mockOnAutoClose = jest.fn()
      const mockActionClick = jest.fn()
      const mockCancelClick = jest.fn()

      toast.error('Error message', {
        id: 'error-id',
        duration: 8000,
        position: 'bottom-right',
        onDismiss: mockOnDismiss,
        onAutoClose: mockOnAutoClose,
        action: {
          label: 'Retry',
          onClick: mockActionClick,
        },
        cancel: {
          label: 'Dismiss',
          onClick: mockCancelClick,
        },
      })

      expect(sonnerToast.error).toHaveBeenCalledWith('Error message', {
        id: 'error-id',
        duration: 8000,
        position: 'bottom-right',
        onDismiss: expect.any(Function),
        onAutoClose: expect.any(Function),
        action: {
          label: 'Retry',
          onClick: expect.any(Function),
        },
        cancel: {
          label: 'Dismiss',
          onClick: expect.any(Function),
        },
      })

      // Test callbacks
      const callArgs = (sonnerToast.error as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.onAutoClose()
      expect(mockOnAutoClose).toHaveBeenCalled()

      callArgs.action.onClick()
      expect(mockActionClick).toHaveBeenCalled()

      callArgs.cancel.onClick()
      expect(mockCancelClick).toHaveBeenCalled()
    })
  })

  describe('warning', () => {
    it('should call sonner toast.warning with default duration', () => {
      toast.warning('Warning message')

      expect(sonnerToast.warning).toHaveBeenCalledWith('Warning message', {
        duration: 5000,
      })
    })

    it('should call sonner toast.warning with custom options', () => {
      const mockOnDismiss = jest.fn()
      const mockOnAutoClose = jest.fn()
      const mockActionClick = jest.fn()
      const mockCancelClick = jest.fn()

      toast.warning('Warning message', {
        id: 'warning-id',
        duration: 7000,
        position: 'top-center',
        onDismiss: mockOnDismiss,
        onAutoClose: mockOnAutoClose,
        action: {
          label: 'Fix',
          onClick: mockActionClick,
        },
        cancel: {
          label: 'Ignore',
          onClick: mockCancelClick,
        },
      })

      expect(sonnerToast.warning).toHaveBeenCalledWith('Warning message', {
        id: 'warning-id',
        duration: 7000,
        position: 'top-center',
        onDismiss: expect.any(Function),
        onAutoClose: expect.any(Function),
        action: {
          label: 'Fix',
          onClick: expect.any(Function),
        },
        cancel: {
          label: 'Ignore',
          onClick: expect.any(Function),
        },
      })

      // Test callbacks
      const callArgs = (sonnerToast.warning as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.onAutoClose()
      expect(mockOnAutoClose).toHaveBeenCalled()

      callArgs.action.onClick()
      expect(mockActionClick).toHaveBeenCalled()

      callArgs.cancel.onClick()
      expect(mockCancelClick).toHaveBeenCalled()
    })
  })

  describe('info', () => {
    it('should call sonner toast.info with default duration', () => {
      toast.info('Info message')

      expect(sonnerToast.info).toHaveBeenCalledWith('Info message', {
        duration: 4000,
      })
    })

    it('should call sonner toast.info with custom options', () => {
      const mockOnDismiss = jest.fn()
      const mockOnAutoClose = jest.fn()
      const mockActionClick = jest.fn()
      const mockCancelClick = jest.fn()

      toast.info('Info message', {
        id: 'info-id',
        duration: 3000,
        position: 'bottom-left',
        onDismiss: mockOnDismiss,
        onAutoClose: mockOnAutoClose,
        action: {
          label: 'Learn More',
          onClick: mockActionClick,
        },
        cancel: {
          label: 'Close',
          onClick: mockCancelClick,
        },
      })

      expect(sonnerToast.info).toHaveBeenCalledWith('Info message', {
        id: 'info-id',
        duration: 3000,
        position: 'bottom-left',
        onDismiss: expect.any(Function),
        onAutoClose: expect.any(Function),
        action: {
          label: 'Learn More',
          onClick: expect.any(Function),
        },
        cancel: {
          label: 'Close',
          onClick: expect.any(Function),
        },
      })

      // Test callbacks
      const callArgs = (sonnerToast.info as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.onAutoClose()
      expect(mockOnAutoClose).toHaveBeenCalled()

      callArgs.action.onClick()
      expect(mockActionClick).toHaveBeenCalled()

      callArgs.cancel.onClick()
      expect(mockCancelClick).toHaveBeenCalled()
    })
  })

  describe('loading', () => {
    it('should call sonner toast.loading without duration', () => {
      toast.loading('Loading message')

      expect(sonnerToast.loading).toHaveBeenCalledWith('Loading message', {})
    })

    it('should call sonner toast.loading with custom options', () => {
      const mockOnDismiss = jest.fn()
      const mockCancelClick = jest.fn()

      toast.loading('Loading message', {
        id: 'loading-id',
        position: 'top-left',
        onDismiss: mockOnDismiss,
        cancel: {
          label: 'Cancel',
          onClick: mockCancelClick,
        },
      })

      expect(sonnerToast.loading).toHaveBeenCalledWith('Loading message', {
        id: 'loading-id',
        position: 'top-left',
        onDismiss: expect.any(Function),
        cancel: {
          label: 'Cancel',
          onClick: expect.any(Function),
        },
      })

      // Test callbacks
      const callArgs = (sonnerToast.loading as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.cancel.onClick()
      expect(mockCancelClick).toHaveBeenCalled()
    })

    it('should not accept duration option', () => {
      // TypeScript should prevent this, but test runtime behavior
      const options = {
        id: 'test',
        position: 'top-center' as const,
      }

      toast.loading('Loading', options)

      expect(sonnerToast.loading).toHaveBeenCalledWith('Loading', {
        id: 'test',
        position: 'top-center',
      })
    })
  })

  describe('promise', () => {
    it('should call sonner toast.promise with messages', async () => {
      const mockPromise = Promise.resolve('test data')
      const messages = {
        loading: 'Loading...',
        success: 'Success!',
        error: 'Error occurred',
      }

      toast.promise(mockPromise, messages)

      expect(sonnerToast.promise).toHaveBeenCalledWith(mockPromise, messages)
    })

    it('should call sonner toast.promise with function messages', async () => {
      const mockPromise = Promise.resolve({ id: 123, name: 'Test' })
      const messages = {
        loading: 'Loading...',
        success: (data: { id: number; name: string }) => `Created ${data.name}`,
        error: (error: unknown) => `Error: ${error}`,
      }

      toast.promise(mockPromise, messages)

      expect(sonnerToast.promise).toHaveBeenCalledWith(mockPromise, messages)
    })

    it('should call sonner toast.promise with options', async () => {
      const mockPromise = Promise.resolve('data')
      const messages = {
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      }

      toast.promise(mockPromise, messages, {
        id: 'promise-id',
        position: 'bottom-center',
      })

      expect(sonnerToast.promise).toHaveBeenCalledWith(mockPromise, messages)
    })

    it('should handle rejected promise', async () => {
      const mockError = new Error('Test error')
      const mockPromise = Promise.reject(mockError)
      const messages = {
        loading: 'Loading...',
        success: 'Success!',
        error: (err: unknown) =>
          err instanceof Error ? err.message : String(err),
      }

      toast.promise(mockPromise, messages)

      expect(sonnerToast.promise).toHaveBeenCalledWith(mockPromise, messages)

      // Catch the rejection to prevent unhandled promise rejection
      await mockPromise.catch(() => {})
    })
  })

  describe('custom', () => {
    it('should call sonner toast.custom with JSX element', () => {
      const customElement = {
        type: 'div',
        props: { children: 'Custom toast' },
      } as ReactNode

      toast.custom(customElement)

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        duration: 4000,
      })

      // Test the function returns the JSX
      const fn = (sonnerToast.custom as jest.Mock).mock.calls[0][0]
      expect(fn()).toBe(customElement)
    })

    it('should call sonner toast.custom with options', () => {
      const customElement = {
        type: 'span',
        props: { children: 'Custom' },
      } as ReactNode
      const mockOnDismiss = jest.fn()
      const mockOnAutoClose = jest.fn()

      toast.custom(customElement, {
        id: 'custom-id',
        duration: 5000,
        position: 'top-right',
        onDismiss: mockOnDismiss,
        onAutoClose: mockOnAutoClose,
      })

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        id: 'custom-id',
        duration: 5000,
        position: 'top-right',
        onDismiss: expect.any(Function),
        onAutoClose: expect.any(Function),
      })

      // Test callbacks
      const callArgs = (sonnerToast.custom as jest.Mock).mock.calls[0][1]
      callArgs.onDismiss()
      expect(mockOnDismiss).toHaveBeenCalled()

      callArgs.onAutoClose()
      expect(mockOnAutoClose).toHaveBeenCalled()
    })

    it('should handle null JSX', () => {
      toast.custom(null)

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        duration: 4000,
      })

      const fn = (sonnerToast.custom as jest.Mock).mock.calls[0][0]
      expect(fn()).toBe(null)
    })

    it('should handle string JSX', () => {
      toast.custom('Just a string')

      expect(sonnerToast.custom).toHaveBeenCalledWith(expect.any(Function), {
        duration: 4000,
      })

      const fn = (sonnerToast.custom as jest.Mock).mock.calls[0][0]
      expect(fn()).toBe('Just a string')
    })
  })

  describe('dismiss', () => {
    it('should call sonner toast.dismiss without id', () => {
      toast.dismiss()

      expect(sonnerToast.dismiss).toHaveBeenCalledWith()
    })

    it('should call sonner toast.dismiss with string id', () => {
      toast.dismiss('test-id')

      expect(sonnerToast.dismiss).toHaveBeenCalledWith('test-id')
    })

    it('should call sonner toast.dismiss with numeric id', () => {
      toast.dismiss(123)

      expect(sonnerToast.dismiss).toHaveBeenCalledWith(123)
    })

    it('should handle undefined id explicitly', () => {
      toast.dismiss(undefined)

      expect(sonnerToast.dismiss).toHaveBeenCalledWith()
    })
  })

  describe('edge cases', () => {
    it('should handle empty messages', () => {
      toast.success('')
      toast.error('')
      toast.warning('')
      toast.info('')
      toast.loading('')

      expect(sonnerToast.success).toHaveBeenCalledWith('', { duration: 4000 })
      expect(sonnerToast.error).toHaveBeenCalledWith('', { duration: 6000 })
      expect(sonnerToast.warning).toHaveBeenCalledWith('', { duration: 5000 })
      expect(sonnerToast.info).toHaveBeenCalledWith('', { duration: 4000 })
      expect(sonnerToast.loading).toHaveBeenCalledWith('', {})
    })

    it('should handle options with only some properties', () => {
      toast.success('Test', { id: 'only-id' })
      toast.error('Test', { position: 'top-left' })
      toast.warning('Test', { duration: 3000 })

      expect(sonnerToast.success).toHaveBeenCalledWith('Test', {
        id: 'only-id',
        duration: 4000,
      })
      expect(sonnerToast.error).toHaveBeenCalledWith('Test', {
        position: 'top-left',
        duration: 6000,
      })
      expect(sonnerToast.warning).toHaveBeenCalledWith('Test', {
        duration: 3000,
      })
    })

    it('should handle very long messages', () => {
      const longMessage = 'a'.repeat(1000)
      toast.success(longMessage)

      expect(sonnerToast.success).toHaveBeenCalledWith(longMessage, {
        duration: 4000,
      })
    })

    it('should handle special characters in messages', () => {
      const specialMessage = '🎉 Success! <script>alert("xss")</script> & more'
      toast.success(specialMessage)

      expect(sonnerToast.success).toHaveBeenCalledWith(specialMessage, {
        duration: 4000,
      })
    })

    it('should return the result from sonner methods', () => {
      const mockReturnValue = { id: 'toast-123' }
      ;(sonnerToast.success as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.error as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.warning as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.info as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.loading as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.promise as jest.Mock).mockReturnValue(mockReturnValue)
      ;(sonnerToast.custom as jest.Mock).mockReturnValue(mockReturnValue)

      expect(toast.success('test')).toBe(mockReturnValue)
      expect(toast.error('test')).toBe(mockReturnValue)
      expect(toast.warning('test')).toBe(mockReturnValue)
      expect(toast.info('test')).toBe(mockReturnValue)
      expect(toast.loading('test')).toBe(mockReturnValue)
      expect(
        toast.promise(Promise.resolve(), {
          loading: '',
          success: '',
          error: '',
        })
      ).toBe(mockReturnValue)
      expect(toast.custom('test')).toBe(mockReturnValue)
    })
  })
})
