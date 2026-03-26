'use client'

import { useEffect, useState } from 'react'
import { Calendar, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch { setBookings([]) }
    finally { setLoading(false) }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      toast.success(`Booking ${status.toLowerCase()}`)
      fetchBookings()
    } catch { toast.error('Failed to update') }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      toast.success('Booking deleted')
      fetchBookings()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Bookings</h1>
        <span className="text-sm text-gray-500">{bookings.length} total</span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No bookings yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b: any) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-navy-800">{b.firstName} {b.lastName}</td>
                    <td className="px-4 py-3 text-gray-600">{b.email}</td>
                    <td className="px-4 py-3 text-gray-600">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-gray-600">{b.time}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-sm font-medium ${b.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : b.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateStatus(b.id, 'CONFIRMED')} className="p-2 text-green-600 hover:bg-green-50 rounded" title="Confirm"><CheckCircle2 size={16} /></button>
                        <button onClick={() => updateStatus(b.id, 'CANCELLED')} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Cancel"><XCircle size={16} /></button>
                        <button onClick={() => deleteBooking(b.id)} className="p-2 text-gray-400 hover:bg-gray-100 rounded" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
