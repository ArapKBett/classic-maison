import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'danger'
}

export default function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        {
          'bg-zinc-500/20 text-zinc-300 border-zinc-500/30': variant === 'default',
          'bg-gold/15 text-gold border-gold/30': variant === 'gold',
          'bg-emerald-500/20 text-emerald-400 border-emerald-500/30': variant === 'success',
          'bg-amber-500/20 text-amber-400 border-amber-500/30': variant === 'warning',
          'bg-red-500/20 text-red-400 border-red-500/30': variant === 'danger',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
