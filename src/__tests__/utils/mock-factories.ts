/**
 * Mock Factory Functions
 *
 * IMPORTANT: These functions ONLY return mock implementations.
 * They do NOT call jest.mock() - that must be done in the test file.
 *
 * Usage in test file:
 * import { createButtonMock } from '@/__tests__/utils/mock-factories'
 * jest.mock('@/components/ui/button', () => ({
 *   Button: createButtonMock('my-button')
 * }))
 */

import React from 'react'
import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
} from 'react'

/**
 * Create a mock button component
 */
export const createButtonMock = (testId = 'button') =>
  jest.fn(
    ({
      children,
      onClick,
      disabled,
      className,
      ...props
    }: ButtonHTMLAttributes<HTMLButtonElement>) =>
      React.createElement(
        'button',
        {
          'data-testid': testId,
          onClick: disabled ? undefined : onClick,
          disabled,
          className,
          ...props,
        },
        children
      )
  )

/**
 * Create a mock card component
 */
export const createCardMock = (testId = 'card') =>
  jest.fn(({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) =>
    React.createElement(
      'div',
      {
        'data-testid': testId,
        className,
        ...props,
      },
      children
    )
  )

/**
 * Create a mock skeleton component
 */
export const createSkeletonMock = () =>
  jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', {
      'data-testid': 'skeleton',
      className: `${className} skeleton animate-pulse`,
    })
  )

/**
 * Create a mock input component
 */
export const createInputMock = () =>
  jest.fn((props: InputHTMLAttributes<HTMLInputElement>) =>
    React.createElement('input', {
      'data-testid': `input-${props.id}`,
      ...props,
    })
  )

/**
 * Create a mock translation function
 */
export const createTranslationMock = (
  translations: Record<string, string> = {}
) => {
  return (key: string, params?: Record<string, unknown>) => {
    let translation = translations[key] || key

    // Handle interpolation
    if (params) {
      Object.entries(params).forEach(([placeholder, value]) => {
        translation = translation.replace(`{{${placeholder}}}`, String(value))
      })
    }

    return translation
  }
}

/**
 * Create a mock useTranslation hook
 */
export const createUseTranslationMock = (
  translations: Record<string, string> = {}
) => ({
  t: createTranslationMock(translations),
  i18n: {
    language: 'en',
    changeLanguage: jest.fn(() => Promise.resolve()),
  },
  ready: true,
})

/**
 * Create a mock store hook
 */
export const createStoreMock = <T>(initialState: T) => {
  let state = initialState
  const subscribers: Array<() => void> = []

  const store = Object.assign(
    jest.fn((selector?: (state: T) => unknown) => {
      if (typeof selector === 'function') {
        return selector(state)
      }
      return state
    }),
    {
      setState: jest.fn((updates: Partial<T> | ((state: T) => Partial<T>)) => {
        state = {
          ...state,
          ...(typeof updates === 'function' ? updates(state) : updates),
        }
        subscribers.forEach(sub => sub())
      }),
      getState: jest.fn(() => state),
      subscribe: jest.fn((callback: () => void) => {
        subscribers.push(callback)
        return () => {
          const index = subscribers.indexOf(callback)
          if (index > -1) subscribers.splice(index, 1)
        }
      }),
    }
  )

  return store
}

/**
 * Create a mock Clerk auth hook
 */
export const createClerkAuthMock = (overrides = {}) => ({
  isLoaded: true,
  isSignedIn: false,
  userId: null,
  sessionId: null,
  sessionClaims: null,
  has: jest.fn(),
  signOut: jest.fn(),
  getToken: jest.fn(),
  ...overrides,
})

/**
 * Create a mock toast function
 */
export const createToastMock = () => ({
  success: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
  loading: jest.fn(),
  promise: jest.fn(),
  custom: jest.fn(),
  dismiss: jest.fn(),
})
