import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const CreatePropertySchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  type: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'LUXURY', 'RENTAL', 'INDUSTRIAL']),
  status: z.enum(['AVAILABLE', 'UNDER_CONTRACT', 'SOLD', 'RENTED', 'OFF_MARKET']).optional(),
  price: z.number().positive(),
  currency: z.string().default('KES'),
  bedrooms: z.number().int().optional().nullable(),
  bathrooms: z.number().int().optional().nullable(),
  area: z.number().optional().nullable(),
  areaUnit: z.string().default('sqft'),
  location: z.string().min(2),
  address: z.string().min(2),
  city: z.string().min(2),
  country: z.string().default('Kenya'),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const status = searchParams.get('status')
  const featured = searchParams.get('featured')
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(50, Number(searchParams.get('limit') ?? 12))

  const where = {
    ...(type ? { type: type as never } : {}),
    ...(status ? { status: status as never } : {}),
    ...(featured === 'true' ? { featured: true } : {}),
  }

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.property.count({ where }),
  ])

  return NextResponse.json({ data: properties, total, page, limit })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = CreatePropertySchema.parse({
      ...body,
      images: body.images ?? [],
      features: body.features ?? [],
    })

    const property = await prisma.property.create({
      data: {
        ...validated,
        images: JSON.stringify(validated.images),
        features: JSON.stringify(validated.features),
      },
    })

    return NextResponse.json({ data: property }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
