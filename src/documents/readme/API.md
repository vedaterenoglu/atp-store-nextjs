# 📡 API Reference - ATP Store

Complete API documentation for REST endpoints and GraphQL operations.

## 🌐 API Overview

### Base URLs
```typescript
// Development
http://localhost:3000/api

// Staging
https://staging.atpstore.com/api

// Production
https://api.atpstore.com
```

### Authentication
```typescript
// Headers required for authenticated requests
{
  'Authorization': 'Bearer <clerk-token>',
  'Content-Type': 'application/json',
  'X-Customer-Id': 'customer-uuid' // For admin switching
}
```

## 🔄 REST API Endpoints

### Products

#### GET /api/products
```typescript
// Get product list
GET /api/products?category=paper&limit=20&offset=0

// Response
{
  "data": [
    {
      "id": "prod_123",
      "name": "Premium Tissue Paper",
      "price": 49.99,
      "category": "paper",
      "inStock": true
    }
  ],
  "total": 150,
  "hasMore": true
}
```

#### GET /api/products/[id]
```typescript
// Get single product
GET /api/products/prod_123

// Response
{
  "id": "prod_123",
  "name": "Premium Tissue Paper",
  "description": "High quality tissue paper",
  "price": 49.99,
  "images": ["url1", "url2"],
  "specifications": {},
  "stock": 500
}
```

#### GET /api/products/prices
```typescript
// Get customer-specific prices
GET /api/products/prices?productIds=prod_123,prod_456&customerId=cust_789

// Response
{
  "prices": {
    "prod_123": 45.99,
    "prod_456": 32.50
  },
  "currency": "SEK",
  "priceList": "customer_special"
}
```

### Categories

#### GET /api/categories
```typescript
// Get all categories
GET /api/categories

// Response
{
  "categories": [
    {
      "id": "cat_tissue",
      "name": "Tissue Paper",
      "slug": "tissue-paper",
      "productCount": 45,
      "image": "url"
    }
  ]
}
```

### Cart

#### POST /api/cart/add
```typescript
// Add item to cart
POST /api/cart/add
{
  "productId": "prod_123",
  "quantity": 5,
  "customerId": "cust_789"
}

// Response
{
  "success": true,
  "cart": {
    "items": [...],
    "total": 249.95,
    "itemCount": 5
  }
}
```

#### PUT /api/cart/update
```typescript
// Update cart item
PUT /api/cart/update
{
  "itemId": "item_456",
  "quantity": 10
}

// Response
{
  "success": true,
  "updatedItem": {...},
  "newTotal": 499.90
}
```

#### DELETE /api/cart/remove
```typescript
// Remove item from cart
DELETE /api/cart/remove/item_456

// Response
{
  "success": true,
  "removedItemId": "item_456"
}
```

### Orders

#### POST /api/orders/create
```typescript
// Create order
POST /api/orders/create
{
  "customerId": "cust_789",
  "items": [
    {
      "productId": "prod_123",
      "quantity": 5,
      "price": 45.99
    }
  ],
  "shippingAddress": {...},
  "paymentMethod": "invoice"
}

// Response
{
  "orderId": "ord_12345",
  "orderNumber": "ATP-2025-0001",
  "status": "pending",
  "total": 229.95,
  "createdAt": "2025-08-16T10:00:00Z"
}
```

#### GET /api/orders/[id]
```typescript
// Get order details
GET /api/orders/ord_12345

// Response
{
  "orderId": "ord_12345",
  "orderNumber": "ATP-2025-0001",
  "customer": {...},
  "items": [...],
  "status": "processing",
  "timeline": [...]
}
```

### Bookmarks

#### GET /api/bookmarks
```typescript
// Get user bookmarks
GET /api/bookmarks?userId=user_123

// Response
{
  "bookmarks": [
    {
      "id": "book_456",
      "productId": "prod_123",
      "product": {...},
      "createdAt": "2025-08-15T10:00:00Z"
    }
  ]
}
```

#### POST /api/bookmarks/toggle
```typescript
// Toggle bookmark
POST /api/bookmarks/toggle
{
  "productId": "prod_123",
  "userId": "user_123"
}

// Response
{
  "bookmarked": true,
  "bookmarkId": "book_789"
}
```

### Admin Endpoints

#### GET /api/admin/dashboard
```typescript
// Get dashboard metrics
GET /api/admin/dashboard

// Response
{
  "metrics": {
    "totalOrders": 1250,
    "pendingOrders": 23,
    "revenue": 458900,
    "customers": 187
  },
  "charts": {...},
  "recentOrders": [...]
}
```

#### GET /api/admin/orders
```typescript
// Get all orders (admin)
GET /api/admin/orders?status=pending&limit=50

// Response
{
  "orders": [...],
  "total": 23,
  "statuses": {
    "pending": 23,
    "processing": 45,
    "delivered": 1182
  }
}
```

#### PUT /api/admin/orders/[id]/status
```typescript
// Update order status
PUT /api/admin/orders/ord_12345/status
{
  "status": "processing",
  "note": "Payment received"
}

// Response
{
  "success": true,
  "order": {...},
  "notification": "Customer notified"
}
```

## 📊 GraphQL Operations

### Queries

#### GetProducts
```graphql
query GetProducts($limit: Int, $offset: Int, $category: String) {
  products(
    limit: $limit
    offset: $offset
    where: { category: { _eq: $category } }
  ) {
    id
    name
    description
    price
    category
    images
    inStock
  }
}
```

#### GetProductById
```graphql
query GetProductById($id: uuid!) {
  products_by_pk(id: $id) {
    id
    name
    description
    price
    specifications
    images
    category
    stock
    created_at
    updated_at
  }
}
```

#### GetCustomerPrices
```graphql
query GetCustomerPrices($customerId: uuid!, $productIds: [uuid!]!) {
  customer_prices(
    where: {
      customer_id: { _eq: $customerId }
      product_id: { _in: $productIds }
    }
  ) {
    product_id
    price
    discount_percentage
    valid_from
    valid_to
  }
}
```

#### GetOrders
```graphql
query GetOrders($customerId: uuid!, $limit: Int) {
  orders(
    where: { customer_id: { _eq: $customerId } }
    limit: $limit
    order_by: { created_at: desc }
  ) {
    id
    order_number
    status
    total
    items {
      product {
        name
        image
      }
      quantity
      price
    }
    created_at
  }
}
```

### Mutations

#### CreateOrder
```graphql
mutation CreateOrder($input: orders_insert_input!) {
  insert_orders_one(object: $input) {
    id
    order_number
    status
    total
    created_at
  }
}
```

#### UpdateOrderStatus
```graphql
mutation UpdateOrderStatus($id: uuid!, $status: String!) {
  update_orders_by_pk(
    pk_columns: { id: $id }
    _set: { status: $status }
  ) {
    id
    status
    updated_at
  }
}
```

#### ToggleBookmark
```graphql
mutation ToggleBookmark($userId: uuid!, $productId: uuid!) {
  insert_bookmarks_one(
    object: {
      user_id: $userId
      product_id: $productId
    }
    on_conflict: {
      constraint: bookmarks_pkey
      update_columns: []
    }
  ) {
    id
    created_at
  }
}
```

### Subscriptions

#### OrderStatusUpdates
```graphql
subscription OrderStatusUpdates($orderId: uuid!) {
  orders_by_pk(id: $orderId) {
    id
    status
    updated_at
    timeline
  }
}
```

#### InventoryUpdates
```graphql
subscription InventoryUpdates($productIds: [uuid!]!) {
  products(where: { id: { _in: $productIds } }) {
    id
    stock
    inStock
  }
}
```

## 🔐 Authentication & Authorization

### Clerk Token Validation
```typescript
// Server-side validation
import { auth } from '@clerk/nextjs'

export async function GET(request: Request) {
  const { userId, sessionClaims } = auth()
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  const role = sessionClaims?.metadata?.role
  // Process request based on role
}
```

### Role-Based Access
```typescript
// Role permissions
const permissions = {
  customer: ['read:products', 'write:orders', 'write:bookmarks'],
  admin: ['*'] // All permissions
}

// Check permission
function hasPermission(user: User, action: string): boolean {
  const userPermissions = permissions[user.role]
  return userPermissions.includes('*') || userPermissions.includes(action)
}
```

## 🛡️ Rate Limiting

### Limits by Endpoint
```typescript
// Rate limits (requests per minute)
const rateLimits = {
  '/api/products': 100,
  '/api/orders/create': 10,
  '/api/admin/*': 50,
  '/api/auth/*': 5
}
```

### Rate Limit Headers
```typescript
// Response headers
{
  'X-RateLimit-Limit': '100',
  'X-RateLimit-Remaining': '95',
  'X-RateLimit-Reset': '1692180000'
}
```

## 🔄 Webhooks

### Order Events
```typescript
// Webhook payload
POST https://your-endpoint.com/webhooks/orders
{
  "event": "order.created",
  "data": {
    "orderId": "ord_12345",
    "customerId": "cust_789",
    "total": 229.95
  },
  "timestamp": "2025-08-16T10:00:00Z",
  "signature": "sha256=..."
}
```

### Webhook Verification
```typescript
// Verify webhook signature
import crypto from 'crypto'

function verifyWebhook(payload: string, signature: string): boolean {
  const secret = process.env.WEBHOOK_SECRET
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return `sha256=${hash}` === signature
}
```

## 📝 Error Responses

### Standard Error Format
```typescript
// Error response structure
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID prod_123 not found",
    "details": {
      "productId": "prod_123"
    }
  },
  "timestamp": "2025-08-16T10:00:00Z",
  "requestId": "req_abc123"
}
```

### Common Error Codes
```typescript
// HTTP Status Codes
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
422 - Unprocessable Entity
429 - Too Many Requests
500 - Internal Server Error
503 - Service Unavailable
```

## 🧪 Testing API

### Test Endpoints
```bash
# Health check
curl http://localhost:3000/api/health

# Test with auth
curl -H "Authorization: Bearer <token>" \
     http://localhost:3000/api/products
```

### Postman Collection
Import collection: `docs/postman/atp-store.json`

### GraphQL Playground
Access at: `http://localhost:3000/api/graphql` (development only)

## 📊 API Metrics

### Monitoring
```typescript
// Track API usage
{
  "endpoint": "/api/products",
  "method": "GET",
  "responseTime": 145,
  "statusCode": 200,
  "userId": "user_123",
  "timestamp": "2025-08-16T10:00:00Z"
}
```

### Performance Targets
- p50 latency: < 100ms
- p95 latency: < 500ms
- p99 latency: < 1000ms
- Error rate: < 0.1%
- Uptime: > 99.9%

## 🔗 SDK & Client Libraries

### JavaScript/TypeScript
```typescript
import { ATPStoreClient } from '@atpstore/sdk'

const client = new ATPStoreClient({
  apiKey: 'your-api-key',
  environment: 'production'
})

const products = await client.products.list({
  category: 'paper',
  limit: 20
})
```

## 📚 Additional Resources

- [GraphQL Schema](./graphql-schema.md)
- [Postman Collection](./postman-collection.json)
- [API Changelog](./api-changelog.md)
- [Migration Guide](./migration-guide.md)