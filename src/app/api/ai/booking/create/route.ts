import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, phone, service, date, time, message } = body

    if (!firstName || !lastName || !email || !phone || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Double-check availability before creating
    const targetDate = new Date(date)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

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
        date: new Date(date),
        time,
        message: message ? `[Booked via Lex AI Chatbot] ${service ? `Service: ${service}. ` : ''}${message}` : `[Booked via Lex AI Chatbot]${service ? ` Service: ${service}` : ''}`,
      },
    })

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
