import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { createContactSchema } from '@/lib/validations'
import { isRateLimited, getClientIp } from '@/lib/rate-limit'
import { sendContactNotificationToCompany } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = createContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { name, email, phone, subject, message } = parsed.data

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    })

    // Send email notification to company (fire-and-forget)
    sendContactNotificationToCompany({ name, email, phone: phone || undefined, subject, message }).catch(() => {})

    return NextResponse.json({ success: true, id: contactMessage.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
