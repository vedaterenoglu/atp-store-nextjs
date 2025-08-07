/**
 * Mock Apollo Server Client for Testing
 * SOLID Principles: SRP - Single mock responsibility
 * Design Patterns: Test Double Pattern
 * Dependencies: None
 */

// Create the mock query function that can be overridden per test
export const mockQuery = jest.fn()

export const getClient = jest.fn(() => ({
  query: mockQuery,
  mutate: jest.fn().mockResolvedValue({ data: {} }),
  subscribe: jest.fn(),
  readQuery: jest.fn(),
  writeQuery: jest.fn(),
  clearStore: jest.fn().mockResolvedValue(undefined),
  resetStore: jest.fn().mockResolvedValue(undefined),
}))
