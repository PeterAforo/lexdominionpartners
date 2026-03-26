'use client'

import { useEffect, useState } from 'react'
import { Mail, Eye, Trash2, Clock } from 'lucide-react'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact')
        const data = await res.json()
        setMessages(Array.isArray(data) ? data : [])
      } catch { setMessages([]) }
      finally { setLoading(false) }
    }
    fetchMessages()
  }, [])

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Contact Messages</h1>
        <span className="text-sm text-gray-500">{messages.length} total</span>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-sm max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-heading font-semibold text-navy-800 mb-2">{selected.subject}</h3>
            <p className="text-sm text-gray-500 mb-1">From: {selected.name} ({selected.email})</p>
            {selected.phone && <p className="text-sm text-gray-500 mb-4">Phone: {selected.phone}</p>}
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{selected.message}</p>
            <p className="text-xs text-gray-400 mb-4">{new Date(selected.createdAt).toLocaleString()}</p>
            <button onClick={() => setSelected(null)} className="btn-primary text-sm">Close</button>
          </div>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <Mail size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg: any) => (
            <div key={msg.id} className="bg-white rounded-sm border border-gray-100 p-4 hover:border-gold-400/50 transition-colors cursor-pointer" onClick={() => setSelected(msg)}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-navy-800 text-sm">{msg.subject}</h3>
                  <p className="text-gray-500 text-xs mt-1">From: {msg.name} ({msg.email})</p>
                  <p className="text-gray-400 text-xs mt-2 line-clamp-1">{msg.message}</p>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0 ml-4">
                  <Clock size={12} />
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
