import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const allowed = ['title', 'subtitle', 'description', 'buttonText', 'buttonLink', 'image', 'order', 'isActive']
    const data: Record<string, any> = {}
    for (const key of allowed) {
      if (key in body) data[key] = body[key]
    }

    const slide = await prisma.heroSlide.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    await prisma.heroSlide.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
