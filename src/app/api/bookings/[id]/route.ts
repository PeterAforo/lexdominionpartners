import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'
import { updateBookingSchema } from '@/lib/validations'
import { sendBookingStatusToClient } from '@/lib/email'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const body = await req.json()
    const parsed = updateBookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten().fieldErrors }, { status: 400 })
    }

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: parsed.data,
      include: { service: true },
    })

    // Send status email to client if status changed to CONFIRMED or CANCELLED
    if (parsed.data.status === 'CONFIRMED' || parsed.data.status === 'CANCELLED') {
      sendBookingStatusToClient({
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        date: booking.date.toISOString(),
        time: booking.time,
        status: parsed.data.status,
        serviceName: booking.service?.title,
      }).catch(() => {})
    }

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    await prisma.booking.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
