/**
 * GetCustomerAddressesQuery Types
 * SOLID Principles: SRP - Single responsibility for address query types
 * Design Patterns: Type Definition Pattern
 * Dependencies: None
 */

// Variables for the query
export interface GetCustomerAddressesQueryVariables {
  company_id: string
  owner_id: string
}

// Individual address type
export interface CustomerAddress {
  address_id: string
  address_nickname: string
  line_1: string
  line_2: string
  city: string
  country: string
}

// Response structure
export interface GetCustomerAddressesQueryResponse {
  addresses: CustomerAddress[]
}

// Formatted address for UI display
export interface FormattedAddress {
  id: string
  label: string
  fullAddress: CustomerAddress
}
