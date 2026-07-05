import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = 'KES'): string {
  if (amount >= 1_000_000) {
    return `${currency} ${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `${currency} ${(amount / 1_000).toFixed(0)}K`
  }
  return `${currency} ${amount.toLocaleString()}`
}

export function formatFullPrice(amount: number, currency = 'KES'): string {
  return `${currency} ${amount.toLocaleString('en-KE')}`
}

export function parseImages(raw: string): string[] {
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function parseFeatures(raw: string): string[] {
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function daysUntil(date: Date | null): number | null {
  if (!date) return null
  const diff = new Date(date).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+254700200658'

export function whatsappUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encoded}`
}

export function propertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    RESIDENTIAL: 'Residential',
    COMMERCIAL: 'Commercial',
    LAND: 'Land & Plots',
    LUXURY: 'Luxury',
    RENTAL: 'Rental',
    INDUSTRIAL: 'Industrial',
  }
  return labels[type] ?? type
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    AVAILABLE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    UNDER_CONTRACT: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    SOLD: 'bg-red-500/20 text-red-400 border-red-500/30',
    RENTED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    OFF_MARKET: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  }
  return colors[status] ?? 'bg-zinc-500/20 text-zinc-400'
}

export function projectStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PLANNED: 'bg-blue-500/20 text-blue-400',
    IN_PROGRESS: 'bg-gold/20 text-gold',
    COMPLETED: 'bg-emerald-500/20 text-emerald-400',
    ON_HOLD: 'bg-zinc-500/20 text-zinc-400',
  }
  return colors[status] ?? 'bg-zinc-500/20 text-zinc-400'
}
