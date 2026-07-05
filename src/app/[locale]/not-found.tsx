import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="font-serif text-8xl font-bold bg-gold-gradient bg-clip-text text-transparent mb-4">404</p>
        <h1 className="font-serif text-3xl font-bold text-ink mb-3">Page Not Found</h1>
        <p className="text-ink-muted mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          href="/en"
          className="inline-flex items-center px-6 py-3 bg-gold text-bg font-bold rounded-xl hover:bg-gold-dark transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
