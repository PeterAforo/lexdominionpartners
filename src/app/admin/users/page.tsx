'use client'

import { useEffect, useState } from 'react'
import { UserCog, Plus, Edit2, Trash2, Save, X, Shield, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

const emptyForm = { name: '', email: '', password: '', role: 'EDITOR' }

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(Array.isArray(data) ? data : [])
    } catch { setUsers([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (u: any) => {
    setEditingId(u.id)
    setForm({ name: u.name, email: u.email, password: '', role: u.role })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email) { toast.error('Name and email are required'); return }
    if (!editingId && !form.password) { toast.error('Password is required for new users'); return }
    try {
      const payload = { ...form }
      if (editingId && !payload.password) {
        const { password, ...rest } = payload
        if (editingId) {
          await fetch(`/api/users/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rest) })
        }
      } else {
        if (editingId) {
          await fetch(`/api/users/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        } else {
          await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        }
      }
      toast.success(editingId ? 'User updated' : 'User created')
      resetForm(); fetchUsers()
    } catch { toast.error('Failed to save') }
  }

  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data.error || 'Failed to delete')
        return
      }
      toast.success('User deleted')
      fetchUsers()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Users</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add User</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit User' : 'New User'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{editingId ? 'New Password (leave blank to keep)' : 'Password *'}</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder={editingId ? '••••••••' : ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400">
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="EDITOR">Editor</option>
              </select>
            </div>
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Create'} User</button>
        </div>
      )}

      {users.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <UserCog size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((u: any) => (
            <div key={u.id} className="bg-white rounded-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {u.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-medium text-navy-800">{u.name}</h3>
                  <p className="text-gray-500 text-sm">{u.email}</p>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-sm font-medium ${u.role === 'SUPER_ADMIN' ? 'bg-gold-50 text-gold-700' : 'bg-gray-100 text-gray-600'}`}>
                  {u.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Editor'}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => startEdit(u)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                {(session?.user as any)?.id !== u.id && (
                  <button onClick={() => deleteUser(u.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
