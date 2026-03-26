import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { sendBookingConfirmationToClient, sendBookingNotificationToCompany } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, service, date, time, message } = body

    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Double-check availability before creating (use UTC to avoid timezone issues)
    const [year, month, day] = date.split('-').map(Number)
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))

    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: { gte: startOfDay, lte: endOfDay },
        time,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    })

    if (existingBooking) {
      return NextResponse.json({
        success: false,
        error: 'This time slot is no longer available. Please choose another time.',
      }, { status: 409 })
    }

    const booking = await prisma.booking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        date: startOfDay,
        time,
        message: message ? `[Booked via Lex AI Chatbot] ${service ? `Service: ${service}. ` : ''}${message}` : `[Booked via Lex AI Chatbot]${service ? ` Service: ${service}` : ''}`,
      },
    })

    // Send emails (fire-and-forget)
    sendBookingConfirmationToClient({ firstName, lastName, email, date, time, serviceName: service }).catch(() => {})
    sendBookingNotificationToCompany({ firstName, lastName, email, phone, date, time, serviceName: service }).catch(() => {})

    return NextResponse.json({
      success: true,
      id: booking.id,
      booking: {
        firstName,
        lastName,
        email,
        date,
        time,
        service: service || 'General Consultation',
      },
    })
  } catch (error) {
    console.error('Chatbot booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
