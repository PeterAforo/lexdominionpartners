'use client'

import { useEffect, useState } from 'react'
import { FileEdit, Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const pageKeys = [
  { key: 'page_about', label: 'About Page', description: 'Main about page content (HTML supported)' },
  { key: 'page_about_highlights', label: 'About Highlights', description: 'Comma-separated highlight items shown on homepage about preview' },
  { key: 'page_about_image', label: 'About Image URL', description: 'Image shown on the about preview section' },
  { key: 'page_privacy', label: 'Privacy Policy', description: 'Privacy policy page content (HTML supported)' },
  { key: 'page_terms', label: 'Terms of Service', description: 'Terms of service page content (HTML supported)' },
  { key: 'page_disclaimer', label: 'Disclaimer', description: 'Disclaimer page content (HTML supported)' },
  { key: 'page_cta_title', label: 'CTA Section Title', description: 'Call-to-action section heading on homepage' },
  { key: 'page_cta_subtitle', label: 'CTA Section Subtitle', description: 'Call-to-action section description text' },
]

export default function AdminPagesPage() {
  const [pages, setPages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState(pageKeys[0].key)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object' && !data.error) {
          setPages(data)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pages),
      })
      if (res.ok) toast.success('Page content saved!')
      else toast.error('Failed to save')
    } catch { toast.error('Failed to save') }
    finally { setSaving(false) }
  }

  const update = (key: string, value: string) => setPages((prev) => ({ ...prev, [key]: value }))

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  const activePage = pageKeys.find((p) => p.key === activeTab)
  const isTextArea = !activeTab.includes('_image') && !activeTab.includes('_highlights')

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-navy-800">Page Content</h1>
        <button onClick={handleSave} disabled={saving} className="btn-primary text-sm flex items-center gap-2">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {pageKeys.map((p) => (
          <button
            key={p.key}
            onClick={() => setActiveTab(p.key)}
            className={`px-3 py-1.5 text-xs rounded-sm font-medium transition-colors ${activeTab === p.key ? 'bg-navy-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-sm border border-gray-100 p-6">
        <div className="mb-4">
          <h3 className="font-heading font-semibold text-navy-800 mb-1">{activePage?.label}</h3>
          <p className="text-gray-500 text-sm">{activePage?.description}</p>
        </div>
        {isTextArea ? (
          <textarea
            value={pages[activeTab] || ''}
            onChange={(e) => update(activeTab, e.target.value)}
            rows={20}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 font-mono text-sm"
            placeholder={`Enter ${activePage?.label} content here... HTML is supported.`}
          />
        ) : (
          <input
            type="text"
            value={pages[activeTab] || ''}
            onChange={(e) => update(activeTab, e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400"
            placeholder={activePage?.description}
          />
        )}
      </div>
    </div>
  )
}
