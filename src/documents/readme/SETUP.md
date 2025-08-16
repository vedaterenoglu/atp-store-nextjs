# 🔧 Setup Guide - ATP Store

Complete installation and configuration guide for developers.

## 📋 Prerequisites

- **Node.js** 18.19+ (LTS recommended)
- **npm** 10+ or **yarn** 1.22+
- **Git** 2.0+
- **Hasura GraphQL** endpoint (provided)
- **Clerk** account for authentication
- **SendGrid** account for emails (optional)

## 🚀 Installation Steps

### 1. Clone Repository

```bash
# Via HTTPS
git clone https://github.com/yourusername/atp-store-nextjs.git

# Via SSH (recommended)
git clone git@github.com:yourusername/atp-store-nextjs.git

cd atp-store-nextjs
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Using yarn
yarn install

# If you encounter issues, clean install
rm -rf node_modules package-lock.json
npm install
```

### 3. Environment Configuration

#### Create Environment Files

```bash
# Copy example configuration
cp .env.example .env.local

# For testing
cp .env.example .env.test.local

# For production (in deployment)
cp .env.example .env.production.local
```

#### Configure Required Variables

Edit `.env.local` with your credentials:

```env
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_***
CLERK_SECRET_KEY=sk_test_***
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Hasura GraphQL (Required)
NEXT_PUBLIC_HASURA_GRAPHQL_URL=https://your-hasura-instance.hasura.app/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=your-admin-secret-key
NEXT_PUBLIC_HASURA_WS_URL=wss://your-hasura-instance.hasura.app/v1/graphql

# SendGrid Email (Optional)
SENDGRID_API_KEY=SG.***
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_TEMPLATE_ORDER_CONFIRMATION=d-***

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Features (Optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### 4. Database Setup

#### Hasura Configuration

1. Access your Hasura console
2. Import the database schema:
   ```bash
   # Schema file location
   src/database/schema.sql
   ```
3. Configure permissions for tables:
   - `customers` - Read/Write for authenticated users
   - `products` - Public read, admin write
   - `orders` - User-specific read/write
   - `bookmarks` - User-specific CRUD

#### Initial Data (Optional)

```bash
# Seed sample data
npm run db:seed

# Or manually via Hasura console
```

### 5. Clerk Authentication Setup

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Configure authentication methods:
   - Email/Password
   - OAuth providers (optional)
3. Set up user metadata schema:
   ```json
   {
     "role": "customer|admin",
     "customerId": "string",
     "preferences": {
       "language": "sv",
       "theme": "light"
     }
   }
   ```
4. Create webhook for user sync (optional)

### 6. Development Server

```bash
# Start development server
npm run dev

# With specific port
PORT=3001 npm run dev

# With debug mode
DEBUG=* npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Testing Setup

### Run Tests

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Specific test file
npm test -- ProductCard.test.tsx
```

### Test Environment

Tests use mocked data from `src/mocks/`. No external services required.

## 🔍 Verification Steps

### 1. Check Installation

```bash
# Verify Node version
node --version  # Should be 18.19+

# Verify dependencies
npm list --depth=0

# Check for vulnerabilities
npm audit
```

### 2. Verify Configuration

```bash
# Test environment variables
npm run env:check

# Test GraphQL connection
npm run graphql:test

# Test Clerk authentication
npm run auth:test
```

### 3. Build Verification

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build
```

## 🐳 Docker Setup (Optional)

```bash
# Build container
docker build -t atp-store .

# Run container
docker run -p 3000:3000 --env-file .env.local atp-store

# Using docker-compose
docker-compose up
```

## 📦 VS Code Setup (Recommended)

### Extensions

Install recommended extensions:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- GraphQL
- i18n Ally

### Settings

Project includes `.vscode/settings.json` with optimal configuration.

## 🚨 Common Setup Issues

### Node Version Mismatch
```bash
# Use nvm to switch versions
nvm install 18.19
nvm use 18.19
```

### Permission Errors
```bash
# Fix npm permissions
sudo npm install -g npm@latest
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### Environment Variables Not Loading
```bash
# Verify .env.local exists
ls -la .env*
# Check file permissions
chmod 644 .env.local
```

## 🎯 Next Steps

1. ✅ Complete installation
2. ✅ Configure environment
3. ✅ Verify setup
4. 📖 Read [Architecture Guide](ARCHITECTURE.md)
5. 🚀 Start developing with [Contributing Guide](CONTRIBUTING.md)

## 📞 Support

- 📧 Email: support@yourdomain.com
- 💬 Discord: [Join Server](https://discord.gg/yourserver)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/atp-store-nextjs/issues)