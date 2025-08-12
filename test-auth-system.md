# Auth System Test Checklist

## Test Scenarios

### 1. Unauthenticated User
- [ ] Cart icon: Should NOT be visible in navbar
- [ ] Dashboard icon: Should NOT be visible
- [ ] Product Card "-" button: Disabled, shows "Please sign in to modify cart items" toast
- [ ] Product Card "+" button: Disabled, shows "Please sign in to add items to cart" toast
- [ ] Product Card "Add to Cart" button: Disabled, shows "Please sign in with a customer account to add items to cart" toast
- [ ] "Go to Cart" button: Shows "Please sign in to access cart" toast
- [ ] "My Bookmarks" button: Shows "Please sign in to access bookmarks" toast
- [ ] Direct access to /cart: Should redirect to sign-in
- [ ] Direct access to /favorites: Should redirect to sign-in
- [ ] Direct access to /customer/dashboard: Should redirect to sign-in
- [ ] Direct access to /admin/*: Should redirect to sign-in

### 2. Authenticated Customer (No Customer Selected)
- [ ] Cart icon: Should NOT be visible (no customer selected)
- [ ] Dashboard icon: Should NOT be visible
- [ ] Product Card "-" button: Disabled, shows "Please select a customer account" toast
- [ ] Product Card "+" button: Disabled, shows "Please select a customer account" toast
- [ ] Product Card "Add to Cart" button: Disabled, shows "Please select a customer account" toast
- [ ] "Go to Cart" button: Shows "Please select a customer account to access cart" toast
- [ ] "My Bookmarks" button: Shows "Please select a customer account to access bookmarks" toast
- [ ] Customer switcher modal should auto-open on sign-in

### 3. Authenticated Customer (With Customer Selected)
- [ ] Cart icon: Visible and clickable
- [ ] Dashboard icon: Visible and clickable
- [ ] Product Card "-" button: Enabled (when quantity > 0)
- [ ] Product Card "+" button: Enabled
- [ ] Product Card "Add to Cart" button: Enabled (when quantity > 0)
- [ ] "Go to Cart" button: Navigates to /cart
- [ ] "My Bookmarks" button: Navigates to /favorites
- [ ] Direct access to /cart: Allowed
- [ ] Direct access to /favorites: Allowed
- [ ] Direct access to /customer/dashboard: Allowed
- [ ] Direct access to /admin/*: Should redirect with "insufficient_permissions"

### 4. Authenticated Admin (No Customer Selected)
- [ ] Cart icon: Should NOT be visible (no customer selected)
- [ ] Dashboard icon: Should NOT be visible
- [ ] Product Card "-" button: Disabled, shows "Please select a customer account" toast
- [ ] Product Card "+" button: Disabled, shows "Please select a customer account" toast
- [ ] Product Card "Add to Cart" button: Disabled, shows "Please select a customer account" toast
- [ ] "Go to Cart" button: Shows "Please select a customer account to access cart" toast
- [ ] "My Bookmarks" button: Shows "Only customers can access bookmarks" toast
- [ ] Admin switcher modal should auto-open on sign-in

### 5. Authenticated Admin (With Customer Selected - Impersonating)
- [ ] Cart icon: Visible and clickable
- [ ] Dashboard icon: Visible and clickable
- [ ] Product Card "-" button: Enabled (when quantity > 0)
- [ ] Product Card "+" button: Enabled
- [ ] Product Card "Add to Cart" button: Enabled (when quantity > 0)
- [ ] "Go to Cart" button: Navigates to /cart
- [ ] "My Bookmarks" button: Shows "Only customers can access bookmarks" toast (admin can't bookmark)
- [ ] Direct access to /cart: Allowed
- [ ] Direct access to /favorites: Should redirect (admin can't access bookmarks)
- [ ] Direct access to /customer/dashboard: Allowed
- [ ] Direct access to /admin/*: Allowed

## Toast Position
- [ ] ALL toast messages appear at top-right position

## Security Check
- [ ] Open browser console
- [ ] Try to manipulate auth state: `window.auth = { canAddToCart: true }`
- [ ] Buttons should still be properly guarded (server-side validation)

## Customer Selection Flow
1. Sign in as customer with multiple accounts
2. Modal should auto-open
3. Select a customer
4. Page should reload
5. All buttons should immediately become enabled
6. Cart icon should appear
7. Dashboard icon should appear