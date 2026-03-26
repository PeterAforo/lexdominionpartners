'use client'

import { useEffect, useState } from 'react'
import { Users, Plus, Edit2, Trash2, Save, X, ToggleLeft, ToggleRight } from 'lucide-react'
import toast from 'react-hot-toast'
import ImageUpload from '@/components/admin/ImageUpload'

const emptyForm = { name: '', slug: '', title: '', email: '', phone: '', bio: '', education: '', barAdmissions: '', languages: '', image: '', order: 0 }

export default function AdminTeamPage() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchMembers() }, [])

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/team?all=true')
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch { setMembers([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (m: any) => {
    setEditingId(m.id)
    setForm({ name: m.name, slug: m.slug, title: m.title, email: m.email || '', phone: m.phone || '', bio: m.bio || '', education: m.education || '', barAdmissions: m.barAdmissions || '', languages: m.languages || '', image: m.image || '', order: m.order })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.slug || !form.title) { toast.error('Fill in all required fields'); return }
    try {
      if (editingId) {
        await fetch(`/api/team/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Member updated')
      } else {
        await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        toast.success('Member added')
      }
      resetForm(); fetchMembers()
    } catch { toast.error('Failed to save') }
  }

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      await fetch(`/api/team/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isActive: !isActive }) })
      toast.success(isActive ? 'Member deactivated' : 'Member activated')
      fetchMembers()
    } catch { toast.error('Failed to update') }
  }

  const deleteMember = async (id: string) => {
    if (!confirm('Delete this team member?')) return
    try {
      await fetch(`/api/team/${id}`, { method: 'DELETE' })
      toast.success('Member deleted')
      fetchMembers()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Team Members</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Member</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit Member' : 'New Team Member'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editingId ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Managing Partner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input type="text" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Harvard Law School" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bar Admissions</label>
              <input type="text" value={form.barAdmissions} onChange={(e) => setForm({ ...form, barAdmissions: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. New York, California" />
            </div>
          </div>
          <div className="mb-4">
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Photo" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
            <input type="text" value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. English, French, Akan" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Save'} Member</button>
        </div>
      )}

      {members.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <Users size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No team members found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member: any) => (
            <div key={member.id} className="bg-white rounded-sm border border-gray-100 p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-navy-800 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-navy-800">{member.name}</h3>
                  <p className="text-gold-500 text-sm">{member.title}</p>
                  {member.email && <p className="text-gray-400 text-xs mt-1">{member.email}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleActive(member.id, member.isActive)} className="p-1.5 rounded hover:bg-gray-100" title={member.isActive ? 'Deactivate' : 'Activate'}>
                    {member.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} className="text-gray-400" />}
                  </button>
                  <button onClick={() => startEdit(member)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => deleteMember(member.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
