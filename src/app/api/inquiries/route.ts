export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const InquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  message: z.string().min(5),
  propertyId: z.string().optional().nullable(),
})

export async function GET() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    include: { property: { select: { title: true, slug: true } } },
  })
  return NextResponse.json({ data: inquiries })
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? ''
    let body: Record<string, string>

    if (contentType.includes('application/json')) {
      body = await req.json()
    } else {
      const formData = await req.formData()
      body = Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => [k, String(v)])
      )
    }

    const validated = InquirySchema.parse(body)
    const inquiry = await prisma.inquiry.create({ data: validated })
    return NextResponse.json({ data: inquiry }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 })
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
