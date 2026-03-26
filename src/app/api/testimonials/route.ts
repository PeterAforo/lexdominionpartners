import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { createTestimonialSchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    const testimonials = await prisma.testimonial.findMany({
      where: all ? {} : { isActive: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = createTestimonialSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({ data: parsed.data })
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
