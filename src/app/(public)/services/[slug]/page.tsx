'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { ArrowLeft, CheckCircle2, Phone } from 'lucide-react'

const fallbackData: Record<string, { title: string; description: string; content?: string }> = {
  'corporate-law': { title: 'Corporate Law', description: 'Our Corporate Law team provides strategic counsel to businesses of all sizes, from startups to multinational corporations. We guide clients through formation, governance, transactions, and regulatory compliance with precision and foresight.' },
  'litigation': { title: 'Litigation', description: 'Our litigation team combines aggressive advocacy with strategic thinking to achieve optimal outcomes. We represent clients in complex civil and commercial disputes across all court levels.' },
  'real-estate': { title: 'Real Estate', description: 'Our real estate practice covers the full spectrum of property law, from residential transactions to large-scale commercial development projects.' },
  'family-law': { title: 'Family Law', description: 'We provide compassionate yet strategic representation in all family law matters, protecting your rights and the well-being of your loved ones.' },
  'criminal-defense': { title: 'Criminal Defense', description: 'Our criminal defense attorneys fight vigorously to protect your constitutional rights, freedom, and reputation in both state and federal proceedings.' },
  'intellectual-property': { title: 'Intellectual Property', description: 'We help innovators and creators protect their most valuable assets through comprehensive IP strategies covering patents, trademarks, copyrights, and trade secrets.' },
  'immigration': { title: 'Immigration', description: 'Our immigration team helps individuals and businesses navigate the complex U.S. immigration system with expertise and dedication.' },
  'tax-law': { title: 'Tax Law', description: 'Our tax attorneys provide strategic advice on federal, state, and local tax matters for individuals, businesses, and tax-exempt organizations.' },
}

interface ServiceDetail {
  id: string
  title: string
  slug: string
  description: string
  content?: string | null
  image?: string | null
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [service, setService] = useState<ServiceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => setService(data))
      .catch(() => {
        const fb = fallbackData[slug]
        if (fb) {
          setService({ id: slug, title: fb.title, slug, description: fb.description, content: fb.content || null } as ServiceDetail)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>
  }

  if (notFound || !service) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-3xl font-heading font-bold text-navy-800">Service Not Found</h1>
        <Link href="/services" className="btn-primary mt-6 inline-block">View All Services</Link>
      </div>
    )
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        <div className="absolute inset-0">
          <Image
            src={service.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80'}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/85" />
        </div>
        <div className="container-custom relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8">
            <ArrowLeft size={18} /> Back to Practice Areas
          </Link>
          <GSAPTextReveal text={service.title} tag="h1" className="text-4xl md:text-6xl font-bold text-white" />
          <p className="text-white/70 text-lg mt-4 max-w-2xl">{service.description}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <MotionDiv>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">{service.description}</p>
              </MotionDiv>

              {service.content && (
                <MotionDiv delay={0.1}>
                  <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-a:text-gold-500 mb-12" dangerouslySetInnerHTML={{ __html: service.content }} />
                </MotionDiv>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-navy-800 text-white p-8 rounded-sm">
                  <h3 className="text-xl font-heading font-semibold mb-4">Need Legal Help?</h3>
                  <p className="text-white/70 text-sm mb-6">Schedule a confidential consultation with our {service.title} team.</p>
                  <Link href="/booking" className="btn-primary w-full text-center text-sm">Book Consultation</Link>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <a href="tel:+233264511778" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors">
                      <Phone size={18} /> 0264511778
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
