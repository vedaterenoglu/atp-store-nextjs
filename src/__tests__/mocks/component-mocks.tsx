/**
 * Centralized Component Mocks
 * SOLID Principles: SRP - Single source of truth for component mocks
 * Design Patterns: Factory Pattern for creating mock components
 * Dependencies: React
 */

import React from 'react'

/**
 * Create a mock icon component for testing
 */
export function createMockIconComponent(testId: string = 'test-icon') {
  return function MockIcon() {
    return <div data-testid={testId} />
  }
}

/**
 * Create a mock button component for testing
 */
export function createMockButtonComponent(testId: string = 'test-button') {
  return React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >(function MockButton(props, ref) {
    return <button ref={ref} data-testid={testId} {...props} />
  })
}

/**
 * Create a mock theme menu item content module for testing
 */
export function createMockThemeToggleModule() {
  return {
    ThemeMenuItemContent: function MockThemeMenuItemContent({
      option,
      isSelected,
    }: {
      option: {
        value: 'light' | 'dark' | 'system'
        icon: React.ComponentType
        label: string
      }
      isSelected: boolean
    }) {
      const Icon = option.icon
      return (
        <>
          <Icon />
          <span className={isSelected ? 'opacity-100' : 'opacity-0'}>✓</span>
        </>
      )
    },
  }
}

/**
 * Mock provider components
 */
export const providerMocks = {
  ClerkLocaleProvider: jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement(
      'div',
      { 'data-testid': 'clerk-locale-provider' },
      children
    )
  ),
  I18nProvider: jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'i18n-provider' }, children)
  ),
  CartProvider: jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'cart-provider' }, children)
  ),
  ThemeInitializer: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'theme-initializer' })
  ),
}

/**
 * Mock layout components
 */
export const layoutMocks = {
  AppLayout: jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'app-layout' }, children)
  ),
  Navbar: jest.fn(() =>
    React.createElement('nav', { 'data-testid': 'navbar' }, 'Navbar')
  ),
  Footer: jest.fn(() =>
    React.createElement('footer', { 'data-testid': 'footer' }, 'Footer')
  ),
}

/**
 * Mock section components
 */
export const sectionMocks = {
  HeroSection: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'hero-section' }, 'Hero Section')
  ),
  FeaturesSection: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'features-section' }, 'Features Section')
  ),
  CampaignSection: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'campaign-section' }, 'Campaign Section')
  ),
  HeroPrimaryAction: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'hero-primary-action' }, 'Hero Action')
  ),
}

/**
 * Mock page components
 */
export const pageMocks = {
  CategoriesPage: jest.fn(({ categories, error }: { categories: unknown[], error?: { message: string } }) =>
    React.createElement('div', { 'data-testid': 'categories-page' },
      error
        ? React.createElement('div', { 'data-testid': 'error-state' }, `Error: ${error.message}`)
        : React.createElement('div', { 'data-testid': 'categories-count' }, String(categories.length))
    )
  ),
  ProductsPage: jest.fn(({ products }: { products: Array<{ id: string; imageUrl: string }> }) =>
    React.createElement('div', { 'data-testid': 'products-page' }, [
      React.createElement('div', { key: 'count', 'data-testid': 'products-count' }, String(products.length)),
      ...products.map(product =>
        React.createElement('div', { 
          key: product.id, 
          'data-testid': `product-${product.id}` 
        }, product.imageUrl)
      )
    ])
  ),
  BookmarkProvider: jest.fn(({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'bookmark-provider' }, children)
  ),
}

/**
 * Mock service functions
 */
export const serviceMocks = {
  getCampaignProducts: jest.fn().mockResolvedValue([]),
  getCategories: jest.fn().mockResolvedValue([]),
  getProducts: jest.fn().mockResolvedValue([]),
}

/**
 * Mock price service functions
 */
export const priceServiceMocks = {
  calculateDiscountPercentage: jest.fn(
    (originalPrice: number, discountedPrice: number) => {
      if (originalPrice <= 0) return 0
      if (discountedPrice >= originalPrice) return 0
      if (discountedPrice === 0) return 100
      return Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100
      )
    }
  ),
}

/**
 * Mock console methods
 */
export const mockConsoleError = jest.fn()

/**
 * Mock UI Components
 */
export const uiComponentMocks = {
  Button: jest.fn(
    ({
      children,
      variant,
      size,
      onClick,
      disabled,
      className,
      asChild,
      ...props
    }: {
      children?: React.ReactNode
      variant?: string
      size?: string
      onClick?: (e: React.MouseEvent) => void
      disabled?: boolean
      className?: string
      asChild?: boolean
      [key: string]: unknown
    }) => {
      // When asChild is true, wrap children in a span with data attributes
      if (asChild) {
        return React.createElement(
          'span',
          {
            'data-testid': 'button-wrapper',
            'data-size': size,
            className,
            'data-as-child': asChild,
            ...props,
          },
          children
        )
      }
      return React.createElement(
        'button',
        {
          'data-testid': props['data-testid'] || 'button',
          'data-variant': variant,
          'data-size': size,
          className,
          disabled,
          'data-as-child': asChild,
          onClick: (e: React.MouseEvent) => {
            if (onClick && !disabled) {
              onClick(e)
            }
          },
          ...props,
        },
        children
      )
    }
  ),
  Card: jest.fn(({ children, className, ...props }: { children?: React.ReactNode; className?: string; [key: string]: unknown }) =>
    React.createElement('div', { 'data-testid': props['data-testid'] || 'error-card', className, ...props }, children)
  ),
  CardContent: jest.fn(({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement('div', { 'data-testid': 'card-content', className }, children)
  ),
  CardHeader: jest.fn(({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement('div', { 'data-testid': 'card-header', className }, children)
  ),
  CardTitle: jest.fn(({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement('h2', { 'data-testid': 'card-title', className }, children)
  ),
  CardFooter: jest.fn(({ children, className }: { children?: React.ReactNode; className?: string }) =>
    React.createElement('div', { 'data-testid': 'card-footer', className }, children)
  ),
  Input: jest.fn((props: React.InputHTMLAttributes<HTMLInputElement>) =>
    React.createElement('input', { 'data-testid': `input-${props.id}`, ...props })
  ),
  Textarea: jest.fn((props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) =>
    React.createElement('textarea', { 'data-testid': `textarea-${props.id}`, ...props })
  ),
  Label: jest.fn(({ children, htmlFor, className }: { 
    children?: React.ReactNode
    htmlFor?: string
    className?: string
  }) =>
    React.createElement('label', { 
      'data-testid': `label-${htmlFor}`, 
      htmlFor, 
      className 
    }, children)
  ),
  Skeleton: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'skeleton', className: `${className} skeleton animate-pulse` })
  ),
}

/**
 * Mock Select Components
 */
export const selectMocks = {
  Select: jest.fn(({ value, onValueChange, children }: {
    value?: string
    onValueChange?: (value: string) => void
    children?: React.ReactNode
  }) =>
    React.createElement('div', { 'data-testid': 'select', 'data-value': value }, [
      children,
      React.createElement('select', {
        key: 'select-input',
        'data-testid': 'select-input',
        value,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onValueChange?.(e.target.value),
      }, [
        React.createElement('option', { key: 'empty', value: '' }, 'Select...'),
        React.createElement('option', { key: 'general', value: 'general' }, 'General'),
        React.createElement('option', { key: 'sales', value: 'sales' }, 'Sales'),
        React.createElement('option', { key: 'support', value: 'support' }, 'Support'),
        React.createElement('option', { key: 'partnership', value: 'partnership' }, 'Partnership'),
        React.createElement('option', { key: 'feedback', value: 'feedback' }, 'Feedback'),
      ])
    ])
  ),
  SelectContent: jest.fn(({ children }: { children?: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'select-content' }, children)
  ),
  SelectItem: jest.fn(({ children, value }: { children?: React.ReactNode; value: string }) =>
    React.createElement('div', { 'data-testid': `select-item-${value}`, 'data-value': value }, children)
  ),
  SelectTrigger: jest.fn(({ children, id }: { children?: React.ReactNode; id?: string }) =>
    React.createElement('div', { 'data-testid': 'select-trigger', id }, children)
  ),
  SelectValue: jest.fn(({ placeholder }: { placeholder?: string }) =>
    React.createElement('span', { 'data-testid': 'select-value', 'data-placeholder': placeholder }, placeholder)
  ),
}

/**
 * Mock Form Components
 */
export const formMocks = {
  Form: jest.fn(({ children }: { children?: React.ReactNode }) => React.createElement(React.Fragment, null, children)),
  FormControl: jest.fn(({ children }: { children?: React.ReactNode }) => React.createElement(React.Fragment, null, children)),
  FormDescription: jest.fn(({ children }: { children?: React.ReactNode }) =>
    React.createElement('p', { 'data-testid': 'form-description' }, children)
  ),
  FormField: jest.fn(({ render }: { render: (props: { field: unknown }) => React.ReactElement }) =>
    render({ field: { onChange: jest.fn(), value: '', name: 'field' } })
  ),
  FormItem: jest.fn(({ children }: { children?: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'form-item' }, children)
  ),
  FormLabel: jest.fn(({ children }: { children?: React.ReactNode }) =>
    React.createElement('label', { 'data-testid': 'form-label' }, children)
  ),
  FormMessage: jest.fn(() => React.createElement('span', { 'data-testid': 'form-message' })),
}

/**
 * Mock React Hook Form
 */
export const reactHookFormMocks = {
  useForm: jest.fn(() => ({
    control: {},
    handleSubmit: (fn: (data: unknown) => void) => (e: React.FormEvent) => {
      e.preventDefault()
      fn({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        subject: 'general',
        message: 'Test message content',
      })
    },
    formState: {
      errors: {},
      isSubmitting: false,
      isSubmitSuccessful: false,
    },
    setError: jest.fn(),
    reset: jest.fn(),
    setValue: jest.fn(),
    clearErrors: jest.fn(),
  })),
  Controller: jest.fn(({ render }: { render: (props: unknown) => React.ReactElement }) =>
    render({ field: { onChange: jest.fn(), value: '', name: 'field' } })
  ),
  FormProvider: jest.fn(({ children }: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children)
  ),
}

/**
 * Mock hookform/resolvers
 */
export const hookformResolversMocks = {
  zodResolver: jest.fn(() => jest.fn()),
}

/**
 * Mock Carousel Components
 */
export const carouselMocks = {
  Carousel: jest.fn(({ 
    children, 
    className, 
    plugins, 
    opts,
    setApi
  }: { 
    children?: React.ReactNode
    className?: string
    plugins?: unknown[]
    opts?: unknown
    setApi?: (api: unknown) => void
  }) => {
    React.useEffect(() => {
      const mockApi = {
        selectedScrollSnap: jest.fn(() => 0),
        canScrollPrev: jest.fn(() => false),
        canScrollNext: jest.fn(() => true),
        scrollNext: jest.fn(),
        scrollPrev: jest.fn(),
        scrollTo: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
      }
      setApi?.(mockApi)
    }, [setApi])
    
    return React.createElement('div', {
      'data-testid': 'carousel',
      className,
      'data-plugins': JSON.stringify(plugins),
      'data-opts': JSON.stringify(opts),
    }, children)
  }),
  CarouselContent: jest.fn(({ 
    children, 
    className 
  }: { 
    children?: React.ReactNode
    className?: string
  }) =>
    React.createElement('div', { 
      'data-testid': 'carousel-content', 
      className 
    }, children)
  ),
  CarouselItem: jest.fn(({ 
    children, 
    className 
  }: { 
    children?: React.ReactNode
    className?: string
  }) =>
    React.createElement('div', { 
      'data-testid': 'carousel-item', 
      className 
    }, children)
  ),
  CarouselPrevious: jest.fn(({ className }: { className?: string }) =>
    React.createElement('button', { 
      'data-testid': 'carousel-previous', 
      className 
    }, 'Previous')
  ),
  CarouselNext: jest.fn(({ className }: { className?: string }) =>
    React.createElement('button', { 
      'data-testid': 'carousel-next', 
      className 
    }, 'Next')
  ),
}

/**
 * Mock Embla Carousel Autoplay
 */
export const mockAutoplay = jest.fn((options: { delay?: number; stopOnInteraction?: boolean }) => ({
  name: 'autoplay',
  options,
  init: jest.fn(),
  destroy: jest.fn(),
}))

/**
 * Mock Lucide React Icons
 */
export const lucideIconMocks = {
  CheckCircle: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'check-circle-icon', className })
  ),
  Users: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'users-icon', className })
  ),
  Globe: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'globe-icon', className })
  ),
  Award: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'award-icon', className })
  ),
  MapPin: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'map-pin-icon', className })
  ),
  Phone: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'phone-icon', className })
  ),
  Mail: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'mail-icon', className })
  ),
  Clock: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'clock-icon', className })
  ),
  MessageCircle: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'message-circle-icon', className })
  ),
  LayoutDashboard: jest.fn(() => 
    React.createElement('span', { 'data-testid': 'dashboard-icon' })
  ),
  ShoppingCart: jest.fn(({ className }: { className?: string }) => 
    React.createElement('span', { 'data-testid': 'shopping-cart-icon', className })
  ),
  Menu: jest.fn(() => 
    React.createElement('span', { 'data-testid': 'menu-icon' })
  ),
  X: jest.fn(() => 
    React.createElement('span', { 'data-testid': 'x-icon' })
  ),
  Send: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'send-icon', className }, 'Send')
  ),
  AlertCircle: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'alert-circle-icon', className }, '!')
  ),
  Loader2: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'loader-icon', className }, 'Loading')
  ),
  Filter: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'filter-icon', className }, 'Filter Icon')
  ),
  Search: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'search-icon', className }, 'Search Icon')
  ),
  Tag: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'tag-icon', className })
  ),
  Minus: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'minus-icon', className })
  ),
  Plus: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'plus-icon', className })
  ),
  ChevronLeft: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'chevron-left-icon', className })
  ),
  ChevronRight: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'chevron-right-icon', className })
  ),
  RefreshCw: jest.fn(({ className }: { className?: string }) =>
    React.createElement('div', { 'data-testid': 'refresh-cw', className })
  ),
  ArrowRight: jest.fn(({ className }: { className?: string }) =>
    React.createElement('span', { 'data-testid': 'arrow-right-icon', className }, '→')
  ),
}

/**
 * Export module mocks for specific test files
 */
export const productsComponentModule = {
  ProductsPage: pageMocks.ProductsPage,
}

export const bookmarkProviderModule = {
  BookmarkProvider: pageMocks.BookmarkProvider,
}

/**
 * Mock auth service
 */
export const authServiceMocks = {
  useAuthService: jest.fn(() => ({
    isLoaded: true,
    isSignedIn: false,
    user: null,
    requireAuth: jest.fn(),
    requireCustomer: jest.fn(),
    hasRole: jest.fn(),
    hasCustomerId: jest.fn(),
    isValidCustomer: jest.fn(),
    isCustomer: false,
    isAdmin: false,
    isStaff: false,
  })),
}

/**
 * Mock server actions
 */
export const serverActionMocks = {
  submitContactForm: jest.fn().mockResolvedValue({ success: true }),
}

/**
 * Mock Campaign components
 */
export const campaignComponentMocks = {
  SliderSlide: jest.fn(({ product, onClick }: { product: { stock_id: string; stock_name: string }; onClick?: () => void }) =>
    React.createElement(
      'div',
      {
        'data-testid': `slider-slide-${product.stock_id}`,
        onClick,
      },
      `Slide: ${product.stock_name}`
    )
  ),
  SliderControls: jest.fn(({
    total,
    current,
    onPrevious,
    onNext,
    onSelect,
    canScrollPrev,
    canScrollNext,
  }: {
    total: number
    current: number
    onPrevious: () => void
    onNext: () => void
    onSelect: (index: number) => void
    canScrollPrev: boolean
    canScrollNext: boolean
  }) =>
    React.createElement('div', { 'data-testid': 'slider-controls' }, [
      React.createElement(
        'button',
        {
          key: 'prev',
          'data-testid': 'prev-button',
          onClick: onPrevious,
          disabled: !canScrollPrev,
        },
        'Previous'
      ),
      React.createElement(
        'button',
        {
          key: 'next',
          'data-testid': 'next-button',
          onClick: onNext,
          disabled: !canScrollNext,
        },
        'Next'
      ),
      React.createElement('span', { key: 'current', 'data-testid': 'current-index' }, String(current)),
      React.createElement('span', { key: 'total', 'data-testid': 'total-items' }, String(total)),
      ...Array.from({ length: total }, (_, i) =>
        React.createElement(
          'button',
          {
            key: `indicator-${i}`,
            'data-testid': `indicator-${i}`,
            onClick: () => onSelect(i),
          },
          String(i)
        )
      ),
    ])
  ),
  SliderNavigationButton: jest.fn(({
    direction,
    onClick,
    disabled,
  }: {
    direction: 'prev' | 'next'
    onClick?: () => void
    disabled?: boolean
  }) =>
    React.createElement(
      'button',
      {
        'data-testid': `nav-button-${direction}`,
        onClick,
        disabled,
        'data-direction': direction,
      },
      direction === 'prev' ? 'Previous' : 'Next'
    )
  ),
  SliderIndicator: jest.fn(({
    total,
    current,
    onSelect,
  }: {
    total: number
    current: number
    onSelect?: (index: number) => void
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'slider-indicator',
        'data-total': total,
        'data-current': current,
      },
      Array.from({ length: total }, (_, index) =>
        React.createElement(
          'button',
          {
            key: index,
            'data-testid': `indicator-${index}`,
            onClick: () => onSelect?.(index),
            'data-active': index === current,
          },
          String(index + 1)
        )
      )
    )
  ),
  CampaignGridError: jest.fn(({ error, onRetry }: { error: Error; onRetry?: () => void }) => {
    return React.createElement('div', { 'data-testid': 'grid-error', 'data-has-retry': !!onRetry }, [
      React.createElement('span', { key: 'error' }, `Error: ${error.message}`),
      onRetry ? React.createElement('button', { key: 'retry', onClick: onRetry }, 'Retry') : null,
    ].filter(Boolean))
  }),
  QuantityCounter: jest.fn(({
    quantity,
    onDecrease,
    onIncrease,
    disabled,
  }: {
    quantity: number
    onDecrease: () => void
    onIncrease: () => void
    disabled?: boolean
  }) =>
    React.createElement('div', { 'data-testid': 'quantity-counter', 'data-disabled': disabled }, [
      React.createElement(
        'button',
        {
          key: 'decrease',
          'data-testid': 'decrease-button',
          onClick: onDecrease,
          disabled,
        },
        '-'
      ),
      React.createElement('span', { key: 'display', 'data-testid': 'quantity-display' }, String(quantity)),
      React.createElement(
        'button',
        {
          key: 'increase',
          'data-testid': 'increase-button',
          onClick: onIncrease,
          disabled,
        },
        '+'
      ),
    ])
  ),
  DiscountBadge: jest.fn(({
    originalPrice,
    discountedPrice,
  }: {
    originalPrice: number
    discountedPrice: number
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'discount-badge',
        'data-original-price': originalPrice,
        'data-discounted-price': discountedPrice,
      },
      'Discount Badge'
    )
  ),
  SliderOverlay: jest.fn(({
    stock_name,
    stock_unit,
    stock_price,
    campaign_price,
  }: {
    stock_name: string
    stock_unit: string
    stock_price: number
    campaign_price: number
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'slider-overlay',
        'data-stock-name': stock_name,
        'data-stock-unit': stock_unit,
        'data-stock-price': stock_price,
        'data-campaign-price': campaign_price,
      },
      'Slider Overlay'
    )
  ),
  ProductImage: jest.fn(({ src, alt }: { src: string; alt: string }) =>
    React.createElement(
      'div',
      { 'data-testid': 'product-image', 'data-src': src, 'data-alt': alt },
      'Product Image'
    )
  ),
  ProductInfo: jest.fn(({
    stock_name,
    stock_group,
    stock_id,
    stock_unit,
  }: {
    stock_name: string
    stock_group: string
    stock_id: string
    stock_unit: string
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'product-info',
        'data-stock-name': stock_name,
        'data-stock-group': stock_group,
        'data-stock-id': stock_id,
        'data-stock-unit': stock_unit,
      },
      'Product Info'
    )
  ),
  PriceDisplay: jest.fn(({
    stock_price,
    campaign_price,
  }: {
    stock_price: number
    campaign_price: number
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'price-display',
        'data-stock-price': stock_price,
        'data-campaign-price': campaign_price,
      },
      'Price Display'
    )
  ),
  CampaignProductCard: jest.fn(({
    product,
    onAddToCart,
  }: {
    product: { stock_id: string; stock_name: string }
    onAddToCart?: (stockId: string, quantity: number) => void
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': `product-card-${product.stock_id}`,
        'data-product-id': product.stock_id,
        'data-has-callback': !!onAddToCart,
      },
      `Product Card: ${product.stock_name}`
    )
  ),
  CampaignCardSkeleton: jest.fn(() =>
    React.createElement(
      'div',
      { 'data-testid': 'skeleton' },
      'Loading Skeleton'
    )
  ),
  CampaignProductsGrid: jest.fn(({
    products,
    isLoading,
    error,
    onAddToCart,
    onRetry,
    skeletonCount,
  }: {
    products: Array<{ stock_id: string; stock_name: string }>
    isLoading: boolean
    error: Error | null
    onAddToCart?: (stockId: string, quantity: number) => void
    onRetry?: () => void
    skeletonCount?: number
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'campaign-products-grid',
        'data-products-count': products.length,
        'data-is-loading': isLoading,
        'data-has-error': !!error,
        'data-skeleton-count': skeletonCount,
      },
      [
        error ? React.createElement('div', { key: 'error', 'data-testid': 'error-display' }, [
          `Error: ${error.message}`,
          onRetry ? React.createElement(
            'button',
            { key: 'retry', 'data-testid': 'retry-button', onClick: onRetry },
            'Retry'
          ) : null,
        ]) : null,
        !error ? products.map(product =>
          React.createElement(
            'div',
            {
              key: product.stock_id,
              'data-testid': `product-${product.stock_id}`,
            },
            [
              product.stock_name,
              onAddToCart ? React.createElement(React.Fragment, { key: 'buttons' }, [
                React.createElement(
                  'button',
                  {
                    key: 'add-single',
                    'data-testid': `add-to-cart-${product.stock_id}`,
                    onClick: () => onAddToCart(product.stock_id, 1),
                  },
                  'Add to Cart'
                ),
                React.createElement(
                  'button',
                  {
                    key: 'add-multiple',
                    'data-testid': `add-to-cart-multiple-${product.stock_id}`,
                    onClick: () => onAddToCart(product.stock_id, 3),
                  },
                  'Add 3 to Cart'
                ),
              ]) : null,
            ]
          )
        ) : null,
      ].filter(Boolean)
    )
  ),
  CampaignErrorBoundary: jest.fn(({
    children,
    onRetry,
  }: {
    children: React.ReactNode
    onRetry?: () => void
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'error-boundary',
        'data-has-retry': !!onRetry,
      },
      children
    )
  ),
  CardActions: jest.fn(({
    product,
    disabled,
    onAddToCart,
    className,
  }: {
    product: { stock_id: string }
    disabled: boolean
    onAddToCart?: (product: unknown, quantity: number) => void
    className?: string
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': 'card-actions',
        'data-stock-id': product?.stock_id,
        'data-disabled': disabled,
        'data-has-callback': !!onAddToCart,
        className,
      },
      React.createElement(
        'button',
        {
          onClick: () => onAddToCart?.(product, 1),
        },
        'Add to Cart'
      )
    )
  ),
}

/**
 * Test utility components
 */
export const testUtilityComponents = {
  ThrowError: ({ shouldThrow }: { shouldThrow: boolean }) => {
    if (shouldThrow) {
      throw new Error('Test error message')
    }
    return React.createElement('div', { 'data-testid': 'child-content' }, 'Child content')
  },
  ComponentWithLifecycleError: class extends React.Component {
    override componentDidMount() {
      throw new Error('Lifecycle error')
    }
    override render() {
      return React.createElement('div', null, 'Component')
    }
  },
  BrokenComponent: () => {
    throw new Error('Render phase error')
  },
  CustomError: ({ message }: { message: string }) => {
    throw new Error(message)
  },
}

/**
 * Mock About Us components
 */
export const aboutUsComponentMocks = {
  ImageSlider: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'image-slider' }, 'Image Slider Component')
  ),
  AboutTitle: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'about-title' }, 'About Title Component')
  ),
  AboutContent: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'about-content' }, 'About Content Component')
  ),
  GoogleMapsEmbed: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'google-maps' }, 'Google Maps Component')
  ),
  ContactForm: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'contact-form' }, 'Contact Form Component')
  ),
  ContactInfo: jest.fn(() =>
    React.createElement('div', { 'data-testid': 'contact-info' }, 'Contact Info Component')
  ),
}

/**
 * Mock toast utility
 */
export const toastMock = {
  error: jest.fn(),
  success: jest.fn(),
  warning: jest.fn(),
  info: jest.fn(),
  loading: jest.fn(),
  promise: jest.fn(),
  custom: jest.fn(),
  dismiss: jest.fn(),
}

/**
 * Mock sonner toast
 */
export const sonnerMocks = {
  toast: {
    info: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
  },
}

/**
 * Mock utils
 */
export const utilsMocks = {
  cn: jest.fn((...classes: (string | undefined | boolean)[]) =>
    classes.filter(Boolean).join(' ')
  ),
}

/**
 * Mock Next.js components
 */
export const nextMocks = {
  Link: jest.fn(({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children)
  ),
}

/**
 * Export combined mocks for components/providers
 */
export const componentProviderMocks = {
  '@/components/providers': providerMocks,
  '@/components/layout': layoutMocks,
}
