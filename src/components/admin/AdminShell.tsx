'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, FolderKanban, Tag, MessageSquare, LogOut, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Listings', href: '/admin/listings', icon: Building2 },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  return (
    <aside className="flex flex-col h-full bg-bg-surface border-r border-border">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div>
          <p className="font-serif text-xl font-bold bg-gold-gradient bg-clip-text text-transparent">
            Classic Maison
          </p>
          <p className="text-xs text-ink-faint mt-1">Admin Panel</p>
        </div>
        {onClose && (
          <button
            className="text-ink-muted hover:text-gold transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-ink-muted hover:text-gold hover:bg-gold/5'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/en"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:text-gold hover:bg-gold/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          View Site
        </Link>
      </div>
    </aside>
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-60 md:fixed md:inset-y-0 z-30">
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-64 h-full flex flex-col shadow-2xl">
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-4 px-4 py-3 bg-bg-surface border-b border-border sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-ink-muted hover:text-gold transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <p className="font-serif text-lg font-bold bg-gold-gradient bg-clip-text text-transparent">
            Classic Maison
          </p>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
