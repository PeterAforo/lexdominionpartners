'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setSent(true); toast.success('Message sent successfully!') }
      else toast.error('Failed to send message')
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', lines: ['123 Legal Avenue, Suite 500', 'New York, NY 10001'] },
    { icon: Phone, title: 'Call Us', lines: ['+1 (234) 567-890', '+1 (234) 567-891'] },
    { icon: Mail, title: 'Email Us', lines: ['info@lexdominion.com', 'support@lexdominion.com'] },
    { icon: Clock, title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'] },
  ]

  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} /></div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Get in Touch</motion.p>
          <GSAPTextReveal text="Contact Us" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Have a legal question? Ready to schedule a consultation? Reach out to us and our team will respond promptly.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <MotionDiv key={info.title} delay={i * 0.1}>
                <div className="p-6 bg-gray-50 rounded-sm text-center card-hover h-full">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gold-50 rounded-full flex items-center justify-center">
                    <info.icon size={24} className="text-gold-500" />
                  </div>
                  <h3 className="font-heading font-semibold text-navy-800 mb-3">{info.title}</h3>
                  {info.lines.map((line, j) => <p key={j} className="text-gray-600 text-sm">{line}</p>)}
                </div>
              </MotionDiv>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <MotionDiv>
              <div className="bg-navy-800 rounded-sm p-8 h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <MapPin size={64} className="text-gold-400/30 mx-auto mb-4" />
                  <h3 className="text-white font-heading text-xl font-semibold mb-2">Our Location</h3>
                  <p className="text-white/60 text-sm">123 Legal Avenue, Suite 500<br />New York, NY 10001</p>
                </div>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.2}>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <CheckCircle2 size={64} className="text-green-500 mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-navy-800 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }} className="btn-primary">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-heading font-bold text-navy-800 mb-6">Send Us a Message</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                    <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                    <input type="text" placeholder="Subject *" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                  </div>
                  <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 resize-none" />
                  <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                    {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              )}
            </MotionDiv>
          </div>
        </div>
      </section>
    </>
  )
}
