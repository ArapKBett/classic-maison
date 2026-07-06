import Link from 'next/link'
import { MapPin, Calendar, Building2 } from 'lucide-react'
import { formatPrice, parseImages, projectStatusColor } from '@/lib/utils'
import type { Project } from '@/types'
import PropertyImage from './PropertyImage'

interface ProjectCardProps {
  project: Project
  locale: string
}

const STATUS_LABELS: Record<string, string> = {
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ON_HOLD: 'On Hold',
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  const images = parseImages(project.images)
  const img = images[0] || '/placeholder-property.jpg'

  return (
    <div className="group bg-bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <PropertyImage
          src={img !== '/placeholder-property.jpg' ? img : undefined}
          alt={project.title}
          className="group-hover:scale-105 transition-transform duration-500"
          gradientIndex={project.title.charCodeAt(0)}
        />
        <div className="absolute inset-0 bg-dark-gradient" />

        <div className="absolute top-3 left-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${projectStatusColor(project.status)}`}>
            {STATUS_LABELS[project.status]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-ink text-lg mb-2 group-hover:text-gold transition-colors">
          {project.title}
        </h3>
        <p className="text-ink-muted text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="space-y-2 text-xs text-ink-muted mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            {project.location}, {project.city}
          </div>
          {project.completionDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {new Date(project.completionDate).toLocaleDateString('en-KE', { year: 'numeric', month: 'long' })}
            </div>
          )}
          {project.totalUnits && (
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-gold" />
              {project.availableUnits}/{project.totalUnits} units available
            </div>
          )}
        </div>

        {project.priceFrom && (
          <p className="text-gold font-bold text-base mb-4">
            From {formatPrice(project.priceFrom, project.currency)}
          </p>
        )}

        <Link
          href={`/${locale}/contact?project=${project.slug}`}
          className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg border border-gold text-gold text-sm font-semibold hover:bg-gold hover:text-bg transition-all duration-200"
        >
          Register Interest
        </Link>
      </div>
    </div>
  )
}
