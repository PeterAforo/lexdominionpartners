'use client'

import { useEffect, useState } from 'react'
import { Mail, Trash2, Clock, Eye, EyeOff, MailOpen } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact')
      const data = await res.json()
      setMessages(Array.isArray(data) ? data : [])
    } catch { setMessages([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchMessages() }, [])

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      await fetch(`/api/contact/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: !isRead }) })
      toast.success(isRead ? 'Marked as unread' : 'Marked as read')
      fetchMessages()
      if (selected?.id === id) setSelected({ ...selected, isRead: !isRead })
    } catch { toast.error('Failed to update') }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      await fetch(`/api/contact/${id}`, { method: 'DELETE' })
      toast.success('Message deleted')
      if (selected?.id === id) setSelected(null)
      fetchMessages()
    } catch { toast.error('Failed to delete') }
  }

  const openMessage = async (msg: any) => {
    setSelected(msg)
    if (!msg.isRead) {
      try {
        await fetch(`/api/contact/${msg.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isRead: true }) })
        fetchMessages()
      } catch { /* silent */ }
    }
  }

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.isRead
    if (filter === 'read') return m.isRead
    return true
  })

  const unreadCount = messages.filter((m) => !m.isRead).length

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-navy-800">Contact Messages</h1>
          <p className="text-sm text-gray-500 mt-1">{messages.length} total · {unreadCount} unread</p>
        </div>
        <div className="flex gap-1">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs rounded-sm capitalize ${filter === f ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-sm max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-heading font-semibold text-navy-800 mb-2">{selected.subject}</h3>
            <p className="text-sm text-gray-500 mb-1">From: <strong>{selected.name}</strong> ({selected.email})</p>
            {selected.phone && <p className="text-sm text-gray-500 mb-4">Phone: {selected.phone}</p>}
            <div className="bg-gray-50 p-4 rounded-sm mb-4">
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
            </div>
            <p className="text-xs text-gray-400 mb-4">{new Date(selected.createdAt).toLocaleString()}</p>
            <div className="flex gap-2">
              <button onClick={() => setSelected(null)} className="btn-primary text-sm">Close</button>
              <button onClick={() => markAsRead(selected.id, selected.isRead)} className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-50 flex items-center gap-2">
                {selected.isRead ? <><EyeOff size={14} /> Mark Unread</> : <><Eye size={14} /> Mark Read</>}
              </button>
              <button onClick={() => deleteMessage(selected.id)} className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-sm hover:bg-red-50 flex items-center gap-2">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <Mail size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">{filter === 'all' ? 'No messages yet' : `No ${filter} messages`}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg: any) => (
            <div key={msg.id} className={`bg-white rounded-sm border p-4 hover:border-gold-400/50 transition-colors cursor-pointer ${msg.isRead ? 'border-gray-100' : 'border-gold-400/30 bg-gold-50/30'}`} onClick={() => openMessage(msg)}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!msg.isRead && <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />}
                    <h3 className={`text-sm truncate ${msg.isRead ? 'text-gray-600' : 'font-semibold text-navy-800'}`}>{msg.subject}</h3>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">From: {msg.name} ({msg.email})</p>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-1">{msg.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id) }} className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
