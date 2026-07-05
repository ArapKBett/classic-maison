import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Building2, FolderKanban, Tag, MessageSquare, LogOut } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin | Classic Maison',
  robots: 'noindex, nofollow',
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Listings', href: '/admin/listings', icon: Building2 },
  { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
  { label: 'Offers', href: '/admin/offers', icon: Tag },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-60 bg-bg-surface border-r border-border flex flex-col fixed h-full">
            <div className="p-6 border-b border-border">
              <p className="font-serif text-xl font-bold bg-gold-gradient bg-clip-text text-transparent">
                Classic Maison
              </p>
              <p className="text-xs text-ink-faint mt-1">Admin Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:text-gold hover:bg-gold/5 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
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

          {/* Main */}
          <main className="flex-1 ml-60 min-h-screen p-8">
            {children}
          </main>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Inter:wght@400;500;600&display=swap');
          * { box-sizing: border-box; }
          body { background: #1A1A1A; color: #F0F0F0; }
        `}</style>
      </body>
    </html>
  )
}
