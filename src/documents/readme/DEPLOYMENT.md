# 📦 Deployment Guide - ATP Store

Complete guide for deploying ATP Store to production.

## 🚀 Deployment Platforms

### Vercel (Recommended)
Primary deployment platform with automatic GitHub integration.

### Prerequisites
- Vercel account
- GitHub repository
- Environment variables configured
- Domain name (optional)

## 📋 Pre-Deployment Checklist

### Code Quality
```bash
# Run all quality checks
npm run type-check      # No TypeScript errors
npm run lint           # No ESLint warnings
npm run test:coverage  # 100% test coverage
npm run build          # Successful production build
```

### Security Audit
```bash
# Check for vulnerabilities
npm audit
npm audit fix

# Update dependencies
npm update
```

### Environment Variables
```bash
# Verify all required variables
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- HASURA_GRAPHQL_ADMIN_SECRET
- NEXT_PUBLIC_HASURA_GRAPHQL_URL
- SENDGRID_API_KEY (if using email)
```

## 🔧 Vercel Deployment

### Method 1: Vercel CLI

#### Install Vercel CLI
```bash
npm i -g vercel
```

#### Deploy
```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

#### Setup
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select GitHub repository
4. Configure project:
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   ```

#### Automatic Deployments
```yaml
# Deployment triggers
main branch → Production
other branches → Preview deployments
Pull requests → Preview URLs
```

### Method 3: Manual Deployment

#### Build Locally
```bash
# Create production build
npm run build

# Test production build
npm run start
```

#### Upload to Vercel
1. Go to Vercel dashboard
2. Drag and drop `.next` folder
3. Configure environment variables
4. Deploy

## 🌍 Environment Configuration

### Development
```env
# .env.development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### Staging
```env
# .env.staging
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.atpstore.com
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Production
```env
# .env.production
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://atpstore.com
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

## 🔐 Secrets Management

### Vercel Environment Variables
```bash
# Add via CLI
vercel env add HASURA_GRAPHQL_ADMIN_SECRET production
vercel env add CLERK_SECRET_KEY production

# Add via Dashboard
Settings → Environment Variables → Add
```

### Security Best Practices
- Never commit secrets to repository
- Use different secrets per environment
- Rotate secrets regularly
- Limit secret access to necessary services

## 🌐 Domain Configuration

### Custom Domain Setup

#### Add Domain in Vercel
1. Go to project Settings → Domains
2. Add your domain: `atpstore.com`
3. Add www subdomain: `www.atpstore.com`

#### DNS Configuration

##### Option 1: Vercel DNS
```dns
# Transfer domain to Vercel
Nameservers: ns1.vercel-dns.com
            ns2.vercel-dns.com
```

##### Option 2: External DNS (Cloudflare)
```dns
# A Records (Apex domain)
Type: A
Name: @
Value: 76.76.21.21

# CNAME (www)
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Disable Cloudflare proxy (gray cloud)
```

### SSL Configuration
- Automatic SSL via Let's Encrypt
- Force HTTPS in Vercel settings
- HSTS headers automatically added

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run test:coverage
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Pre-deployment Hooks
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["arn1"],
  "functions": {
    "app/api/*/route.ts": {
      "maxDuration": 30
    }
  }
}
```

## 📊 Monitoring & Analytics

### Vercel Analytics
```typescript
// Enable in vercel.json
{
  "analytics": {
    "enable": true
  }
}
```

### Custom Analytics
```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### Error Tracking
```typescript
// Install Sentry
npm install @sentry/nextjs

// sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV
})
```

## 🚨 Production Optimizations

### Performance
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['cdn.atpstore.com'],
    formats: ['image/avif', 'image/webp']
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true
}
```

### Caching Strategy
```typescript
// Cache headers
export const revalidate = 3600 // 1 hour

// Static generation
export const dynamic = 'force-static'

// Edge caching
export const runtime = 'edge'
```

### Database Optimization
- Connection pooling
- Query optimization
- Index management
- Read replicas for scaling

## 🔄 Rollback Strategy

### Vercel Instant Rollback
```bash
# Via CLI
vercel rollback

# Via Dashboard
Deployments → Select previous → Promote to Production
```

### Database Rollback
```sql
-- Keep migration scripts
-- Version control schema changes
-- Test rollback procedures
```

## 📱 Progressive Web App

### PWA Configuration
```json
// public/manifest.json
{
  "name": "ATP Store",
  "short_name": "ATP",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

### Service Worker
```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  // Cache assets
})

self.addEventListener('fetch', (event) => {
  // Serve cached content
})
```

## 🌍 Multi-Region Deployment

### Edge Functions
```typescript
// Use edge runtime for global distribution
export const runtime = 'edge'
export const preferredRegion = ['arn1', 'iad1']
```

### CDN Configuration
- Static assets via Vercel Edge Network
- Image optimization at edge locations
- Automatic WebP/AVIF conversion

## 🔐 Security Headers

### Configure Headers
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

## 📈 Scaling Strategy

### Horizontal Scaling
- Automatic with Vercel
- Serverless functions scale to demand
- Edge functions for global distribution

### Database Scaling
- Read replicas for queries
- Connection pooling
- Query caching
- Consider database sharding

## 🧪 Post-Deployment Testing

### Smoke Tests
```bash
# Health check
curl https://atpstore.com/api/health

# Critical paths
- Homepage loads
- Product search works
- Cart functionality
- Checkout process
```

### Load Testing
```bash
# Using k6
k6 run loadtest.js

# Using Artillery
artillery quick -d 60 -r 10 https://atpstore.com
```

## 📝 Deployment Checklist

### Before Deploy
- [ ] All tests passing
- [ ] Build successful
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Security audit passed

### During Deploy
- [ ] Monitor deployment logs
- [ ] Check build output
- [ ] Verify environment variables

### After Deploy
- [ ] Smoke tests pass
- [ ] Critical features work
- [ ] Performance acceptable
- [ ] Monitoring active
- [ ] Backup created

## 🚑 Emergency Procedures

### Service Degradation
1. Enable maintenance mode
2. Scale up resources
3. Investigate root cause
4. Implement fix
5. Gradual rollout

### Data Recovery
1. Stop write operations
2. Assess damage
3. Restore from backup
4. Verify data integrity
5. Resume operations

## 📞 Support & Resources

- 📧 DevOps: devops@atpstore.com
- 📖 [Vercel Docs](https://vercel.com/docs)
- 💬 [Status Page](https://status.atpstore.com)
- 🚨 On-call: +46-XXX-XXXX