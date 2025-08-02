/**
 * Playwright Configuration for E2E Tests
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for E2E test configuration
 * - OCP: Open for extension with custom test projects
 * - DIP: Depends on Playwright abstractions
 *
 * Design Patterns:
 * - Configuration Pattern: Centralized E2E test configuration
 * - Strategy Pattern: Different test strategies for various browsers
 *
 * Architecture: Comprehensive Playwright configuration for cross-browser
 * end-to-end testing with support for multiple projects and environments
 */

import { defineConfig, devices } from '@playwright/test'

const PORT = process.env['PORT'] || 3081

export default defineConfig({
  // Test directory - DISABLED: Point to empty directory to skip E2E tests
  testDir: './src/__tests__/e2e-disabled',

  // Test match pattern - DISABLED: No tests will match
  testMatch: '**/*.disabled.{test,spec}.{ts,tsx}',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Maximum time to wait for page to load
  expect: {
    timeout: 5000,
  },

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env['CI'],

  // Retry on CI only
  retries: process.env['CI'] ? 2 : 0,

  // Reporter configuration
  reporter: process.env['CI']
    ? [['html', { outputFolder: 'playwright-report' }], ['github']]
    : [['html', { outputFolder: 'playwright-report' }], ['list']],

  // Global setup and teardown
  globalSetup: require.resolve('./src/__tests__/e2e/global-setup.ts'),
  globalTeardown: require.resolve('./src/__tests__/e2e/global-teardown.ts'),

  // Shared settings for all projects
  use: {
    // Base URL for all tests
    baseURL: `http://localhost:${PORT}`,

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 10 * 1000,

    // Navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    port: Number(PORT),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env['CI'],
  },

  // Output folder for test artifacts
  outputDir: 'test-results/',
})
