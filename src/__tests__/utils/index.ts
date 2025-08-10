/**
 * Test Utilities Barrel Export
 * SOLID Principles: SRP - Single export point for test utilities
 * Design Patterns: Barrel Export Pattern
 * Dependencies: None
 */

// Provider utilities
export {
  createWrapper,
  renderWithProviders,
  renderMinimal,
  renderWithTheme,
  renderWithI18n,
  renderWithCart,
} from './test-providers'

// Fetch mock utilities
export {
  MockResponse,
  FetchMockBuilder,
  mockFetch,
  mockApiRoutes,
  setupFetchMock,
  restoreFetch,
} from './fetch-mock'

// Re-export testing library utilities
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
