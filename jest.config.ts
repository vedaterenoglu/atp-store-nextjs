/**
 * Jest Configuration for Next.js with TypeScript
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for test configuration
 * - OCP: Open for extension with custom matchers and setup files
 * - DIP: Depends on abstractions (jest interfaces) not implementations
 *
 * Design Patterns:
 * - Configuration Pattern: Centralized test configuration
 * - Module Pattern: Modular test setup with separate setup files
 *
 * Architecture: Jest configuration for unit tests with 100% coverage target
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')
/** @type {import('jest').Config} */

const createJestConfig = nextJest.default({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

const config = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Coverage configuration
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts', // Exclude barrel exports
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/__tests__/**',
    '!src/app/api/**', // Exclude API routes for now
    '!src/components/ui/schadcn/**', // Exclude third-party shadcn/ui components
    '!src/components/sections/home/**', // Exclude sections until implemented
    '!src/lib/config/**', // Exclude config files - typically don't need unit tests
    '!src/lib/i18n/**', // Exclude i18n config - typically don't need unit tests
    '!src/lib/stores/**', // Exclude until store implementations are ready for testing
    '!src/lib/generated/**', // Exclude generated files (GraphQL codegen)
    '!src/middleware.ts', // Exclude middleware - Edge Runtime not compatible with Jest
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Test environment configuration
  testEnvironment: 'jest-environment-jsdom',

  // Setup files to run after the test framework is installed
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/jest.setup.ts'],

  // Module name mapper for path aliases
  moduleNameMapper: {
    // Mock react-resizable-panels to avoid ESM parsing errors
    '^react-resizable-panels$': '<rootDir>/src/__tests__/mocks/react-resizable-panels.mock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS imports (CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/src/__tests__/mocks/styleMock.ts',
    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$':
      '<rootDir>/src/__tests__/mocks/fileMock.ts',
    // Handle all GraphQL file imports with a generic mock
    '\\.graphql$': '<rootDir>/src/__tests__/mocks/graphql/graphql.mock.ts',
    // Mock Clerk modules
    '@clerk/nextjs': '<rootDir>/src/__tests__/mocks/clerk.mock.tsx',
    '@clerk/backend': '<rootDir>/src/__tests__/mocks/clerk.mock.tsx',
  },

  // Transform configuration
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
        },
      },
    ] as [string, unknown],
  },

  // Test path patterns
  testMatch: [
    // Unit tests co-located with source files
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
    // Unit tests in __tests__ directory
    '<rootDir>/src/__tests__/**/*.test.{ts,tsx}',
  ],

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/src/__tests__/e2e/',
    '<rootDir>/src/__tests__/ci/',
  ],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Transform ignore patterns to handle ESM modules
  transformIgnorePatterns: [
    'node_modules/(?!(@clerk/backend|@clerk/nextjs|@clerk/shared|react-resizable-panels)/)',
  ],

  // Globals configuration
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
      },
    },
  },

  // Watch plugins for better developer experience
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],

  // Verbose output for CI environments
  verbose: process.env['CI'] === 'true',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
