/**
 * Clerk Authentication Mock
 * SOLID Principles: SRP - Single responsibility for mocking Clerk auth
 * Design Patterns: Mock Pattern
 * Dependencies: None
 */

import React from 'react'

// Mock currentUser function
export const currentUser = jest.fn().mockResolvedValue({
  id: 'test-user-id',
  firstName: 'Test',
  lastName: 'User',
  emailAddresses: [{ emailAddress: 'test@example.com' }],
  publicMetadata: {
    customerid: 'test-customer-id',
  },
})

// Mock auth function
export const auth = jest.fn().mockReturnValue({
  userId: 'test-user-id',
  sessionId: 'test-session-id',
  sessionClaims: {
    metadata: {
      customerid: 'test-customer-id',
    },
  },
})

// Mock ClerkProvider component
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Mock useAuth hook
export const useAuth = jest.fn().mockReturnValue({
  isLoaded: true,
  isSignedIn: true,
  userId: 'test-user-id',
})

// Mock useUser hook
export const useUser = jest.fn().mockReturnValue({
  isLoaded: true,
  isSignedIn: true,
  user: {
    id: 'test-user-id',
    firstName: 'Test',
    lastName: 'User',
    emailAddresses: [{ emailAddress: 'test@example.com' }],
    publicMetadata: {
      customerid: 'test-customer-id',
    },
  },
})

// Mock SignIn component
export const SignIn = () => <div>Mock SignIn</div>

// Mock SignUp component
export const SignUp = () => <div>Mock SignUp</div>

// Mock UserButton component
export const UserButton = () => <div>Mock UserButton</div>

// Mock SignedIn component
export const SignedIn = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Mock SignedOut component
export const SignedOut = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

// Mock RedirectToSignIn component
export const RedirectToSignIn = () => <div>Mock RedirectToSignIn</div>

// Mock AuthenticateWithRedirectCallback component
export const AuthenticateWithRedirectCallback = () => (
  <div>Mock AuthenticateWithRedirectCallback</div>
)

const clerkMocks = {
  currentUser,
  auth,
  ClerkProvider,
  useAuth,
  useUser,
  SignIn,
  SignUp,
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  AuthenticateWithRedirectCallback,
}

export default clerkMocks
