'use client'

import { useEffect, useState } from 'react'
import { BookOpen, Plus, Edit2, Trash2, Save, X, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import ImageUpload from '@/components/admin/ImageUpload'

const emptyForm = { title: '', slug: '', excerpt: '', content: '', image: '', category: '', tags: '', published: false }

export default function AdminBlogPage() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?all=true')
      const data = await res.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch { setPosts([]) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setForm(emptyForm); setShowForm(false); setEditingId(null) }

  const startEdit = (p: any) => {
    setEditingId(p.id)
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || '',
      content: p.content,
      image: p.image || '',
      category: p.category || '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
      published: p.published,
    })
    setShowForm(true)
  }

  const handleSubmit = async () => {
    if (!form.title || !form.slug || !form.content) { toast.error('Title, slug, and content are required'); return }

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      authorId: (session?.user as any)?.id,
    }

    try {
      if (editingId) {
        const { authorId, ...updateData } = payload
        await fetch(`/api/blog/${editingId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updateData) })
        toast.success('Post updated')
      } else {
        await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        toast.success('Post created')
      }
      resetForm(); fetchPosts()
    } catch { toast.error('Failed to save post') }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      await fetch(`/api/blog/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ published: !published }) })
      toast.success(published ? 'Post unpublished' : 'Post published')
      fetchPosts()
    } catch { toast.error('Failed to update') }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this blog post?')) return
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      toast.success('Post deleted')
      fetchPosts()
    } catch { toast.error('Failed to delete') }
  }

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Blog Posts</h1>
        <button onClick={() => { if (showForm) resetForm(); else setShowForm(true) }} className="btn-primary text-sm flex items-center gap-2">
          {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> New Post</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-heading font-semibold text-navy-800 mb-4">{editingId ? 'Edit Post' : 'New Blog Post'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingId ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Blog post title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. Corporate Law" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="e.g. legal, business, tips" />
            </div>
          </div>
          <div className="mb-4">
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} label="Featured Image" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="Brief summary for listings..." />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="w-full px-3 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 font-mono text-sm" placeholder="Write your blog post content here..." />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-gold-400" />
              <span className="text-sm text-gray-700">Publish immediately</span>
            </label>
          </div>
          <button onClick={handleSubmit} className="btn-primary text-sm flex items-center gap-2"><Save size={16} /> {editingId ? 'Update' : 'Save'} Post</button>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="bg-white rounded-sm border border-gray-100 p-12 text-center">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No blog posts yet. Click &quot;New Post&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-sm border border-gray-100 p-4 flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-navy-800 truncate">{post.title}</h3>
                  {post.category && <span className="px-2 py-0.5 text-[10px] bg-gold-50 text-gold-700 rounded-sm shrink-0">{post.category}</span>}
                </div>
                {post.excerpt && <p className="text-gray-500 text-sm truncate">{post.excerpt}</p>}
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-gray-400 text-xs">/blog/{post.slug}</p>
                  {post.author && <p className="text-gray-400 text-xs">by {post.author.name}</p>}
                  <p className="text-gray-400 text-xs">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button onClick={() => togglePublished(post.id, post.published)} className="p-1.5 rounded hover:bg-gray-100" title={post.published ? 'Unpublish' : 'Publish'}>
                  {post.published ? <Eye size={18} className="text-green-500" /> : <EyeOff size={18} className="text-gray-400" />}
                </button>
                <button onClick={() => startEdit(post)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Edit"><Edit2 size={16} /></button>
                <button onClick={() => deletePost(post.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
