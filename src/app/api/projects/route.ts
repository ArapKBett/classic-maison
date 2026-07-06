export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const CreateProjectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD']).optional(),
  completionDate: z.string().optional().nullable(),
  location: z.string().min(2),
  city: z.string().min(2),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  totalUnits: z.number().int().optional().nullable(),
  availableUnits: z.number().int().optional().nullable(),
  priceFrom: z.number().optional().nullable(),
  currency: z.string().default('KES'),
})

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ data: projects })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = CreateProjectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...validated,
        images: JSON.stringify(validated.images),
        features: JSON.stringify(validated.features),
        completionDate: validated.completionDate ? new Date(validated.completionDate) : null,
      },
    })

    return NextResponse.json({ data: project }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
