/**
 * Address Service
 * SOLID Principles: SRP - Single responsibility for address operations
 * Design Patterns: Service Layer Pattern, Adapter Pattern
 * Dependencies: Fetch API
 */

import type { GetCustomerAddressesQueryResponse } from '@/services/graphql/queries/GetCustomerAddressesQuery.types'

export interface FormattedAddress {
  id: string
  label: string
  fullAddress: {
    address_id: string
    address_nickname: string
    line_1: string
    line_2?: string | null
    city: string
    country: string
  }
}

export interface AddressServiceResponse {
  success: boolean
  data?: {
    addresses: GetCustomerAddressesQueryResponse['addresses']
    formattedAddresses: FormattedAddress[]
  }
  error?: string
  details?: unknown
}

export class AddressService {
  /**
   * Fetches addresses for a specific customer
   */
  static async getCustomerAddresses(
    companyId: string,
    customerId: string
  ): Promise<AddressServiceResponse> {
    try {
      const response = await fetch('/api/addresses/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId,
          customerId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to fetch addresses',
          details: data.details,
        }
      }

      return data as AddressServiceResponse
    } catch (error) {
      console.error('Error in AddressService.getCustomerAddresses:', error)
      return {
        success: false,
        error: 'Network error occurred while fetching addresses',
      }
    }
  }

  /**
   * Validates if customer has at least one address
   */
  static hasAddresses(addresses: FormattedAddress[]): boolean {
    return addresses && addresses.length > 0
  }

  /**
   * Gets the default address (first one) from the list
   */
  static getDefaultAddress(addresses: FormattedAddress[]): FormattedAddress | null {
    if (!this.hasAddresses(addresses)) {
      return null
    }
    return addresses[0] ?? null
  }

  /**
   * Finds an address by ID
   */
  static findAddressById(
    addresses: FormattedAddress[],
    addressId: string
  ): FormattedAddress | undefined {
    return addresses.find(addr => addr.id === addressId)
  }
}