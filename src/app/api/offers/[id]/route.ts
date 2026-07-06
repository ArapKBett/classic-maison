export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const body = await req.json()
  const updates: Record<string, unknown> = { ...body }
  if (body.expiresAt) updates.expiresAt = new Date(body.expiresAt)
  const offer = await prisma.offer.update({ where: { id }, data: updates })
  return NextResponse.json({ data: offer })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  await prisma.offer.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
