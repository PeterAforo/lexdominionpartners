import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

const ALL_TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

export async function POST(req: NextRequest) {
  try {
    const { date } = await req.json()

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 })
    }

    const targetDate = new Date(date)
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    // Check what day of the week it is
    const dayOfWeek = targetDate.getDay() // 0=Sun, 6=Sat

    // Sunday — closed
    if (dayOfWeek === 0) {
      return NextResponse.json({
        available: false,
        message: 'Our office is closed on Sundays. Please choose another date.',
        availableSlots: [],
        bookedSlots: [],
      })
    }

    // Saturday — limited hours (10 AM - 2 PM)
    const saturdaySlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM']
    const daySlots = dayOfWeek === 6 ? saturdaySlots : ALL_TIME_SLOTS

    // Find existing bookings for this date
    const existingBookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
      select: { time: true },
    })

    const bookedSlots = existingBookings.map((b: { time: string }) => b.time)
    const availableSlots = daySlots.filter((slot) => !bookedSlots.includes(slot))

    return NextResponse.json({
      available: availableSlots.length > 0,
      availableSlots,
      bookedSlots,
      message: availableSlots.length > 0
        ? `${availableSlots.length} time slots available on this date.`
        : 'No available slots on this date. Please try another date.',
    })
  } catch (error) {
    console.error('Availability check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
