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

    // Parse date parts explicitly to avoid timezone issues
    const [year, month, day] = date.split('-').map(Number)
    if (!year || !month || !day) {
      return NextResponse.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, { status: 400 })
    }

    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))

    // Check what day of the week it is (UTC)
    const dayOfWeek = startOfDay.getUTCDay() // 0=Sun, 6=Sat

    // Weekends — closed (Saturday = 6, Sunday = 0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return NextResponse.json({
        available: false,
        message: 'Our office is closed on weekends. Please choose a weekday (Monday - Friday).',
        availableSlots: [],
        bookedSlots: [],
      })
    }

    const daySlots = ALL_TIME_SLOTS

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
  } catch (error: any) {
    console.error('Availability check error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error?.message || 'Unknown' }, { status: 500 })
  }
}
