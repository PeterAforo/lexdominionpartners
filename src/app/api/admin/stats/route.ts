import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { requireAdmin } from '@/lib/api-auth'

export async function GET() {
  const auth = await requireAdmin()
  if (!auth.authorized) return auth.response

  try {
    const [
      bookingsCount,
      messagesCount,
      unreadMessagesCount,
      servicesCount,
      teamCount,
      blogCount,
      testimonialsCount,
      recentBookings,
      recentMessages,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { isRead: false } }),
      prisma.service.count({ where: { isActive: true } }),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.testimonial.count({ where: { isActive: true } }),
      prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, firstName: true, lastName: true, email: true, status: true, date: true, time: true, createdAt: true },
      }),
      prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, subject: true, message: true, isRead: true, createdAt: true },
      }),
    ])

    return NextResponse.json({
      stats: {
        bookings: bookingsCount,
        messages: messagesCount,
        unreadMessages: unreadMessagesCount,
        services: servicesCount,
        team: teamCount,
        blog: blogCount,
        testimonials: testimonialsCount,
      },
      recentBookings,
      recentMessages,
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
