'use client'

import { useEffect, useState } from 'react'
import { FileText, Plus, Edit2, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'

const emptyForm = { title: '', slug: '', description: '', content: '', icon: '', image: '', order: 0 }

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services?all=true')
      const data = await res.json()
      setServices(Array.isArray(data) ? data : [])
    } catch { setServices([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (service: any) => {
    setEditingId(service.id)
    setForm({ title: service.title, slug: service.slug, description: service.description, content: service.content || '', icon: service.icon || '', image: service.image || '', order: service.order })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.description) { toast.error('Fill in all required fields'); return }
    try {
      if (editingId) {
        await fetch(`/api/services/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Service updated')
      } else {
        await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Service created')
      }
      resetForm(); fetchServices()
    } catch { toast.error('Failed to save service') }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/services/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !isActive }) })
      toast.success(isActive ? 'Service deactivated' : 'Service activated')
      fetchServices()
    } catch { toast.error('Failed to update') }
  }

  const deleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await fetch(`/api/services/${id}`, { method: 'DELETE' })
      toast.success('Service deleted')
      fetchServices()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Services</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Service</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit Service' : 'New Service'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Corporate Law" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <input type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Building2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Brief description" />
          </div>
          <div className="mb-4">
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Service Image" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content (detailed page content)</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={5} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Full service page content..." />
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Save'} Service</button>
        </div>
      )}

      {services.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No services found. Click &quot;Add Service&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service: any) => (
            <div key={service.id} className="bg-white rounded-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-navy-800">{service.title}</h3>
                <p className="text-gray-500 text-sm truncate">{service.description}</p>
                <p className="text-gray-400 text-xs mt-1">/{service.slug} · Order: {service.order}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button onClick={() => toggleActive(service.id, service.isActive)} className="p-1.5 rounded hover:bg-gray-100" title={service.isActive ? 'Deactivate' : 'Activate'}>
                  {service.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} className="text-gray-400" />}
                </button>
                <button onClick={() => startEdit(service)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                <button onClick={() => deleteService(service.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
