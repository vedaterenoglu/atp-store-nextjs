# 🛍️ ATP Store - Enterprise E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Demo-Live-success)](https://portfolio-atp-store-nextjs-staging.demo.vedaterenoglu.com)

Production-ready B2B e-commerce platform for Alfe Tissue Paper AB, showcasing enterprise-grade architecture and modern web development practices.

> ⚠️ **Project Context: ATP Store Integration**
>
> **Existing System:** Alfe Tissue Paper AB already has an internal frontend application used by their staff to create orders, dispatch lists, and invoice reminders. Client payments are tracked, reminders are sent to clients, and the inkasso process is managed through this system. Their frontend is connected to two backends: a Hasura GraphQL backend and a Nest.js REST API backend that serves as a mail server.
>
> **Our Contribution - ATP Store (This Repository):** We developed a customer-facing portal that integrates with their existing system, enabling the customer's clients to create orders online and track their orders, deliveries, and unpaid invoices. Stripe integration has been implemented, though online payments are not currently accepted by the customer.
>
> **Deployment Status:** The ATP Store customer portal has been completed and is production-ready. Product images are awaited to be deployed to the Hasura GraphQL backend by the customer. The launch is scheduled for September 1st, 2025. A staging version has been deployed for portfolio demonstration purposes with one fallback image.

## ✨ Key Features

- 🌍 **Multi-language Support** - 5 languages (EN, SV, TR, DA, DE)
- 🔐 **Enterprise Authentication** - Multi-role RBAC with Clerk
- 🛒 **Complete E-commerce** - Cart, checkout, orders, invoices
- 👨‍💼 **Admin Dashboard** - Comprehensive management panel
- 📱 **Responsive Design** - Mobile-first with Tailwind CSS
- ⚡ **Performance Optimized** - Server components, caching
- 🧪 **100% Test Coverage** - Jest, RTL, MSW
- 🎨 **Component Library** - shadcn/ui with Atomic Design

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/atp-store-nextjs.git
cd atp-store-nextjs

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Configure your environment variables

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📚 Documentation

### For Developers
- 🔧 [Setup Guide](src/documents/readme/SETUP.md) - Installation & configuration
- 🏗️ [Architecture](src/documents/readme/ARCHITECTURE.md) - System design & patterns
- 🤝 [Contributing](src/documents/readme/CONTRIBUTING.md) - Development workflow
- 📡 [API Reference](src/documents/readme/API.md) - GraphQL & REST endpoints

### For Operations
- 📦 [Deployment](src/documents/readme/DEPLOYMENT.md) - Production deployment
- 🎯 [Usage Guide](src/documents/readme/USAGE.md) - Features & workflows
- 🔍 [Troubleshooting](src/documents/readme/TROUBLESHOOTING.md) - Common issues

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | Next.js 15.4, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **State** | Zustand 5, Immer |
| **Backend** | Hasura GraphQL, Apollo Client |
| **Auth** | Clerk 6.28 |
| **i18n** | i18next, react-i18next |
| **Testing** | Jest 30, React Testing Library, MSW |
| **Deployment** | Vercel, GitHub Actions |

## 🏃‍♂️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run all tests
npm run test:coverage # Run tests with coverage
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🌐 Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components (Atomic Design)
├── services/         # Business logic & GraphQL
├── lib/             # Utilities & configurations
├── i18n/            # Internationalization
├── stores/          # Zustand state management
└── tests/           # Test suites & mocks
```

## 🔒 Environment Variables

Create `.env.local` with required variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_***
CLERK_SECRET_KEY=sk_***
NEXT_PUBLIC_HASURA_GRAPHQL_URL=https://***
HASURA_GRAPHQL_ADMIN_SECRET=***
```

See [Setup Guide](src/documents/readme/SETUP.md) for complete configuration.

## 📄 License

MIT © 2025 Vedat Erenoglu

---

**Live Demo:** [portfolio-atp-store-nextjs-staging.demo.vedaterenoglu.com](https://portfolio-atp-store-nextjs-staging.demo.vedaterenoglu.com)  
**Documentation:** [Full Documentation](src/documents/readme/)  
**Support:** [Report Issues](https://github.com/yourusername/atp-store-nextjs/issues)