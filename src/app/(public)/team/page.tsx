'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem, HoverScale } from '@/components/animations/MotionWrapper'
import { Mail, Phone, Linkedin } from 'lucide-react'

const team = [
  { name: 'Alexander Mensah', slug: 'alexander-mensah', title: 'Managing Partner', specialty: 'Corporate Law', bio: 'Over 30 years of experience in corporate law and business strategy.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' },
  { name: 'Victoria Adeyemi', slug: 'victoria-adeyemi', title: 'Senior Partner', specialty: 'Litigation', bio: 'Award-winning litigator with expertise in complex commercial disputes.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' },
  { name: 'Marcus Okafor', slug: 'marcus-okafor', title: 'Partner', specialty: 'Real Estate', bio: 'Leading real estate attorney with extensive transaction experience.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  { name: 'Catherine Nkosi', slug: 'catherine-nkosi', title: 'Partner', specialty: 'Family Law', bio: 'Compassionate advocate for families navigating complex legal matters.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80' },
  { name: 'Jonathan Afolabi', slug: 'jonathan-afolabi', title: 'Partner', specialty: 'Criminal Defense', bio: 'Former prosecutor turned defense attorney with a 95% acquittal rate.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80' },
  { name: 'Sophia Dlamini', slug: 'sophia-dlamini', title: 'Partner', specialty: 'Intellectual Property', bio: 'Patent attorney and tech law specialist with engineering background.', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=600&q=80' },
  { name: 'Daniel Asante', slug: 'daniel-asante', title: 'Senior Associate', specialty: 'Immigration', bio: 'Multilingual immigration attorney helping families and businesses.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
  { name: 'Amara Osei', slug: 'amara-osei', title: 'Senior Associate', specialty: 'Tax Law', bio: 'CPA and tax attorney providing strategic tax planning solutions.', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80' },
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
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/80" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:translate-y-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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
