/**
 * Apollo Client Mock Helper
 * SOLID Principles: SRP - Single responsibility for Apollo mocking
 * Design Patterns: Factory Pattern
 * Dependencies: None
 */

export const createMockApolloClient = () => {
  const mockQuery = jest.fn()

  const mockClient = {
    query: mockQuery,
  }

  return { mockClient, mockQuery }
}
