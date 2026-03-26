'use client'

import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    firmName: 'Lex Dominion Partners',
    tagline: 'Law & Leadership',
    email: 'info@lexdominion.com',
    phone: '+1 (234) 567-890',
    address: '123 Legal Avenue, Suite 500, New York, NY 10001',
    officeHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-2PM',
  })

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-navy-800 mb-6">Site Settings</h1>
      <div className="bg-white rounded-sm border border-gray-100 p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Firm Name</label>
            <input type="text" value={settings.firmName} onChange={(e) => setSettings({ ...settings, firmName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Office Hours</label>
            <input type="text" value={settings.officeHours} onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2"><Save size={18} /> Save Settings</button>
        </div>
      </div>
    </div>
  )
}
