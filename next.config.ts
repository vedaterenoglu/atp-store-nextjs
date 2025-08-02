/**
 * Next.js Configuration
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for Next.js build configuration
 * - OCP: Open for extension via configuration options
 * - DIP: Depends on Next.js configuration interface abstractions
 *
 * Design Patterns:
 * - Configuration Pattern: Centralized build-time settings
 *
 * Note: PPR (Partial Pre-rendering) requires Next.js canary version
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/driebgbfe/image/upload/**',
      },
    ],
  },
  webpack: (config) => {
    // Add GraphQL file loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
    })
    return config
  },
}

export default nextConfig
