import { prisma } from '@/lib/prisma'

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { property: { select: { title: true, slug: true } } },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-ink">Inquiries</h1>
        <p className="text-ink-muted text-sm mt-1">
          {inquiries.filter((i) => !i.read).length} unread · {inquiries.length} total
        </p>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="text-center py-20 text-ink-muted">No inquiries yet.</div>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`bg-bg-surface border rounded-xl p-5 ${
                !inq.read ? 'border-gold/20' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-ink">{inq.name}</p>
                    {!inq.read && (
                      <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-medium">New</span>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs text-ink-muted mb-3">
                    <a href={`mailto:${inq.email}`} className="hover:text-gold">{inq.email}</a>
                    {inq.phone && <a href={`tel:${inq.phone}`} className="hover:text-gold">{inq.phone}</a>}
                  </div>
                  <p className="text-ink-muted text-sm leading-relaxed">{inq.message}</p>
                  {inq.property && (
                    <p className="text-xs text-gold mt-2">Re: {inq.property.title}</p>
                  )}
                </div>
                <div className="text-xs text-ink-faint flex-shrink-0 mt-1">
                  {new Date(inq.createdAt).toLocaleDateString('en-KE', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={`mailto:${inq.email}?subject=Re: Your enquiry at Classic Maison&body=Dear ${inq.name},%0A%0AThank you for your enquiry.%0A%0ABest regards,%0AClassic Maison Team`}
                  className="text-xs bg-gold text-bg font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Reply via Email
                </a>
                {inq.phone && (
                  <a
                    href={`https://wa.me/${inq.phone.replace(/\D/g, '')}?text=Dear ${inq.name}, thank you for your enquiry at Classic Maison.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 font-bold px-3 py-1.5 rounded-lg hover:bg-[#25D366]/30 transition-colors"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
