import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const slides = await prisma.heroSlide.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(slides)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const { title, subtitle, description, buttonText, buttonLink, image, order } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const slide = await prisma.heroSlide.create({
      data: {
        title,
        subtitle: subtitle || null,
        description: description || null,
        buttonText: buttonText || null,
        buttonLink: buttonLink || null,
        image: image || null,
        order: order || 0,
      },
    })
    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
