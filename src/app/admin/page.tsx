'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Mail, Users, FileText, BookOpen, MessageSquare, Clock, MailOpen } from 'lucide-react'

interface Stats {
  bookings: number
  messages: number
  unreadMessages: number
  services: number
  team: number
  blog: number
  testimonials: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ bookings: 0, messages: 0, unreadMessages: 0, services: 0, team: 0, blog: 0, testimonials: 0 })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/stats')
        const data = await res.json()
        if (data.stats) setStats(data.stats)
        if (data.recentBookings) setRecentBookings(data.recentBookings)
        if (data.recentMessages) setRecentMessages(data.recentMessages)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
      finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Bookings', value: stats.bookings, icon: Calendar, color: 'bg-blue-50 text-blue-600', href: '/admin/bookings' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'bg-green-50 text-green-600', href: '/admin/messages', badge: stats.unreadMessages },
    { label: 'Services', value: stats.services, icon: FileText, color: 'bg-purple-50 text-purple-600', href: '/admin/services' },
    { label: 'Team', value: stats.team, icon: Users, color: 'bg-gold-50 text-gold-600', href: '/admin/team' },
    { label: 'Blog Posts', value: stats.blog, icon: BookOpen, color: 'bg-orange-50 text-orange-600', href: '/admin/blog' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: 'bg-pink-50 text-pink-600', href: '/admin/testimonials' },
  ]

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-navy-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href} className="bg-white rounded-sm p-5 border border-gray-100 hover:border-gold-400/50 transition-colors group relative">
            <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${card.color} mb-3`}>
              <card.icon size={20} />
            </div>
            <h3 className="text-2xl font-bold text-navy-800">{card.value}</h3>
            <p className="text-gray-500 text-xs mt-1">{card.label}</p>
            {card.badge && card.badge > 0 && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{card.badge}</span>
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-navy-800">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-gold-500 hover:text-gold-600">View all →</Link>
          </div>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                  <div>
                    <p className="font-medium text-navy-800 text-sm">{booking.firstName} {booking.lastName}</p>
                    <p className="text-gray-500 text-xs">{new Date(booking.date).toLocaleDateString()} at {booking.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-sm font-medium ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : booking.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">No bookings yet</p>
          )}
        </div>

        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-navy-800">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-gold-500 hover:text-gold-600">View all →</Link>
          </div>
          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />}
                    <div className="min-w-0">
                      <p className={`text-sm truncate ${msg.isRead ? 'text-gray-600' : 'font-medium text-navy-800'}`}>{msg.subject}</p>
                      <p className="text-gray-500 text-xs">{msg.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0 ml-2">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
