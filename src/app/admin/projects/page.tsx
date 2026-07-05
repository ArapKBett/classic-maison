'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface Project {
  id: string
  title: string
  status: string
  location: string
  city: string
  priceFrom: number | null
  currency: string
  totalUnits: number | null
  availableUnits: number | null
}

const STATUS_OPTIONS = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']
const STATUS_COLORS: Record<string, string> = {
  PLANNED: 'text-blue-400 bg-blue-500/10',
  IN_PROGRESS: 'text-gold bg-gold/10',
  COMPLETED: 'text-emerald-400 bg-emerald-500/10',
  ON_HOLD: 'text-zinc-400 bg-zinc-500/10',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = useCallback(async () => {
    const res = await fetch('/api/projects')
    const json = await res.json()
    setProjects(json.data)
    setLoading(false)
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchProjects()
  }

  async function deleteProject(id: string) {
    if (!confirm('Delete this project?')) return
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ink">Projects</h1>
          <p className="text-ink-muted text-sm mt-1">{projects.length} projects</p>
        </div>
      </div>

      {loading ? (
        <div className="text-ink-muted">Loading...</div>
      ) : (
        <div className="bg-bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-ink-faint font-medium">Project</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Units</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Price from</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Status</th>
                <th className="px-4 py-3 text-ink-faint font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-bg-elevated/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-ink font-medium">{p.title}</p>
                    <p className="text-ink-faint text-xs">{p.location}, {p.city}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">
                    {p.availableUnits !== null && p.totalUnits !== null
                      ? `${p.availableUnits}/${p.totalUnits}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {p.priceFrom ? formatPrice(p.priceFrom, p.currency) : '—'}
                  </td>
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
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="text-ink-muted hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
