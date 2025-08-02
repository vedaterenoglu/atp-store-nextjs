/**
 * Playwright Global Setup
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for E2E test environment setup
 * - OCP: Open for extension with additional setup steps
 *
 * Design Patterns:
 * - Initialization Pattern: Global E2E environment initialization
 *
 * Architecture: Runs once before all E2E tests to set up the test environment
 */

import type { FullConfig } from '@playwright/test'

async function globalSetup(_config: FullConfig) {
  // Store original environment variables
  process.env['ORIGINAL_NODE_ENV'] = process.env['NODE_ENV']
  // Use Object.defineProperty to set NODE_ENV since it's read-only
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    writable: true,
    enumerable: true,
    configurable: true,
  })

  // Set test-specific environment variables
  process.env['NEXT_PUBLIC_APP_URL'] =
    `http://localhost:${process.env['PORT'] || 3081}`

  // Using console methods allowed by ESLint
  console.warn('🎭 Playwright global setup completed')
  console.warn(`📍 Base URL: ${process.env['NEXT_PUBLIC_APP_URL']}`)
  console.warn(`🌍 Environment: ${process.env['NODE_ENV']}`)
}

export default globalSetup
