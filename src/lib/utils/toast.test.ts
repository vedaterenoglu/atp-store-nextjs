/**
 * Toast Utility Unit Tests
 * SOLID Principles: Single Responsibility (testing toast functionality)
 * Design Patterns: Mock Pattern for external dependencies
 * Dependencies: Jest, Sonner mocks
 */

// Mock sonner before importing toast
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

import { toast } from './toast'
import { toast as sonnerToast } from 'sonner'

const mockSonnerToast = sonnerToast as jest.Mocked<typeof sonnerToast>

describe('Toast Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('success', () => {
    it('should call sonner success with default duration', () => {
      const message = 'Success message'
      toast.success(message)

      expect(mockSonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 4000,
      })
    })

    it('should call sonner success with custom duration', () => {
      const message = 'Success message'
      const options = { duration: 5000 }
      toast.success(message, options)

      expect(mockSonnerToast.success).toHaveBeenCalledWith(message, {
        duration: 5000,
      })
    })
  })

  describe('error', () => {
    it('should call sonner error with default duration of 6000', () => {
      const message = 'Error message'
      toast.error(message)

      expect(mockSonnerToast.error).toHaveBeenCalledWith(message, {
        duration: 6000,
      })
    })
  })

  describe('warning', () => {
    it('should call sonner warning with default duration of 5000', () => {
      const message = 'Warning message'
      toast.warning(message)

      expect(mockSonnerToast.warning).toHaveBeenCalledWith(message, {
        duration: 5000,
      })
    })
  })

  describe('info', () => {
    it('should call sonner info with default duration of 4000', () => {
      const message = 'Info message'
      toast.info(message)

      expect(mockSonnerToast.info).toHaveBeenCalledWith(message, {
        duration: 4000,
      })
    })
  })

  describe('loading', () => {
    it('should call sonner loading without duration', () => {
      const message = 'Loading...'
      toast.loading(message)

      expect(mockSonnerToast.loading).toHaveBeenCalledWith(message, {})
    })
  })

  describe('dismiss', () => {
    it('should call sonner dismiss with id', () => {
      const id = 'toast-123'
      toast.dismiss(id)

      expect(mockSonnerToast.dismiss).toHaveBeenCalledWith(id)
    })

    it('should call sonner dismiss without arguments when no id provided', () => {
      toast.dismiss()

      expect(mockSonnerToast.dismiss).toHaveBeenCalledWith()
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
