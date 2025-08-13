/**
 * Products Test Mocks
 * SOLID Principles: SRP - Single source for products test mocks
 * Design Patterns: Factory Pattern for creating mock instances
 * Dependencies: Component mocks
 */

// Re-export from centralized mocks
export {
  productsComponentModule,
  bookmarkProviderModule,
  mockConsoleError,
} from './component-mocks'
