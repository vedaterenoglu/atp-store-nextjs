# 🤝 Contributing Guide - ATP Store

Guidelines for contributing to the ATP Store project.

## 🎯 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Any unprofessional conduct

## 🚀 Getting Started

### Prerequisites
1. Read [Architecture Guide](ARCHITECTURE.md)
2. Set up development environment ([Setup Guide](SETUP.md))
3. Understand project standards (CLAUDE.md)
4. Join our Discord community

### Development Setup
```bash
# Fork and clone
git clone git@github.com:yourusername/atp-store-nextjs.git
cd atp-store-nextjs

# Install dependencies
npm install

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
npm run dev
```

## 📋 Development Workflow

### 1. Planning Phase
```typescript
// Before coding:
1. Analyze requirements completely
2. Design solution following SOLID principles
3. Plan component decomposition
4. Identify test scenarios
5. Get approval on approach
```

### 2. Implementation Phase
```typescript
// Coding standards:
- NO TypeScript 'any' types
- NO ESLint disable statements
- NO monolithic components
- ALWAYS decompose components
- ALWAYS use shadcn/ui when available
- ALWAYS write tests first (TDD)
```

### 3. Testing Phase
```bash
# Run all checks
npm run type-check     # TypeScript validation
npm run lint          # ESLint checks
npm run test          # Unit tests
npm run test:coverage # Coverage report (must be 100%)
```

### 4. Submission Phase
```bash
# Commit with conventional commits
git commit -m "feat: add product filtering"
git commit -m "fix: resolve cart calculation"
git commit -m "docs: update API documentation"

# Push and create PR
git push origin feature/your-feature
```

## 🏗️ Code Standards

### TypeScript Requirements
```typescript
// ✅ GOOD
interface ProductProps {
  id: string
  name: string
  price: number
}

const ProductCard: FC<ProductProps> = ({ id, name, price }) => {
  // Implementation
}

// ❌ BAD
const ProductCard = ({ id, name, price }: any) => {
  // Never use 'any'
}
```

### Component Decomposition
```typescript
// ✅ GOOD - Decomposed components
const ProductCard = () => (
  <Card>
    <ProductImage />
    <ProductDetails />
    <ProductActions />
  </Card>
)

// ❌ BAD - Monolithic component
const ProductCard = () => (
  <div>
    {/* 200+ lines of JSX */}
  </div>
)
```

### File Headers
```typescript
/**
 * ProductCard Component
 * SOLID Principles: Single Responsibility, Open/Closed
 * Design Patterns: Compound Component Pattern
 * Dependencies: shadcn/ui Card, Zustand cart store
 */
```

## 🧪 Testing Requirements

### Test Coverage
```typescript
// 100% coverage required for:
- Statements
- Branches  
- Functions
- Lines

// Test structure
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Mock dependencies
  })
  
  // Rendering tests
  it('should render correctly', () => {})
  
  // Interaction tests
  it('should handle user actions', () => {})
  
  // Edge cases
  it('should handle errors gracefully', () => {})
})
```

### Mock Data
```typescript
// Use validated mock data
import { mockProducts } from '@/mocks/graphql/products'

// Never create inline mocks
const products = mockProducts // ✅ GOOD
const products = [{id: '1', ...}] // ❌ BAD
```

## 🎨 UI Development

### shadcn/ui Components
```typescript
// ALWAYS check shadcn/ui first
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

// NEVER create custom UI primitives
// ❌ BAD: Creating custom button
const CustomButton = () => <button>...</button>
```

### Styling Standards
```typescript
// Use cn() utility for classes
import { cn } from '@/lib/utils'

// ✅ GOOD
className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}

// ❌ BAD
className={`base ${isActive ? 'active' : ''}`}
```

## 📝 Commit Guidelines

### Conventional Commits
```bash
# Format: <type>(<scope>): <subject>

# Types
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting
refactor: # Code restructuring
test:     # Adding tests
chore:    # Maintenance

# Examples
feat(products): add advanced filtering
fix(cart): resolve quantity calculation
docs(api): update GraphQL schema docs
test(auth): add login flow tests
```

### PR Guidelines
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
- [ ] Unit tests pass
- [ ] 100% coverage maintained
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guide
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
```

## 🌍 Internationalization

### Adding Translations
```json
// locales/en/products.json
{
  "title": "Products",
  "search": "Search products",
  "filter": "Filter by category"
}
```

### Translation Keys
```typescript
// Use namespaced keys
t('products:title')        // ✅ GOOD
t('title')                 // ❌ BAD

// Use interpolation
t('products:count', { count: 5 })
```

## 🔄 State Management

### Zustand Stores
```typescript
// Store structure
interface StoreState {
  // State
  items: Item[]
  
  // Actions
  addItem: (item: Item) => void
  removeItem: (id: string) => void
  
  // Computed
  get totalItems(): number
}

// NEVER use React Context for state
```

## 📡 GraphQL Development

### Manual Type Safety
```typescript
// 1. Create .graphql file
// 2. Add example response comment
// 3. Create .types.ts file
// 4. Create .schema.ts with Zod
// 5. Create validated mock data

// Never use code generation
```

## 🐛 Debugging

### Debug Tools
```bash
# Enable debug mode
DEBUG=* npm run dev

# Use React DevTools
# Use Redux DevTools for Zustand

# Check GraphQL queries
# Apollo Client DevTools
```

### Common Issues
```typescript
// TypeScript errors
npm run type-check -- --listFiles

// ESLint errors
npm run lint -- --debug

// Test failures
npm test -- --verbose
```

## 📚 Documentation

### Code Documentation
```typescript
/**
 * Calculates the total price including tax
 * @param price - Base price in SEK
 * @param taxRate - Tax rate as decimal (0.25 for 25%)
 * @returns Total price with tax
 */
export function calculateTotal(price: number, taxRate: number): number {
  return price * (1 + taxRate)
}
```

### README Updates
- Update when adding features
- Include usage examples
- Document breaking changes
- Add migration guides

## 🚀 Release Process

### Version Bumping
```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

### Release Notes
```markdown
## [1.1.0] - 2025-08-16

### Added
- Product filtering by category
- Multi-language support

### Fixed
- Cart calculation bug
- Mobile layout issues

### Changed
- Updated to Next.js 15.4
```

## 🤔 Getting Help

### Resources
- 📖 [Project Documentation](../readme/)
- 💬 Discord: [Join Server](https://discord.gg/atpstore)
- 📧 Email: dev@atpstore.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/atp-store-nextjs/issues)

### Questions?
1. Check existing issues
2. Search documentation
3. Ask on Discord
4. Create detailed issue

## 🏆 Recognition

### Contributors
- All contributors listed in [CONTRIBUTORS.md](CONTRIBUTORS.md)
- Monthly contributor highlights
- Special badges for consistent contributors

### Hall of Fame
Top contributors receive:
- Public recognition
- Portfolio references
- LinkedIn recommendations

## ✅ Contribution Checklist

Before submitting PR:
- [ ] Code follows all standards
- [ ] TypeScript has no errors
- [ ] ESLint has no warnings
- [ ] Tests achieve 100% coverage
- [ ] Documentation is updated
- [ ] Commit messages follow convention
- [ ] PR description is complete
- [ ] Self-review completed

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.