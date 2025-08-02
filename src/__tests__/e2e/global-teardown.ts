/**
 * Playwright Global Teardown
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for E2E test environment cleanup
 * - OCP: Open for extension with additional cleanup steps
 *
 * Design Patterns:
 * - Cleanup Pattern: Global E2E environment cleanup
 *
 * Architecture: Runs once after all E2E tests to clean up the test environment
 */

async function globalTeardown() {
  // Restore original environment variables
  if (process.env['ORIGINAL_NODE_ENV']) {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: process.env['ORIGINAL_NODE_ENV'],
      writable: true,
      enumerable: true,
      configurable: true,
    })
    delete process.env['ORIGINAL_NODE_ENV']
  }

  console.warn('🎭 Playwright global teardown completed')
}

export default globalTeardown
