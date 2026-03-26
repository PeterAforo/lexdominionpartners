'use client'

import { useEffect, useState } from 'react'
import { Image as ImageIcon, Plus, Edit2, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'

const emptyForm = { title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', image: '', order: 0 }

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchSlides() }, [])

  const fetchSlides = async () => {
    try {
      const res = await fetch('/api/hero-slides?all=true')
      const data = await res.json()
      setSlides(Array.isArray(data) ? data : [])
    } catch { setSlides([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (s: any) => {
    setEditingId(s.id)
    setForm({ title: s.title, subtitle: s.subtitle || '', description: s.description || '', buttonText: s.buttonText || '', buttonLink: s.buttonLink || '', image: s.image || '', order: s.order })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.title) { toast.error('Title is required'); return }
    try {
      if (editingId) {
        await fetch(`/api/hero-slides/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Slide updated')
      } else {
        await fetch('/api/hero-slides', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Slide created')
      }
      resetForm(); fetchSlides()
    } catch { toast.error('Failed to save') }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/hero-slides/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !isActive }) })
      toast.success(isActive ? 'Slide hidden' : 'Slide shown')
      fetchSlides()
    } catch { toast.error('Failed to update') }
  }

  const deleteSlide = async (id: string) => {
    if (!confirm('Delete this slide?')) return
    try {
      await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' })
      toast.success('Slide deleted')
      fetchSlides()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Hero Slides</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Slide</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit Slide' : 'New Slide'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Where Law Meets Leadership" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Trusted Legal Excellence" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input type="text" value={form.buttonText} onChange={(e) => setForm({ ...form, buttonText: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Schedule Consultation" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input type="text" value={form.buttonLink} onChange={(e) => setForm({ ...form, buttonLink: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. /booking" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Hero section description text..." />
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Save'} Slide</button>
        </div>
      )}

      {slides.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No hero slides. Add one to customize the homepage hero.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {slides.map((s: any) => (
            <div key={s.id} className="bg-white rounded-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-navy-800">{s.title}</h3>
                {s.subtitle && <p className="text-gold-500 text-sm">{s.subtitle}</p>}
                {s.description && <p className="text-gray-500 text-sm truncate">{s.description}</p>}
                <p className="text-gray-400 text-xs mt-1">Order: {s.order} {s.buttonText && `· Button: "${s.buttonText}"`}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button onClick={() => toggleActive(s.id, s.isActive)} className="p-1.5 rounded hover:bg-gray-100" title={s.isActive ? 'Hide' : 'Show'}>
                  {s.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} className="text-gray-400" />}
                </button>
                <button onClick={() => startEdit(s)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                <button onClick={() => deleteSlide(s.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
