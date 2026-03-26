'use client'

import { useEffect, useState } from 'react'
import { Calendar, Mail, Users, FileText, TrendingUp, Clock } from 'lucide-react'

interface Stats {
  bookings: number
  messages: number
  services: number
  team: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ bookings: 0, messages: 0, services: 0, team: 0 })
  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [recentMessages, setRecentMessages] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, messagesRes] = await Promise.all([
          fetch('/api/bookings'),
          fetch('/api/contact'),
        ])
        const bookings = await bookingsRes.json()
        const messages = await messagesRes.json()

        setStats({
          bookings: Array.isArray(bookings) ? bookings.length : 0,
          messages: Array.isArray(messages) ? messages.length : 0,
          services: 8,
          team: 8,
        })
        setRecentBookings(Array.isArray(bookings) ? bookings.slice(0, 5) : [])
        setRecentMessages(Array.isArray(messages) ? messages.slice(0, 5) : [])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }
    fetchData()
  }, [])

  const statCards = [
    { label: 'Total Bookings', value: stats.bookings, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { label: 'Messages', value: stats.messages, icon: Mail, color: 'bg-green-50 text-green-600' },
    { label: 'Practice Areas', value: stats.services, icon: FileText, color: 'bg-purple-50 text-purple-600' },
    { label: 'Team Members', value: stats.team, icon: Users, color: 'bg-gold-50 text-gold-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-navy-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${card.color}`}>
                <card.icon size={22} />
              </div>
              <TrendingUp size={18} className="text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-navy-800">{card.value}</h3>
            <p className="text-gray-500 text-sm mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="text-lg font-heading font-semibold text-navy-800 mb-4">Recent Bookings</h2>
          {recentBookings.length > 0 ? (
            <div className="space-y-3">
              {recentBookings.map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                  <div>
                    <p className="font-medium text-navy-800 text-sm">{booking.firstName} {booking.lastName}</p>
                    <p className="text-gray-500 text-xs">{booking.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-sm font-medium ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">No bookings yet</p>
          )}
        </div>

        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="text-lg font-heading font-semibold text-navy-800 mb-4">Recent Messages</h2>
          {recentMessages.length > 0 ? (
            <div className="space-y-3">
              {recentMessages.map((msg: any) => (
                <div key={msg.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                  <div>
                    <p className="font-medium text-navy-800 text-sm">{msg.name}</p>
                    <p className="text-gray-500 text-xs truncate max-w-[200px]">{msg.subject}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
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
