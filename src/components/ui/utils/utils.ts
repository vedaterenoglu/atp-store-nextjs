/**
 * Tailwind CSS class name utility
 * 
 * Provides: Merges and deduplicates Tailwind classes safely
 * Used by: All UI components for conditional styling
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
