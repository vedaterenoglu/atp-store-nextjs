# Order Submission Flow Diagram

## Overview
The ATP Store order submission process involves multiple layers and components working together to create and process customer orders. The flow follows a Facade Pattern architecture where API routes act as facades over GraphQL operations.

## Flow Diagram

```mermaid
flowchart TD
    Start([User clicks Submit Order in Cart]) --> CheckCart{Cart has items?}
    
    CheckCart -->|No| ShowEmpty[Show empty cart state]
    CheckCart -->|Yes| FetchAddresses[Fetch customer addresses]
    
    FetchAddresses --> CallAddressService[AddressService.getCustomerAddresses]
    CallAddressService --> AddressAPI[/api/addresses endpoint]
    AddressAPI --> HasuraGraphQL1[Hasura GraphQL - Get Addresses]
    HasuraGraphQL1 --> ReturnAddresses[Return formatted addresses]
    
    ReturnAddresses --> CheckAddressCount{How many addresses?}
    
    CheckAddressCount -->|0| ShowError1[Show no addresses error]
    CheckAddressCount -->|1| AutoSelect[Auto-select single address]
    CheckAddressCount -->|>1| ShowModal[Show Address Selection Modal]
    
    ShowModal --> UserSelectsAddresses[User selects dispatch & invoice addresses]
    UserSelectsAddresses --> ProcessOrder
    AutoSelect --> ProcessOrder
    
    ProcessOrder[Process Order Creation] --> DetermineOrderType[Determine Order Type based on country]
    
    DetermineOrderType --> OrderTypeLogic{Which country?}
    OrderTypeLogic -->|Sweden| InlandOrder[Order Type: Inland]
    OrderTypeLogic -->|EU Countries| EUOrder[Order Type: Inside EU]
    OrderTypeLogic -->|Other| OutsideEUOrder[Order Type: Outside EU]
    
    InlandOrder --> SetLanguage1[Language: 'se']
    EUOrder --> SetLanguage2[Language: 'en']
    OutsideEUOrder --> SetLanguage2
    
    SetLanguage1 --> GenerateOrderNumber
    SetLanguage2 --> GenerateOrderNumber
    
    GenerateOrderNumber[Generate Order Number] --> CallOrderService1[OrderService.generateOrderNumber]
    CallOrderService1 --> OrderNumberAPI[/api/orders/generate-number]
    OrderNumberAPI --> HasuraGraphQL2[Hasura GraphQL - Update Company Order Number]
    HasuraGraphQL2 --> ReturnOrderNumber[Return order number + letter code]
    
    ReturnOrderNumber --> BuildOrderData[Build Order Data Structure]
    
    BuildOrderData --> PrepareOrderLines[Transform cart items to order lines]
    PrepareOrderLines --> CalculatePrices[Calculate prices, VAT, totals]
    CalculatePrices --> BuildOrderHeader[Build order header with all data]
    
    BuildOrderHeader --> CreateOrder[Create Order in Database]
    CreateOrder --> CallOrderService2[OrderService.createOrder]
    CallOrderService2 --> CreateOrderAPI[/api/orders/create]
    CreateOrderAPI --> HasuraGraphQL3[Hasura GraphQL - Insert Order Headers & Lines]
    
    HasuraGraphQL3 --> CheckSuccess{Order created successfully?}
    
    CheckSuccess -->|No| ShowError2[Show order creation error]
    CheckSuccess -->|Yes| PrepareConfirmation[Prepare confirmation data]
    
    PrepareConfirmation --> ShowConfirmationModal[Show Order Confirmation Modal]
    ShowConfirmationModal --> ClearCart[Clear shopping cart]
    ClearCart --> End([Order Complete])

    style Start fill:#90EE90
    style End fill:#90EE90
    style HasuraGraphQL1 fill:#FFB6C1
    style HasuraGraphQL2 fill:#FFB6C1
    style HasuraGraphQL3 fill:#FFB6C1
    style ShowError1 fill:#FF6B6B
    style ShowError2 fill:#FF6B6B
```

## Component Architecture

### 1. Frontend Layer
- **CustomerCartTemplate** (`src/components/cart/templates/CustomerCartTemplate.tsx`)
  - Main cart UI component
  - Handles checkout button click
  - Manages address selection and order submission flow

### 2. State Management (Zustand Stores)
- **CartStore** (`src/lib/stores/cart.store.ts`)
  - Manages cart items and quantities
  - Provides cart summary calculations
  
- **AddressStore** (`src/lib/stores/address.store.ts`)
  - Caches customer addresses
  - Provides address lookup by ID
  
- **OrderStore** (`src/lib/stores/order.store.ts`)
  - Manages order submission state
  - Controls modal visibility

### 3. Service Layer
- **OrderService** (`src/services/order.service.ts`)
  - Orchestrates order creation flow
  - Determines order type based on country
  - Builds order data structures
  - Calculates pricing and VAT
  
- **AddressService** (`src/services/address.service.ts`)
  - Fetches customer addresses
  - Formats address data

### 4. API Routes (Facade Pattern)
- **/api/orders/generate-number** (`src/app/api/orders/generate-number/route.ts`)
  - Generates unique order number
  - Updates company order counter
  
- **/api/orders/create** (`src/app/api/orders/create/route.ts`)
  - Creates order with all lines
  - Validates data with Zod schemas
  - Executes GraphQL mutation

### 5. GraphQL Layer (Hasura)
- **CreateOrderNumberMutation**
  - Updates company order counter
  - Returns new order number with letter code
  
- **CreateOrderHeadersMutation**
  - Inserts order header
  - Inserts related order lines (goods_transactions)
  - Returns created order details

## Data Flow Steps

1. **User Initiates Checkout**
   - User clicks "Submit Order" button in cart
   - System validates cart has items

2. **Address Selection**
   - Fetches customer addresses from database
   - If single address: auto-selects for both dispatch and invoice
   - If multiple addresses: shows selection modal

3. **Order Type Determination**
   - Based on invoice address country:
     - Sweden → "Inland" order
     - EU countries → "Inside EU" order  
     - Other countries → "Outside EU" order

4. **Order Number Generation**
   - Calls API to increment company order counter
   - Generates unique order number (e.g., "AL 130130")

5. **Order Data Preparation**
   - Transforms cart items to order lines
   - Calculates:
     - Unit prices and quantities
     - VAT amounts (per line)
     - Invoice prices
     - Total amounts

6. **Order Creation**
   - Submits complete order structure to database
   - Creates order header with customer, addresses, metadata
   - Creates related order lines (goods_transactions)

7. **Confirmation**
   - Shows order confirmation modal with all details
   - Clears shopping cart
   - User can continue shopping

## Security Considerations

- **Admin Secret**: Hasura admin secret only used in API routes (server-side)
- **Validation**: All data validated with Zod schemas before database operations
- **Error Handling**: Comprehensive error handling at each step
- **Type Safety**: Full TypeScript type safety throughout the flow

## Error Handling

The system handles errors at multiple levels:
- Network errors during API calls
- Validation errors from Zod schemas
- GraphQL mutation errors
- Business logic errors (no addresses, invalid country, etc.)

Each error is properly caught and displayed to the user with appropriate messaging.

## Technologies Used

- **Next.js**: App Router with Server Components
- **TypeScript**: Full type safety
- **Zustand**: Client-side state management
- **Hasura GraphQL**: Backend API
- **Zod**: Runtime validation
- **shadcn/ui**: UI components