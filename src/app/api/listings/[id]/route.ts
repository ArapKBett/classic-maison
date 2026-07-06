export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const property = await prisma.property.findUnique({ where: { id } })
  if (!property) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: property })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  try {
    const body = await req.json()

    // Auto-set soldAt when marking SOLD or RENTED
    const updates: Record<string, unknown> = { ...body }
    if (body.status === 'SOLD' || body.status === 'RENTED') {
      updates.soldAt = new Date()
    } else if (body.status === 'AVAILABLE') {
      updates.soldAt = null
    }

    if (body.images && Array.isArray(body.images)) {
      updates.images = JSON.stringify(body.images)
    }
    if (body.features && Array.isArray(body.features)) {
      updates.features = JSON.stringify(body.features)
    }

    const property = await prisma.property.update({ where: { id }, data: updates })
    return NextResponse.json({ data: property })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  await prisma.property.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
