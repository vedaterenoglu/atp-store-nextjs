/**
 * useNewUserDetection - Detects and handles new user sign-ups
 * SOLID Principles: SRP - Single responsibility for new user detection
 * Design Patterns: Hook Pattern
 * Dependencies: Clerk hooks, localStorage
 */

'use client'

import { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import type { UserResource } from '@clerk/types'

const NEW_USER_FLAG_KEY = 'atp_new_user_welcomed'
const NEW_USER_CHECK_KEY = 'atp_user_check'

export function useNewUserDetection() {
  const { user, isLoaded: userLoaded } = useUser()
  const { isSignedIn } = useAuth()
  const [isNewUser, setIsNewUser] = useState(false)
  const [hasBeenWelcomed, setHasBeenWelcomed] = useState(false)

  useEffect(() => {
    if (!userLoaded || !isSignedIn || !user) return

    // Check if we've already welcomed this user
    const welcomedUsers = localStorage.getItem(NEW_USER_FLAG_KEY)
    const welcomedList = welcomedUsers ? JSON.parse(welcomedUsers) : []

    if (welcomedList.includes(user.id)) {
      setHasBeenWelcomed(true)
      return
    }

    // Check if this is a new user (created within last 5 minutes)
    const createdAt = user.createdAt
    if (createdAt) {
      const now = new Date()
      const userCreatedAt = new Date(createdAt)
      const timeDiff = now.getTime() - userCreatedAt.getTime()
      const minutesDiff = timeDiff / (1000 * 60)

      // Consider user "new" if created within last 5 minutes
      if (minutesDiff <= 5) {
        setIsNewUser(true)

        // Send notification to backend
        sendNewUserNotification(user)
      }
    }

    // Also check if we've seen this user before in this session
    const sessionCheck = sessionStorage.getItem(NEW_USER_CHECK_KEY)
    const checkedUsers = sessionCheck ? JSON.parse(sessionCheck) : []

    if (!checkedUsers.includes(user.id)) {
      // First time seeing this user in this session
      checkedUsers.push(user.id)
      sessionStorage.setItem(NEW_USER_CHECK_KEY, JSON.stringify(checkedUsers))

      // Check if user has no previous sign-in count (indicating new user)
      // Clerk doesn't expose sign-in count directly, so we use creation time
      const createdRecently =
        user.createdAt &&
        new Date().getTime() - new Date(user.createdAt).getTime() < 300000 // 5 minutes

      if (createdRecently && !welcomedList.includes(user.id)) {
        setIsNewUser(true)
        sendNewUserNotification(user)
      }
    }
  }, [userLoaded, isSignedIn, user])

  const markAsWelcomed = () => {
    if (!user) return

    const welcomedUsers = localStorage.getItem(NEW_USER_FLAG_KEY)
    const welcomedList = welcomedUsers ? JSON.parse(welcomedUsers) : []

    if (!welcomedList.includes(user.id)) {
      welcomedList.push(user.id)
      localStorage.setItem(NEW_USER_FLAG_KEY, JSON.stringify(welcomedList))
    }

    setHasBeenWelcomed(true)
    setIsNewUser(false)
  }

  return {
    isNewUser: isNewUser && !hasBeenWelcomed,
    markAsWelcomed,
  }
}

async function sendNewUserNotification(user: UserResource) {
  try {
    await fetch('/api/auth/new-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail:
          user.primaryEmailAddress?.emailAddress ||
          user.emailAddresses?.[0]?.emailAddress,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    })
  } catch (error) {
    console.error('Failed to send new user notification:', error)
  }
}
