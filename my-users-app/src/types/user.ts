export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string | null
  website: string | null
  address_city: string | null
  company_name: string | null
  created_at: string
}

export type FilterCriteria = 'all' | 'city' | 'company'

export interface FilterState {
  criteria: FilterCriteria
  value: string
}
