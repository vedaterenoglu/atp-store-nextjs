/**
 * Toast Notification Utilities
 * SOLID Principles: Single Responsibility (toast management)
 * Design Patterns: Facade Pattern (unified toast interface)
 * Dependencies: Sonner toast library
 */

import { toast as sonnerToast } from 'sonner'
import type { ReactNode } from 'react'
import type { ExternalToast } from 'sonner'

interface ToastOptions {
  id?: string | number
  duration?: number
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  dismiss?: boolean
  action?: {
    label: string
    onClick: () => void
  }
  cancel?: {
    label: string
    onClick: () => void
  }
  onDismiss?: () => void
  onAutoClose?: () => void
}

class ToastFacade {
  success(message: string, options?: ToastOptions) {
    const toastOptions: ExternalToast = {
      duration: options?.duration || 4000,
    }

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.onAutoClose) {
      toastOptions.onAutoClose = () => options.onAutoClose!()
    }
    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: () => options.action!.onClick(),
      }
    }
    if (options?.cancel) {
      toastOptions.cancel = {
        label: options.cancel.label,
        onClick: () => options.cancel!.onClick(),
      }
    }

    return sonnerToast.success(message, toastOptions)
  }

  error(message: string, options?: ToastOptions) {
    const toastOptions: ExternalToast = {
      duration: options?.duration || 6000, // Longer for errors
    }

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.onAutoClose) {
      toastOptions.onAutoClose = () => options.onAutoClose!()
    }
    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: () => options.action!.onClick(),
      }
    }
    if (options?.cancel) {
      toastOptions.cancel = {
        label: options.cancel.label,
        onClick: () => options.cancel!.onClick(),
      }
    }

    return sonnerToast.error(message, toastOptions)
  }

  warning(message: string, options?: ToastOptions) {
    const toastOptions: ExternalToast = {
      duration: options?.duration || 5000,
    }

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.onAutoClose) {
      toastOptions.onAutoClose = () => options.onAutoClose!()
    }
    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: () => options.action!.onClick(),
      }
    }
    if (options?.cancel) {
      toastOptions.cancel = {
        label: options.cancel.label,
        onClick: () => options.cancel!.onClick(),
      }
    }

    return sonnerToast.warning(message, toastOptions)
  }

  info(message: string, options?: ToastOptions) {
    const toastOptions: ExternalToast = {
      duration: options?.duration || 4000,
    }

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.onAutoClose) {
      toastOptions.onAutoClose = () => options.onAutoClose!()
    }
    if (options?.action) {
      toastOptions.action = {
        label: options.action.label,
        onClick: () => options.action!.onClick(),
      }
    }
    if (options?.cancel) {
      toastOptions.cancel = {
        label: options.cancel.label,
        onClick: () => options.cancel!.onClick(),
      }
    }

    return sonnerToast.info(message, toastOptions)
  }

  loading(message: string, options?: Omit<ToastOptions, 'duration'>) {
    const toastOptions: ExternalToast = {}

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.cancel) {
      toastOptions.cancel = {
        label: options.cancel.label,
        onClick: () => options.cancel!.onClick(),
      }
    }

    return sonnerToast.loading(message, toastOptions)
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    },
    options?: ToastOptions
  ) {
    const toastOptions: ExternalToast = {}

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position

    return sonnerToast.promise(promise, messages)
  }

  custom(jsx: ReactNode, options?: ToastOptions) {
    const toastOptions: ExternalToast = {
      duration: options?.duration || 4000,
    }

    if (options?.id) toastOptions.id = options.id
    if (options?.position) toastOptions.position = options.position
    if (options?.onDismiss) {
      toastOptions.onDismiss = () => options.onDismiss!()
    }
    if (options?.onAutoClose) {
      toastOptions.onAutoClose = () => options.onAutoClose!()
    }

    return sonnerToast.custom(() => jsx as React.ReactElement, toastOptions)
  }

  dismiss(id?: string | number) {
    if (id) {
      sonnerToast.dismiss(id)
    } else {
      sonnerToast.dismiss()
    }
  }
}

export const toast = new ToastFacade()
