# 🎯 Usage Guide - ATP Store

Comprehensive guide for using ATP Store features and workflows.

## 👥 User Roles

### Customer Role
- Browse products and categories
- Add items to cart
- Create and track orders
- Manage bookmarks/favorites
- View order history

### Admin Role
- All customer capabilities
- Access admin dashboard
- Manage orders and deliveries
- View analytics and metrics
- Switch between customer accounts

## 🛍️ Customer Features

### Product Browsing

#### Browse by Category
```typescript
// Navigate to categories
/categories

// View specific category
/categories/tissue-paper
/categories/cleaning-supplies
```

#### Search Products
```typescript
// Search with filters
/products?search=tissue&sort=price_asc

// Filter by attributes
/products?category=paper&inStock=true&priceRange=10-50
```

### Shopping Cart

#### Add to Cart
```typescript
// Product page actions
1. Navigate to product
2. Select quantity
3. Click "Add to Cart"
4. Cart updates in real-time
```

#### Manage Cart
```typescript
// Cart operations
- Update quantities
- Remove items
- Apply discount codes
- Calculate shipping
- View total with taxes
```

### Checkout Process

#### Step-by-step Checkout
```typescript
1. Review cart items
2. Enter/select shipping address
3. Choose delivery method
4. Review order summary
5. Place order
6. Receive confirmation email
```

### Bookmarks/Favorites

#### Save Products
```typescript
// Bookmark products
1. Click bookmark icon on product
2. View in /favorites
3. Quick add to cart from favorites
4. See "Most Purchased" section
```

## 👨‍💼 Admin Features

### Admin Dashboard

#### Access Dashboard
```typescript
// Admin routes
/admin/dashboard         // Overview metrics
/admin/orders           // Order management
/admin/customers        // Customer management
/admin/products         // Product management
/admin/analytics        // Analytics & reports
```

### Order Management

#### Process Orders
```typescript
// Order workflow
1. View pending orders
2. Update order status:
   - Pending → Processing
   - Processing → Shipped
   - Shipped → Delivered
3. Generate invoices
4. Send notifications
```

#### Manage Deliveries
```typescript
// Delivery tracking
- View delivery schedule
- Update delivery status
- Print delivery notes
- Track delivery history
```

### Customer Management

#### Switch Customer Context
```typescript
// Admin customer switching
1. Go to /admin/customers
2. Select customer
3. Click "View as Customer"
4. Browse as that customer
5. Return to admin view
```

## 🌍 Internationalization

### Change Language
```typescript
// Available languages
- English (en)
- Svenska (sv) - Default
- Türkçe (tr)
- Dansk (da)
- Deutsch (de)

// Language switcher in navbar
Click flag icon → Select language
```

### Language Persistence
```typescript
// Language saved in:
- User preferences (if logged in)
- localStorage (for guests)
- Synced across sessions
```

## 🎨 Theme Management

### Toggle Theme
```typescript
// Theme options
- Light mode (default)
- Dark mode
- System preference

// Toggle via navbar
Click theme icon → Select mode
```

## 📊 Data Management

### Export Data

#### Export Orders
```typescript
// Admin export options
/admin/orders → Export → Select format:
- CSV
- Excel
- PDF
```

#### Generate Reports
```typescript
// Available reports
- Sales summary
- Product performance
- Customer analytics
- Inventory status
```

## 🔍 Search & Filters

### Advanced Search
```typescript
// Search syntax
"exact phrase"          // Exact match
tissue OR paper        // OR operator
+required -excluded    // Include/exclude

// Filter combinations
category:paper AND price:<50 AND inStock:true
```

### Saved Searches
```typescript
// Save search criteria
1. Perform search
2. Click "Save Search"
3. Name the search
4. Access from dropdown
```

## 📱 Mobile Features

### Progressive Web App
```typescript
// Install as app
1. Visit site on mobile
2. Click "Add to Home Screen"
3. Access offline features
4. Receive push notifications
```

### Mobile-Optimized Views
```typescript
// Responsive features
- Swipe gestures for navigation
- Touch-optimized buttons
- Mobile-specific layouts
- Optimized image loading
```

## 🔔 Notifications

### Email Notifications
```typescript
// Automated emails
- Order confirmation
- Shipping updates
- Delivery confirmation
- Password reset
- Account changes
```

### In-App Notifications
```typescript
// Real-time updates
- Cart updates
- Price changes
- Stock alerts
- Order status changes
```

## ⌨️ Keyboard Shortcuts

### Global Shortcuts
```
Ctrl/Cmd + K    - Quick search
Ctrl/Cmd + /    - Show shortcuts
Escape          - Close modals
Tab             - Navigate elements
```

### Admin Shortcuts
```
Alt + D         - Dashboard
Alt + O         - Orders
Alt + C         - Customers
Alt + P         - Products
```

## 🔐 Security Features

### Account Security
```typescript
// Security measures
- Two-factor authentication
- Session management
- Login history
- Device management
```

### Data Privacy
```typescript
// Privacy controls
- Export personal data
- Delete account
- Manage cookies
- Control tracking
```

## 📈 Analytics & Metrics

### Customer Analytics
```typescript
// Available metrics
- Purchase history
- Browsing patterns
- Cart abandonment
- Product preferences
```

### Admin Analytics
```typescript
// Business metrics
- Revenue trends
- Conversion rates
- Customer lifetime value
- Product performance
```

## 🧪 Testing Features

### Test Accounts
```typescript
// Demo credentials
Customer:
- Email: customer@demo.com
- Password: Demo123!

Admin:
- Email: admin@demo.com
- Password: Admin123!
```

### Test Payment
```typescript
// Test card numbers
Visa: 4242 4242 4242 4242
Mastercard: 5555 5555 5555 4444
Any CVV: 123
Any future date
```

## 🚀 Advanced Features

### Bulk Operations
```typescript
// Admin bulk actions
- Select multiple items
- Choose action:
  - Update status
  - Export
  - Delete
  - Archive
```

### API Integration
```typescript
// External integrations
- Webhook endpoints
- REST API access
- GraphQL queries
- Real-time subscriptions
```

## 📞 Support

### Getting Help
```typescript
// Support channels
- In-app chat widget
- Email: support@atpstore.com
- Help center: /help
- FAQ: /faq
```

### Reporting Issues
```typescript
// Bug reporting
1. Click "Report Issue"
2. Describe the problem
3. Attach screenshots
4. Submit ticket
5. Track resolution
```

## 🎓 Next Steps

- 🏗️ Learn the [Architecture](ARCHITECTURE.md)
- 🤝 Start [Contributing](CONTRIBUTING.md)
- 📡 Explore [API Reference](API.md)
- 🚀 Deploy with [Deployment Guide](DEPLOYMENT.md)