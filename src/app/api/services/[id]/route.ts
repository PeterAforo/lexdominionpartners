import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { updateServiceSchema } from '@/lib/validations'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.findUnique({ where: { id: params.id } })
    if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = updateServiceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: parsed.data,
    })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    await prisma.service.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
