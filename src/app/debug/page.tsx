/**
 * Debug Page - Display Clerk JWT Token
 *
 * Shows the actual JWT token and decoded sessionClaims
 *
 * TEMPORARY - Remove after debugging
 */
'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function DebugPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [token, setToken] = useState<string | null>(null)
  const [decoded, setDecoded] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    async function fetchToken() {
      console.warn('Debug - isLoaded:', isLoaded, 'isSignedIn:', isSignedIn)

      if (isLoaded && isSignedIn) {
        try {
          console.warn('Debug - Fetching token...')
          // Get the session JWT token
          const sessionToken = await getToken()
          console.warn('Debug - Token received:', sessionToken)
          setToken(sessionToken)

          // Store in localStorage for inspection
          if (sessionToken) {
            localStorage.setItem('clerk_jwt_debug', sessionToken)
            console.warn('Debug - Token stored in localStorage')

            // Decode JWT (split by . and decode base64)
            const parts = sessionToken.split('.')
            if (parts.length === 3 && parts[1]) {
              try {
                const payload = JSON.parse(atob(parts[1]))
                console.warn('Debug - Decoded payload:', payload)
                setDecoded(payload)
              } catch (e) {
                console.error('Debug - Failed to decode JWT:', e)
              }
            }
          } else {
            console.warn('Debug - No token received!')
          }
        } catch (error) {
          console.error('Debug - Error getting token:', error)
        }
      }
    }

    fetchToken()
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Not signed in</div>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Clerk JWT Token Debug</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            JWT Token (check localStorage: clerk_jwt_debug)
          </h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-xs">
            {token || 'Loading...'}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Decoded Token Payload</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {decoded ? JSON.stringify(decoded, null, 2) : 'Loading...'}
          </pre>
        </div>
      </div>
    </div>
  )
}
