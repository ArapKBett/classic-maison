import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Building2, FolderKanban, Tag, MessageSquare, TrendingUp, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  const [
    totalProperties,
    availableProperties,
    soldProperties,
    totalProjects,
    activeOffers,
    unreadInquiries,
    recentInquiries,
    recentProperties,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: 'AVAILABLE' } }),
    prisma.property.count({ where: { status: 'SOLD' } }),
    prisma.project.count(),
    prisma.offer.count({ where: { active: true } }),
    prisma.inquiry.count({ where: { read: false } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const stats = [
    { label: 'Total Properties', value: totalProperties, icon: Building2, href: '/admin/listings', color: 'text-blue-400' },
    { label: 'Available', value: availableProperties, icon: TrendingUp, href: '/admin/listings', color: 'text-emerald-400' },
    { label: 'Sold / Rented', value: soldProperties, icon: DollarSign, href: '/admin/listings', color: 'text-gold' },
    { label: 'Active Projects', value: totalProjects, icon: FolderKanban, href: '/admin/projects', color: 'text-purple-400' },
    { label: 'Active Offers', value: activeOffers, icon: Tag, href: '/admin/offers', color: 'text-amber-400' },
    { label: 'Unread Inquiries', value: unreadInquiries, icon: MessageSquare, href: '/admin/inquiries', color: 'text-red-400' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink mb-1">Dashboard</h1>
        <p className="text-ink-muted text-sm">Welcome back. Here's an overview of Classic Maison.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-bg-surface border border-border rounded-xl p-5 hover:border-gold/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`font-bold text-2xl ${stat.color}`}>{stat.value}</span>
            </div>
            <p className="text-ink-muted text-sm group-hover:text-ink transition-colors">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-gold text-xs hover:underline">View all</Link>
          </div>
          {recentInquiries.length === 0 ? (
            <p className="text-ink-muted text-sm">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-start justify-between gap-3 py-3 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-ink text-sm font-medium">{inq.name}</p>
                    <p className="text-ink-faint text-xs">{inq.email}</p>
                    <p className="text-ink-muted text-xs mt-1 line-clamp-1">{inq.message}</p>
                  </div>
                  {!inq.read && (
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-gold mt-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Properties */}
        <div className="bg-bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-ink">Recent Listings</h2>
            <Link href="/admin/listings" className="text-gold text-xs hover:underline">View all</Link>
          </div>
          {recentProperties.length === 0 ? (
            <p className="text-ink-muted text-sm">No listings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProperties.map((prop) => (
                <div key={prop.id} className="flex items-center justify-between gap-3 py-3 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-ink text-sm font-medium">{prop.title}</p>
                    <p className="text-ink-faint text-xs">{prop.location}, {prop.city}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    prop.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400' :
                    prop.status === 'SOLD' ? 'bg-red-500/20 text-red-400' :
                    'bg-zinc-500/20 text-zinc-400'
                  }`}>
                    {prop.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
