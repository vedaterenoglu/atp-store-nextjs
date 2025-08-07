/**
 * Mock Apollo Browser Client for Testing
 * SOLID Principles: SRP - Single mock responsibility
 * Design Patterns: Test Double Pattern
 * Dependencies: None
 */

// Re-export the same mock as server client since they should behave the same in tests
export { getClient as getBrowserClient, mockQuery } from './client'
