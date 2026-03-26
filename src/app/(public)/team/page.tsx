'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem, HoverScale } from '@/components/animations/MotionWrapper'
import { Mail, Phone, Linkedin } from 'lucide-react'

const team = [
  { name: 'Alexander Whitmore', slug: 'alexander-whitmore', title: 'Managing Partner', specialty: 'Corporate Law', bio: 'Over 30 years of experience in corporate law and business strategy.' },
  { name: 'Victoria Chen', slug: 'victoria-chen', title: 'Senior Partner', specialty: 'Litigation', bio: 'Award-winning litigator with expertise in complex commercial disputes.' },
  { name: 'Marcus Rivera', slug: 'marcus-rivera', title: 'Partner', specialty: 'Real Estate', bio: 'Leading real estate attorney with extensive transaction experience.' },
  { name: 'Catherine Okafor', slug: 'catherine-okafor', title: 'Partner', specialty: 'Family Law', bio: 'Compassionate advocate for families navigating complex legal matters.' },
  { name: 'Jonathan Drake', slug: 'jonathan-drake', title: 'Partner', specialty: 'Criminal Defense', bio: 'Former prosecutor turned defense attorney with a 95% acquittal rate.' },
  { name: 'Sophia Nakamura', slug: 'sophia-nakamura', title: 'Partner', specialty: 'Intellectual Property', bio: 'Patent attorney and tech law specialist with engineering background.' },
  { name: 'Daniel Hoffman', slug: 'daniel-hoffman', title: 'Senior Associate', specialty: 'Immigration', bio: 'Multilingual immigration attorney helping families and businesses.' },
  { name: 'Amara Osei', slug: 'amara-osei', title: 'Senior Associate', specialty: 'Tax Law', bio: 'CPA and tax attorney providing strategic tax planning solutions.' },
]

export default function TeamPage() {
  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Our Attorneys</motion.p>
          <GSAPTextReveal text="Meet Our Team" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Our team of distinguished attorneys brings decades of combined experience and a passion for justice to every case.
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <StaggerItem key={member.slug}>
                <HoverScale>
                  <Link href={`/team/${member.slug}`} className="group block bg-white rounded-sm overflow-hidden card-hover border border-gray-100">
                    <div className="aspect-[3/4] bg-navy-800 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-heading font-bold text-gold-400/20">{member.name.charAt(0)}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-3 justify-center">
                          <span className="w-9 h-9 bg-gold-400 rounded-full flex items-center justify-center"><Mail size={16} className="text-navy-800" /></span>
                          <span className="w-9 h-9 bg-gold-400 rounded-full flex items-center justify-center"><Phone size={16} className="text-navy-800" /></span>
                          <span className="w-9 h-9 bg-gold-400 rounded-full flex items-center justify-center"><Linkedin size={16} className="text-navy-800" /></span>
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-heading font-semibold text-navy-800 group-hover:text-gold-500 transition-colors">{member.name}</h3>
                      <p className="text-gold-500 text-sm font-medium">{member.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{member.specialty}</p>
                    </div>
                  </Link>
                </HoverScale>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
