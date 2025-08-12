/**
 * WelcomeDialog - Shows activation instructions for new users
 * SOLID Principles: SRP - Single responsibility for welcome message
 * Design Patterns: Component Pattern
 * Dependencies: Dialog components, environment variables
 */

'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/schadcn/dialog'
import { Button } from '@/components/ui/schadcn/button'
import { Phone } from 'lucide-react'

interface WelcomeDialogProps {
  isOpen: boolean
  onClose: () => void
  phoneNumber?: string
}

export function WelcomeDialog({ 
  isOpen, 
  onClose, 
  phoneNumber = process.env['NEXT_PUBLIC_CUSTOMER_SERVICE_PHONE'] || '1-800-SUPPORT' 
}: WelcomeDialogProps) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to ATP Store! 🎉
          </DialogTitle>
          <DialogDescription className="text-center pt-4">
            Your account has been created successfully!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <p className="font-semibold text-foreground">
              To get started, please activate your account:
            </p>
            <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
              <Phone className="h-5 w-5" />
              <a href={`tel:${phoneNumber}`} className="hover:underline">
                {phoneNumber}
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Our customer service team will activate your account right away, 
              and you'll be ready to start shopping!
            </p>
          </div>
          <p className="text-sm text-muted-foreground italic text-center">
            Business hours: Monday-Friday, 9:00 AM - 5:00 PM
          </p>
        </div>
        <div className="flex justify-center pt-4">
          <Button onClick={handleClose} className="w-full sm:w-auto">
            Got it, thanks!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}