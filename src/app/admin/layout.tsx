import type { Metadata } from 'next'
import AdminShell from '@/components/admin/AdminShell'

export const metadata: Metadata = {
  title: 'Admin | Classic Maison',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}
