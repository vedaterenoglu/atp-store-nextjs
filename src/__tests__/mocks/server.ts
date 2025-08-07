/**
 * MSW Server Setup for Integration Tests
 *
 * SOLID Principles Applied:
 * - SRP: Server setup has single responsibility
 * - OCP: Easy to extend with new handlers
 * - DIP: Depends on MSW abstractions
 *
 * Design Patterns:
 * - Singleton Pattern: Single server instance
 * - Factory Pattern: Server creation
 */

import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { serviceHandlers } from '@/services/__mocks__/graphql-handlers'

// Create MSW server instance with default handlers and service handlers
export const server = setupServer(...handlers, ...serviceHandlers)
