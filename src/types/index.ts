export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND' | 'LUXURY' | 'RENTAL' | 'INDUSTRIAL'
export type PropertyStatus = 'AVAILABLE' | 'UNDER_CONTRACT' | 'SOLD' | 'RENTED' | 'OFF_MARKET'
export type ProjectStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD'

export interface Property {
  id: string
  title: string
  slug: string
  description: string
  type: PropertyType
  status: PropertyStatus
  price: number
  currency: string
  bedrooms: number | null
  bathrooms: number | null
  area: number | null
  areaUnit: string
  location: string
  address: string
  city: string
  country: string
  latitude: number | null
  longitude: number | null
  images: string
  features: string
  featured: boolean
  createdAt: string
  updatedAt: string
  soldAt: string | null
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  status: ProjectStatus
  completionDate: string | null
  location: string
  city: string
  images: string
  features: string
  totalUnits: number | null
  availableUnits: number | null
  priceFrom: number | null
  currency: string
  createdAt: string
  updatedAt: string
}

export interface Offer {
  id: string
  title: string
  description: string
  discount: number | null
  terms: string | null
  expiresAt: string | null
  propertyId: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  propertyId: string | null
  read: boolean
  createdAt: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}

export type Locale = 'en' | 'sw' | 'zh' | 'ru' | 'fr' | 'ar' | 'es' | 'pt' | 'de' | 'ja' | 'hi' | 'ko' | 'it' | 'nl' | 'tr'

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
]
