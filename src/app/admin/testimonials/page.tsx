'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, Plus, Edit2, Trash2, Save, X, Star, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'

const emptyForm = { name: '', title: '', company: '', content: '', image: '', rating: 5, order: 0 }

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchTestimonials() }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials?all=true')
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch { setTestimonials([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (t: any) => {
    setEditingId(t.id)
    setForm({ name: t.name, title: t.title || '', company: t.company || '', content: t.content, image: t.image || '', rating: t.rating, order: t.order })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.content) { toast.error('Name and content are required'); return }
    try {
      if (editingId) {
        await fetch(`/api/testimonials/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Testimonial updated')
      } else {
        await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Testimonial added')
      }
      resetForm(); fetchTestimonials()
    } catch { toast.error('Failed to save') }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !isActive }) })
      toast.success(isActive ? 'Testimonial hidden' : 'Testimonial shown')
      fetchTestimonials()
    } catch { toast.error('Failed to update') }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      toast.success('Testimonial deleted')
      fetchTestimonials()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Testimonials</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Testimonial</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit Testimonial' : 'New Testimonial'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. CEO" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400">
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
          </div>
          <div className="mb-4">
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Client Photo" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="What the client said..." />
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Save'} Testimonial</button>
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No testimonials found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t: any) => (
            <div key={t.id} className="bg-white rounded-sm border border-gray-100 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic mb-2">&ldquo;{t.content}&rdquo;</p>
                  <p className="font-medium text-navy-800 text-sm">{t.name}</p>
                  {t.title && <p className="text-gray-500 text-xs">{t.title}</p>}
                  {t.company && <p className="text-gray-400 text-xs">{t.company}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button onClick={() => toggleActive(t.id, t.isActive)} className="p-1.5 rounded hover:bg-gray-100" title={t.isActive ? 'Hide' : 'Show'}>
                    {t.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} className="text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(t)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
