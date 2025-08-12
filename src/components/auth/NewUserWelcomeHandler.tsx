/**
 * NewUserWelcomeHandler - Handles welcome flow for new users
 * SOLID Principles: SRP - Single responsibility for welcome flow
 * Design Patterns: Component Pattern
 * Dependencies: WelcomeDialog, useNewUserDetection hook
 */

'use client'

import { useNewUserDetection } from '@/hooks/use-new-user-detection'
import { WelcomeDialog } from './WelcomeDialog'

export function NewUserWelcomeHandler() {
  const { isNewUser, markAsWelcomed } = useNewUserDetection()
  
  const phoneNumber = process.env['NEXT_PUBLIC_CUSTOMER_SERVICE_PHONE']

  const handleClose = () => {
    markAsWelcomed()
  }

  return (
    <WelcomeDialog 
      isOpen={isNewUser} 
      onClose={handleClose}
      {...(phoneNumber && { phoneNumber })}
    />
  )
}