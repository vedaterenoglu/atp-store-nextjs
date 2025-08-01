import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'coverage/**',
      'coverage-*/**',
      '.nyc_output/**',
      'build/**',
      'dist/**',
      '.vercel/**',
      '*.tsbuildinfo',
      'next-env.d.ts',
      'public/sw.js',
      'public/workbox-*.js',
      'storybook-static/**',
      'tmp/**',
      'temp/**',
      'src/components/ui/schadcn/**/*',
      'src/generated/**/*',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      semi: ['error', 'never'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
]

export default eslintConfig