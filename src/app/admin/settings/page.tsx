'use client'

import { useEffect, useState } from 'react'
import { Save, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const defaultSettings: Record<string, string> = {
  firmName: 'Lex Dominion Partners',
  tagline: 'Law & Leadership',
  email: 'info@lexdominion.com',
  phone: '0264511778',
  address: 'DVLA Adenta, directly opposite the Goil Filling Station @ Ritz Junction',
  officeHoursWeekday: 'Mon-Fri: 9AM-5PM',
  officeHoursSaturday: 'Sat: Closed',
  officeHoursSunday: 'Sun: Closed',
  socialFacebook: '',
  socialTwitter: '',
  socialLinkedin: '',
  socialInstagram: '',
  metaDescription: 'Premier law firm delivering exceptional legal services with a commitment to leadership, integrity, and client success.',
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings')
        const data = await res.json()
        if (data && typeof data === 'object' && !data.error) {
          setSettings((prev) => ({ ...prev, ...data }))
        }
      } catch { /* use defaults */ }
      finally { setLoading(false) }
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      if (res.ok) toast.success('Settings saved successfully!')
      else toast.error('Failed to save settings')
    } catch { toast.error('Failed to save settings') }
    finally { setSaving(false) }
  }

  const update = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }))

  if (loading) return <div className="flex items-center justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-navy-800 mb-6">Site Settings</h1>

      <div className="space-y-6 max-w-3xl">
        {/* General */}
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="font-heading font-semibold text-navy-800 mb-4">General</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firm Name</label>
              <input type="text" value={settings.firmName} onChange={(e) => update('firmName', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                <input type="text" value={settings.tagline} onChange={(e) => update('tagline', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <input type="text" value={settings.metaDescription} onChange={(e) => update('metaDescription', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="font-heading font-semibold text-navy-800 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={settings.phone} onChange={(e) => update('phone', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={settings.address} onChange={(e) => update('address', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
          </div>
        </div>

        {/* Office Hours */}
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="font-heading font-semibold text-navy-800 mb-4">Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weekday</label>
              <input type="text" value={settings.officeHoursWeekday} onChange={(e) => update('officeHoursWeekday', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Saturday</label>
              <input type="text" value={settings.officeHoursSaturday} onChange={(e) => update('officeHoursSaturday', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sunday</label>
              <input type="text" value={settings.officeHoursSunday} onChange={(e) => update('officeHoursSunday', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-sm border border-gray-100 p-6">
          <h2 className="font-heading font-semibold text-navy-800 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="url" value={settings.socialFacebook} onChange={(e) => update('socialFacebook', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X URL</label>
              <input type="url" value={settings.socialTwitter} onChange={(e) => update('socialTwitter', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="https://x.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" value={settings.socialLinkedin} onChange={(e) => update('socialLinkedin', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="https://linkedin.com/company/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="url" value={settings.socialInstagram} onChange={(e) => update('socialInstagram', e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400" placeholder="https://instagram.com/..." />
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  )
}
