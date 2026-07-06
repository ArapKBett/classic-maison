export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const CreateOfferSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  discount: z.number().optional().nullable(),
  terms: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
  propertyId: z.string().optional().nullable(),
  active: z.boolean().default(true),
})

export async function GET() {
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ data: offers })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = CreateOfferSchema.parse(body)
    const offer = await prisma.offer.create({
      data: {
        ...validated,
        expiresAt: validated.expiresAt ? new Date(validated.expiresAt) : null,
      },
    })
    return NextResponse.json({ data: offer }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
