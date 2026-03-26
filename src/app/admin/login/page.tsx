'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Scale, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await signIn('credentials', { email, password, redirect: false })
      if (res?.ok) {
        toast.success('Welcome back!')
        router.push('/admin')
      } else {
        toast.error('Invalid credentials')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scale size={32} className="text-gold-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Lex Dominion Partners</h1>
          <p className="text-white/60 text-sm mt-1">Admin Dashboard Login</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-sm p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@lexdominion.com" className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
          <p className="text-center text-xs text-gray-400">Authorized personnel only</p>
        </form>
      </div>
    </div>
  )
}
