'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

interface Offer {
  id: string
  title: string
  description: string
  discount: number | null
  active: boolean
  expiresAt: string | null
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', discount: '', expiresAt: '', terms: '' })

  const fetchOffers = useCallback(async () => {
    const res = await fetch('/api/offers')
    const json = await res.json()
    setOffers(json.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchOffers() }, [fetchOffers])

  async function toggleActive(id: string, active: boolean) {
    await fetch(`/api/offers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    fetchOffers()
  }

  async function deleteOffer(id: string) {
    if (!confirm('Delete this offer?')) return
    await fetch(`/api/offers/${id}`, { method: 'DELETE' })
    fetchOffers()
  }

  async function createOffer(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        discount: form.discount ? Number(form.discount) : null,
        terms: form.terms || null,
        expiresAt: form.expiresAt || null,
        active: true,
      }),
    })
    setForm({ title: '', description: '', discount: '', expiresAt: '', terms: '' })
    setShowForm(false)
    fetchOffers()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Offers</h1>
          <p className="text-ink-muted text-sm mt-1">{offers.filter((o) => o.active).length} active offers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gold text-bg font-bold px-4 py-2.5 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> New Offer
        </button>
      </div>

      {showForm && (
        <form onSubmit={createOffer} className="bg-bg-surface border border-border rounded-2xl p-6 mb-8 space-y-4">
          <h2 className="font-semibold text-ink mb-2">Create Offer</h2>
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60" />
          <textarea required placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60 resize-none" />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Discount %" type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
              className="bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60" />
            <input placeholder="Expires at" type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
              className="bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60" />
          </div>
          <input placeholder="Terms (optional)" value={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.value })}
            className="w-full bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold/60" />
          <div className="flex gap-3">
            <button type="submit" className="bg-gold text-bg font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-yellow-600">Create</button>
            <button type="button" onClick={() => setShowForm(false)} className="text-ink-muted text-sm px-4 py-2.5">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-ink-muted">Loading...</div>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className={`bg-bg-surface border rounded-xl p-5 flex items-start justify-between gap-4 transition-all ${offer.active ? 'border-gold/20' : 'border-border opacity-60'}`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-ink">{offer.title}</p>
                  {offer.discount && (
                    <span className="bg-gold/15 text-gold text-xs font-bold px-2 py-0.5 rounded-full">{offer.discount}% OFF</span>
                  )}
                </div>
                <p className="text-ink-muted text-sm">{offer.description}</p>
                {offer.expiresAt && (
                  <p className="text-ink-faint text-xs mt-2">
                    Expires: {new Date(offer.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleActive(offer.id, offer.active)} title={offer.active ? 'Deactivate' : 'Activate'}
                  className={`transition-colors ${offer.active ? 'text-gold hover:text-gold-dark' : 'text-ink-faint hover:text-gold'}`}>
                  {offer.active ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
                <button onClick={() => deleteOffer(offer.id)} className="text-ink-muted hover:text-red-400 transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
