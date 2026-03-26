'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPReveal, GSAPTextReveal, GSAPCounter } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper'
import { Award, Users, Scale, Shield, Target, Eye, Heart, CheckCircle2 } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Integrity', description: 'We uphold the highest ethical standards in every interaction and case we handle.' },
  { icon: Target, title: 'Excellence', description: 'We strive for outstanding results through meticulous preparation and strategic thinking.' },
  { icon: Eye, title: 'Transparency', description: 'We maintain open communication and honest counsel with every client.' },
  { icon: Heart, title: 'Client First', description: 'Your interests are our priority. We tailor our approach to your unique needs.' },
]

const timeline = [
  { year: '2001', title: 'Firm Founded', description: 'Lex Dominion Partners established with a vision of legal excellence.' },
  { year: '2005', title: 'Regional Expansion', description: 'Opened second office and expanded practice areas to serve more clients.' },
  { year: '2010', title: 'National Recognition', description: 'Recognized as a top-tier law firm by Legal 500 and Chambers & Partners.' },
  { year: '2015', title: '500+ Cases Won', description: 'Milestone achievement of 500 successfully resolved cases across all practice areas.' },
  { year: '2020', title: 'Digital Transformation', description: 'Launched online consultation services and AI-powered client support.' },
  { year: '2026', title: 'Continued Leadership', description: 'Celebrating 25 years of legal excellence with 50+ expert attorneys.' },
]

export default function AboutPage() {
  const [customContent, setCustomContent] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.page_about) setCustomContent(data.page_about)
      })
      .catch(() => {})
  }, [])

  if (customContent) {
    return (
      <>
        <section className="relative py-24 bg-navy-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
          </div>
          <div className="container-custom relative z-10 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">About Our Firm</motion.p>
            <GSAPTextReveal text="A Legacy of Legal Excellence" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600" dangerouslySetInnerHTML={{ __html: customContent }} />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">
            About Our Firm
          </motion.p>
          <GSAPTextReveal text="A Legacy of Legal Excellence" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            For over 25 years, Lex Dominion Partners has been at the forefront of legal practice, combining deep expertise with innovative strategies.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <GSAPReveal animation="fadeLeft">
              <div className="relative">
                <div className="aspect-[4/3] bg-navy-800 rounded-sm overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                    alt="Professional team collaborating in office"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold-400 rounded-sm" />
              </div>
            </GSAPReveal>
            <GSAPReveal animation="fadeRight" delay={0.2}>
              <div>
                <p className="text-gold-500 font-medium tracking-wider uppercase text-sm mb-4">Our Story</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-800 mb-6">Founded on Principles of Justice</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Lex Dominion Partners was founded in 2001 by a group of visionary attorneys who believed that legal practice should be defined by both excellence and integrity. What began as a small boutique firm has grown into a powerhouse of legal talent.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Today, our team of 50+ expert attorneys covers every major practice area, serving individuals and corporations with the same dedication and strategic brilliance that has defined our firm from day one.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[{ value: 25, suffix: '+', label: 'Years Experience' }, { value: 98, suffix: '%', label: 'Success Rate' }].map((s, i) => (
                    <div key={i} className="text-center p-4 bg-gray-50 rounded-sm">
                      <div className="text-3xl font-heading font-bold text-navy-800">
                        <GSAPCounter end={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-gray-500 text-sm mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GSAPReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-500 font-medium tracking-wider uppercase text-sm mb-4">Our Values</p>
            <GSAPTextReveal text="What We Stand For" tag="h2" className="text-3xl md:text-5xl font-bold text-navy-800 mb-6" />
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val) => (
              <StaggerItem key={val.title}>
                <div className="bg-white p-8 rounded-sm text-center card-hover h-full">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gold-50 rounded-full flex items-center justify-center">
                    <val.icon size={30} className="text-gold-500" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-navy-800 mb-3">{val.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-navy-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Our Journey</p>
            <GSAPTextReveal text="Milestones & Achievements" tag="h2" className="text-3xl md:text-5xl font-bold text-white mb-6" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gold-400/30 hidden md:block" />
            {timeline.map((item, i) => (
              <GSAPReveal key={item.year} animation={i % 2 === 0 ? 'fadeLeft' : 'fadeRight'} delay={i * 0.1}>
                <div className={`flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-navy-700 p-6 rounded-sm">
                      <span className="text-gold-400 font-heading font-bold text-2xl">{item.year}</span>
                      <h3 className="text-white font-semibold text-lg mt-2">{item.title}</h3>
                      <p className="text-white/60 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-gold-400 rounded-full border-4 border-navy-800 z-10 shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
