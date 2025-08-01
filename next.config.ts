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
}

export default nextConfig
