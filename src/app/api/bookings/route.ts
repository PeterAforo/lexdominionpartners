import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { createBookingSchema } from '@/lib/validations'
import { isRateLimited, getClientIp } from '@/lib/rate-limit'
import { sendBookingConfirmationToClient, sendBookingNotificationToCompany } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    if (isRateLimited(ip, 5, 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = createBookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const { firstName, lastName, email, phone, date, time, message } = parsed.data

    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        date: new Date(date),
        time,
        message: message || null,
      },
    })

    // Send emails (fire-and-forget, don't block response)
    sendBookingConfirmationToClient({ firstName, lastName, email, date, time }).catch(() => {})
    sendBookingNotificationToCompany({ firstName, lastName, email, phone, date, time, message: message || undefined }).catch(() => {})

    return NextResponse.json({ success: true, id: booking.id })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { service: true },
    })
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
