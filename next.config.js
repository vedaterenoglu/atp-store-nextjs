/**
 * Next.js Configuration
 *
 * Provides: Custom webpack configuration for GraphQL file handling
 * Architecture: Extends Next.js webpack config to support .graphql imports
 *
 * Dependencies: @graphql-tools/webpack-loader
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    // Add GraphQL loader for .graphql and .gql files
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: '@graphql-tools/webpack-loader',
      options: {
        // Validate GraphQL syntax at build time
        validate: true,
      },
    })

    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
