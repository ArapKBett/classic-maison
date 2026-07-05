import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ data: project })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  const body = await req.json()
  const updates: Record<string, unknown> = { ...body }
  if (body.images && Array.isArray(body.images)) updates.images = JSON.stringify(body.images)
  if (body.features && Array.isArray(body.features)) updates.features = JSON.stringify(body.features)
  if (body.completionDate) updates.completionDate = new Date(body.completionDate)
  const project = await prisma.project.update({ where: { id }, data: updates })
  return NextResponse.json({ data: project })
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
