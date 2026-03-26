'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem, HoverScale } from '@/components/animations/MotionWrapper'
import { Building2, Gavel, Home, Users, ShieldAlert, Lightbulb, Globe, Calculator, ArrowRight, Scale, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Building2, Gavel, Home, Users, ShieldAlert, Lightbulb, Globe, Calculator, Scale,
}

const fallbackServices = [
  { title: 'Corporate Law', slug: 'corporate-law', icon: 'Building2', description: 'Strategic counsel for businesses from formation through complex transactions, mergers & acquisitions, corporate governance, and regulatory compliance.' },
  { title: 'Litigation', slug: 'litigation', icon: 'Gavel', description: 'Aggressive and effective representation in civil and commercial disputes at trial and appellate court levels, including arbitration and mediation.' },
  { title: 'Real Estate', slug: 'real-estate', icon: 'Home', description: 'Comprehensive legal support for property transactions, commercial leasing, real estate development, zoning, and property disputes.' },
  { title: 'Family Law', slug: 'family-law', icon: 'Users', description: 'Compassionate and strategic guidance through divorce, child custody, adoption, prenuptial agreements, and domestic relations matters.' },
  { title: 'Criminal Defense', slug: 'criminal-defense', icon: 'ShieldAlert', description: 'Vigorous defense protecting your constitutional rights and freedom in state and federal criminal proceedings.' },
  { title: 'Intellectual Property', slug: 'intellectual-property', icon: 'Lightbulb', description: 'Full-spectrum IP protection including patent prosecution, trademark registration, copyright, trade secrets, and IP litigation.' },
  { title: 'Immigration', slug: 'immigration', icon: 'Globe', description: 'Expert guidance through visa applications, green card petitions, naturalization, deportation defense, and business immigration.' },
  { title: 'Tax Law', slug: 'tax-law', icon: 'Calculator', description: 'Strategic tax planning, compliance, IRS audit representation, tax controversy, and estate tax planning for individuals and businesses.' },
]

interface ServiceData {
  id: string
  title: string
  slug: string
  description: string
  icon?: string | null
  image?: string | null
  isActive: boolean
}

function getIcon(iconName?: string | null): LucideIcon {
  if (iconName && iconMap[iconName]) return iconMap[iconName]
  return Scale
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data)
        } else {
          setServices(fallbackServices as unknown as ServiceData[])
        }
      })
      .catch(() => setServices(fallbackServices as unknown as ServiceData[]))
      .finally(() => setLoaded(true))
  }, [])

  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">What We Do</motion.p>
          <GSAPTextReveal text="Our Practice Areas" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Comprehensive legal services across all major practice areas, delivered by experienced attorneys committed to your success.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {!loaded ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" />
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const IconComponent = getIcon(service.icon)
                return (
                  <StaggerItem key={service.slug}>
                    <HoverScale>
                      <Link href={`/services/${service.slug}`} className="group flex gap-6 p-8 bg-gray-50 rounded-sm card-hover border border-gray-100">
                        <div className="w-16 h-16 rounded-sm bg-gold-50 flex items-center justify-center shrink-0 group-hover:bg-gold-400 transition-colors duration-300">
                          <IconComponent size={30} className="text-gold-500 group-hover:text-navy-800 transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="text-xl font-heading font-semibold text-navy-800 mb-3 group-hover:text-gold-500 transition-colors">{service.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                          <span className="inline-flex items-center text-sm font-medium text-gold-500">
                            Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </HoverScale>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  )
}
