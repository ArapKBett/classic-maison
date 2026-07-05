import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import ProjectCard from '@/components/ui/ProjectCard'
import type { Project } from '@/types'

interface ProjectsPageProps {
  params: { locale: string }
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const projects = await prisma.project.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  })

  const inProgress = projects.filter((p) => p.status === 'IN_PROGRESS')
  const planned = projects.filter((p) => p.status === 'PLANNED')
  const completed = projects.filter((p) => p.status === 'COMPLETED')
  const onHold = projects.filter((p) => p.status === 'ON_HOLD')

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-gold-gradient" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">Development</span>
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-ink mb-3">
            {t('projects.title')}
          </h1>
          <p className="text-ink-muted text-lg max-w-2xl">{t('projects.subtitle')}</p>
        </div>

        {/* In Progress */}
        {inProgress.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
              <h2 className="font-serif text-2xl font-bold text-ink">{t('projects.status_in_progress')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgress.map((p) => (
                <ProjectCard key={p.id} project={p as unknown as Project} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Planned */}
        {planned.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <h2 className="font-serif text-2xl font-bold text-ink">{t('projects.status_planned')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planned.map((p) => (
                <ProjectCard key={p.id} project={p as unknown as Project} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <h2 className="font-serif text-2xl font-bold text-ink">{t('projects.status_completed')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((p) => (
                <ProjectCard key={p.id} project={p as unknown as Project} locale={locale} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-20 text-ink-muted">
            <p className="text-lg">No projects listed yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}
