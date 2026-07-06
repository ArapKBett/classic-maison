'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, CheckCircle, Home } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Property {
  id: string
  title: string
  type: string
  status: string
  price: number
  currency: string
  location: string
  city: string
  featured: boolean
}

const STATUS_OPTIONS = ['AVAILABLE', 'UNDER_CONTRACT', 'SOLD', 'RENTED', 'OFF_MARKET']
const STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'text-emerald-400 bg-emerald-500/10',
  UNDER_CONTRACT: 'text-amber-400 bg-amber-500/10',
  SOLD: 'text-red-400 bg-red-500/10',
  RENTED: 'text-blue-400 bg-blue-500/10',
  OFF_MARKET: 'text-zinc-400 bg-zinc-500/10',
}

export default function AdminListingsPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = useCallback(async () => {
    const res = await fetch('/api/listings?limit=50')
    const json = await res.json()
    setProperties(json.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchProperties() }, [fetchProperties])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchProperties()
  }

  async function deleteProperty(id: string) {
    if (!confirm('Delete this property? This cannot be undone.')) return
    await fetch(`/api/listings/${id}`, { method: 'DELETE' })
    fetchProperties()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Listings</h1>
          <p className="text-ink-muted text-sm mt-1">{properties.length} properties</p>
        </div>
        <Link
          href="/admin/listings/new"
          className="flex items-center gap-2 bg-gold text-bg font-bold px-4 py-2.5 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </div>

      {loading ? (
        <div className="text-ink-muted">Loading...</div>
      ) : (
        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-ink-faint font-medium">Property</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Type</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Price</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Status</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.featured && <Home className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                      <div>
                        <p className="text-ink font-medium">{p.title}</p>
                        <p className="text-ink-faint text-xs">{p.location}, {p.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{p.type}</td>
                  <td className="px-4 py-3 text-ink font-medium">{formatPrice(p.price, p.currency)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status}
                      onChange={(e) => updateStatus(p.id, e.target.value)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none ${STATUS_COLORS[p.status] || 'text-zinc-400 bg-zinc-500/10'}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-zinc-800 text-zinc-100">{s.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/listings/${p.id}`}
                        className="text-ink-muted hover:text-gold transition-colors p-1"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deleteProperty(p.id)}
                        className="text-ink-muted hover:text-red-400 transition-colors p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
