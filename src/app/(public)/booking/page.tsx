'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const practiceAreas = [
  'Corporate Law', 'Litigation', 'Real Estate', 'Family Law',
  'Criminal Defense', 'Intellectual Property', 'Immigration', 'Tax Law', 'Other',
]

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    service: '', date: '', time: '', message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setBooked(true); toast.success('Consultation booked successfully!') }
      else toast.error('Failed to book consultation')
    } catch { toast.error('Something went wrong') }
    finally { setLoading(false) }
  }

  const updateForm = (field: string, value: string) => setForm({ ...form, [field]: value })

  if (booked) {
    return (
      <>
        <section className="relative py-24 bg-navy-800"><div className="container-custom text-center"><h1 className="text-4xl md:text-5xl font-heading font-bold text-white">Booking Confirmed</h1></div></section>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-2xl mx-auto text-center">
            <CheckCircle2 size={80} className="text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold text-navy-800 mb-4">Your Consultation is Booked!</h2>
            <p className="text-gray-600 mb-8">We&apos;ve received your booking request. Our team will confirm your appointment via email within 24 hours.</p>
            <div className="bg-gray-50 rounded-sm p-6 text-left space-y-3 mb-8">
              <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Practice Area:</strong> {form.service}</p>
              <p><strong>Date:</strong> {form.date}</p>
              <p><strong>Time:</strong> {form.time}</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} /></div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Schedule a Meeting</motion.p>
          <GSAPTextReveal text="Book a Consultation" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Take the first step toward resolving your legal matter. Schedule a confidential consultation with one of our expert attorneys.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-gold-400 text-navy-800' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
                <span className={`text-sm font-medium hidden sm:block ${step >= s ? 'text-navy-800' : 'text-gray-400'}`}>
                  {s === 1 ? 'Your Info' : s === 2 ? 'Schedule' : 'Confirm'}
                </span>
                {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gold-400' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <MotionDiv>
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-navy-800 mb-6">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name *" required value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                    <input type="text" placeholder="Last Name *" required value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="email" placeholder="Email Address *" required value={form.email} onChange={(e) => updateForm('email', e.target.value)} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                    <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} className="px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Practice Area *</label>
                    <select required value={form.service} onChange={(e) => updateForm('service', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 bg-white">
                      <option value="">Select a practice area</option>
                      {practiceAreas.map((area) => <option key={area} value={area}>{area}</option>)}
                    </select>
                  </div>
                  <button type="button" onClick={() => { if (form.firstName && form.lastName && form.email && form.phone && form.service) setStep(2); else toast.error('Please fill in all required fields') }} className="btn-primary flex items-center gap-2">
                    Next Step <ArrowRight size={18} />
                  </button>
                </div>
              </MotionDiv>
            )}

            {step === 2 && (
              <MotionDiv>
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-navy-800 mb-6">Select Date & Time</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                    <input type="date" required value={form.date} onChange={(e) => updateForm('date', e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <button key={slot} type="button" onClick={() => updateForm('time', slot)} className={`p-3 text-sm border rounded-sm transition-colors ${form.time === slot ? 'bg-gold-400 text-navy-800 border-gold-400 font-semibold' : 'border-gray-200 hover:border-gold-400'}`}>{slot}</button>
                      ))}
                    </div>
                  </div>
                  <textarea placeholder="Additional details about your legal matter (optional)" rows={4} value={form.message} onChange={(e) => updateForm('message', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 resize-none" />
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
                    <button type="button" onClick={() => { if (form.date && form.time) setStep(3); else toast.error('Please select date and time') }} className="btn-primary flex items-center gap-2">
                      Next Step <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </MotionDiv>
            )}

            {step === 3 && (
              <MotionDiv>
                <div className="space-y-6">
                  <h2 className="text-2xl font-heading font-bold text-navy-800 mb-6">Confirm Your Booking</h2>
                  <div className="bg-gray-50 rounded-sm p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">Name:</span><p className="font-medium text-navy-800">{form.firstName} {form.lastName}</p></div>
                      <div><span className="text-gray-500">Email:</span><p className="font-medium text-navy-800">{form.email}</p></div>
                      <div><span className="text-gray-500">Phone:</span><p className="font-medium text-navy-800">{form.phone}</p></div>
                      <div><span className="text-gray-500">Practice Area:</span><p className="font-medium text-navy-800">{form.service}</p></div>
                      <div><span className="text-gray-500">Date:</span><p className="font-medium text-navy-800">{form.date}</p></div>
                      <div><span className="text-gray-500">Time:</span><p className="font-medium text-navy-800">{form.time}</p></div>
                    </div>
                    {form.message && <div className="text-sm"><span className="text-gray-500">Additional Details:</span><p className="font-medium text-navy-800 mt-1">{form.message}</p></div>}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
                    <button type="submit" disabled={loading} className="btn-primary">{loading ? 'Booking...' : 'Confirm Booking'}</button>
                  </div>
                </div>
              </MotionDiv>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
