'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'

const STATUSES = ['AVAILABLE', 'UNDER_CONTRACT', 'SOLD', 'RENTED', 'OFF_MARKET']
const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: 'Available',
  UNDER_CONTRACT: 'Under Contract',
  SOLD: 'Sold',
  RENTED: 'Rented',
  OFF_MARKET: 'Off Market',
}

const PRICE_RANGES = [
  { label: 'Any', value: '' },
  { label: 'Under KES 10M', value: '0-10000000' },
  { label: 'KES 10M – 30M', value: '10000000-30000000' },
  { label: 'KES 30M – 100M', value: '30000000-100000000' },
  { label: 'Above KES 100M', value: '100000000-999999999' },
]

interface PropertyFilterProps {
  hideTypeFilter?: boolean
}

export default function PropertyFilter({ hideTypeFilter }: PropertyFilterProps) {
  const t = useTranslations('listings')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams]
  )

  return (
    <div className="bg-bg-surface border border-border rounded-2xl p-4 sm:p-5 mb-8">
      <div className="flex items-center gap-2 mb-4 text-ink-muted">
        <SlidersHorizontal className="w-4 h-4 text-gold" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search location, title..."
            defaultValue={searchParams.get('q') ?? ''}
            onChange={(e) => update('q', e.target.value)}
            className="w-full bg-bg-elevated border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-ink placeholder-ink-faint focus:outline-none focus:border-gold/60 transition-colors"
          />
        </div>

        {/* Status */}
        <select
          value={searchParams.get('status') ?? ''}
          onChange={(e) => update('status', e.target.value)}
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60 transition-colors appearance-none"
        >
          <option value="">{t('all_statuses')}</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>

        {/* Price */}
        <select
          value={searchParams.get('price') ?? ''}
          onChange={(e) => update('price', e.target.value)}
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60 transition-colors appearance-none"
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={searchParams.get('sort') ?? ''}
          onChange={(e) => update('sort', e.target.value)}
          className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60 transition-colors appearance-none"
        >
          <option value="">{t('sort_newest')}</option>
          <option value="price_asc">{t('sort_price_asc')}</option>
          <option value="price_desc">{t('sort_price_desc')}</option>
        </select>
      </div>
    </div>
  )
}
