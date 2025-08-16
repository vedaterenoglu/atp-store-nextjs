# 🔍 Troubleshooting Guide - ATP Store

Common issues and their solutions.

## 🚨 Installation Issues

### Node Version Mismatch
**Error:** `The engine "node" is incompatible with this module`

**Solution:**
```bash
# Check current version
node --version

# Install correct version with nvm
nvm install 18.19
nvm use 18.19

# Or update package.json if using newer version
```

### Package Installation Failures
**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

### Permission Denied Errors
**Error:** `EACCES: permission denied`

**Solution:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Or use sudo (not recommended)
sudo npm install
```

## 🔧 Build Errors

### TypeScript Errors
**Error:** `Type error: Cannot find module '@/components/...'`

**Solution:**
```bash
# Check tsconfig paths
# tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Clear TypeScript cache
rm -rf .next
npm run build
```

### ESLint Errors
**Error:** `ESLint: Parsing error: Cannot read file`

**Solution:**
```bash
# Update ESLint config
npm run lint -- --fix

# Check .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    // Your rules
  }
}
```

### Build Out of Memory
**Error:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or in package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
}
```

## 🌐 Environment Variable Issues

### Missing Environment Variables
**Error:** `Environment variable not found: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

**Solution:**
```bash
# Create .env.local
cp .env.example .env.local

# Add missing variables
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_..." >> .env.local

# Restart development server
npm run dev
```

### Variables Not Loading
**Error:** `undefined` when accessing `process.env.VARIABLE`

**Solution:**
```typescript
// For client-side, must prefix with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://api.example.com

// Server-side variables don't need prefix
DATABASE_URL=postgresql://...

// Restart server after changes
```

## 🔐 Authentication Issues

### Clerk Authentication Errors
**Error:** `Clerk: Unable to authenticate request`

**Solution:**
```typescript
// Check Clerk keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

// Verify middleware.ts
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/api/public"]
})

// Clear cookies and retry
```

### Session Not Persisting
**Error:** User logged out unexpectedly

**Solution:**
```typescript
// Check session configuration
// app/layout.tsx
<ClerkProvider
  appearance={{
    elements: {
      rootBox: "w-full"
    }
  }}
>
  {children}
</ClerkProvider>
```

### Role-Based Access Issues
**Error:** `Forbidden: Insufficient permissions`

**Solution:**
```typescript
// Verify user metadata in Clerk dashboard
{
  "role": "admin",
  "customerId": "cust_123"
}

// Check role validation
const isAdmin = user?.publicMetadata?.role === 'admin'
```

## 📊 GraphQL/Hasura Issues

### Connection Refused
**Error:** `fetch failed: Connection refused`

**Solution:**
```bash
# Verify Hasura URL
NEXT_PUBLIC_HASURA_GRAPHQL_URL=https://your-instance.hasura.app/v1/graphql

# Check admin secret
HASURA_GRAPHQL_ADMIN_SECRET=your-secret

# Test connection
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: your-secret" \
  -d '{"query":"{ __typename }"}' \
  https://your-instance.hasura.app/v1/graphql
```

### GraphQL Query Errors
**Error:** `GraphQL error: field "x" not found`

**Solution:**
```typescript
// Verify schema matches query
// Check Hasura console for correct field names

// Update TypeScript types
interface Product {
  id: string
  name: string // Ensure field exists
}

// Validate with Zod schema
const ProductSchema = z.object({
  id: z.string(),
  name: z.string()
})
```

### Permission Denied on Queries
**Error:** `GraphQL error: permission denied`

**Solution:**
```typescript
// Server-side queries need admin secret
const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET
  }
})

// Never expose admin secret to client
```

## 🎨 UI/Styling Issues

### Tailwind Classes Not Working
**Error:** Styles not applying

**Solution:**
```javascript
// Check tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ]
}

// Use cn() utility for dynamic classes
import { cn } from '@/lib/utils'
className={cn('base-class', isActive && 'active-class')}
```

### Dark Mode Not Working
**Error:** Theme not switching

**Solution:**
```typescript
// Check theme provider
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
  {children}
</ThemeProvider>

// Verify theme store
const { theme, setTheme } = useThemeStore()
```

### Hydration Mismatch
**Error:** `Hydration failed because initial UI does not match`

**Solution:**
```typescript
// Use dynamic imports for client-only components
import dynamic from 'next/dynamic'

const ClientComponent = dynamic(
  () => import('./ClientComponent'),
  { ssr: false }
)

// Or use useEffect for client-only code
useEffect(() => {
  // Client-only code here
}, [])
```

## 🧪 Testing Issues

### Tests Failing Unexpectedly
**Error:** `Cannot find module '@/mocks/...'`

**Solution:**
```typescript
// Check jest.config.js
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

// Verify mock data exists
import { mockProducts } from '@/mocks/graphql/products'
```

### Coverage Not Meeting Requirements
**Error:** Coverage below threshold

**Solution:**
```bash
# Run coverage report
npm run test:coverage

# Check uncovered lines
# Focus on:
- Untested branches
- Error handling
- Edge cases

# Update tests to cover gaps
```

### Mock Service Worker Issues
**Error:** `[MSW] Failed to mock a request`

**Solution:**
```typescript
// Check MSW handlers
// src/mocks/handlers.ts
export const handlers = [
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json({ products: mockProducts }))
  })
]

// Initialize MSW in tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## 🚀 Deployment Issues

### Vercel Build Failures
**Error:** Build failed on Vercel

**Solution:**
```bash
# Check build logs in Vercel dashboard

# Common fixes:
1. Ensure all env variables are set in Vercel
2. Check Node version in package.json
3. Clear build cache in Vercel settings
4. Verify build command: npm run build
```

### Domain Not Working
**Error:** Domain showing 404

**Solution:**
```dns
# Verify DNS settings
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com

# If using Cloudflare
- Disable proxy (gray cloud)
- Use DNS only mode

# Wait for propagation (up to 48 hours)
```

### Edge Function Timeout
**Error:** `FUNCTION_INVOCATION_TIMEOUT`

**Solution:**
```typescript
// Increase timeout in vercel.json
{
  "functions": {
    "app/api/heavy-operation/route.ts": {
      "maxDuration": 30
    }
  }
}

// Or optimize the function
- Reduce data processing
- Use pagination
- Implement caching
```

## 🗄️ Database Issues

### Connection Pool Exhausted
**Error:** `too many connections`

**Solution:**
```typescript
// Use connection pooling
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum connections
  idleTimeoutMillis: 30000
})

// Close connections properly
finally {
  await client.release()
}
```

### Migration Failures
**Error:** Database schema mismatch

**Solution:**
```bash
# Run migrations
npx prisma migrate dev

# Reset database (development only)
npx prisma migrate reset

# Deploy migrations (production)
npx prisma migrate deploy
```

## 🌍 i18n Issues

### Translations Not Loading
**Error:** Shows translation keys instead of text

**Solution:**
```typescript
// Check namespace loading
const { t } = useTranslation('products') // Correct namespace

// Verify translation files exist
// locales/en/products.json
{
  "title": "Products",
  "search": "Search"
}

// Check i18n configuration
```

### Wrong Language Displayed
**Error:** Default language not working

**Solution:**
```typescript
// Check language detection order
// i18n/config.ts
export const i18nConfig = {
  defaultLocale: 'sv',
  locales: ['en', 'sv', 'tr', 'da', 'de']
}

// Clear localStorage
localStorage.removeItem('i18nextLng')
```

## 🔄 State Management Issues

### Zustand Store Not Updating
**Error:** State changes not reflecting in UI

**Solution:**
```typescript
// Use shallow comparison
const { items } = useCartStore(
  (state) => ({ items: state.items }),
  shallow
)

// Or use subscribeWithSelector
const useStore = create(
  subscribeWithSelector(() => ({
    // store
  }))
)
```

### Persistence Not Working
**Error:** State lost on refresh

**Solution:**
```typescript
// Check persist middleware
const useStore = create(
  persist(
    (set) => ({
      // store logic
    }),
    {
      name: 'store-key',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
```

## 💻 Development Server Issues

### Port Already in Use
**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Hot Reload Not Working
**Error:** Changes not reflecting

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Restart server
npm run dev

# Check for syntax errors in code
# Ensure file saved properly
```

## 🆘 Getting Help

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# Verbose logging
npm run dev -- --verbose
```

### Community Support
- Discord: [Join Server](https://discord.gg/atpstore)
- GitHub Issues: [Report Bug](https://github.com/yourusername/atp-store-nextjs/issues)
- Stack Overflow: Tag with `atp-store`

### Logs & Monitoring
```typescript
// Add console logs for debugging
console.log('Debug:', { variable })

// Use browser DevTools
- Network tab for API calls
- Console for errors
- React DevTools for component state
```

## 📋 Quick Reference

### Reset Everything
```bash
# Nuclear option - reset everything
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

### Common Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run type-check   # Check TypeScript
npm run lint         # Run ESLint
npm test            # Run tests
npm run clean       # Clean build artifacts
```

### Environment Check
```bash
# Verify environment
node --version       # Should be 18.19+
npm --version        # Should be 10+
git --version        # Should be 2.0+
```