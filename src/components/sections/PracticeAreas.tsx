'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { StaggerContainer, StaggerItem, HoverScale } from '@/components/animations/MotionWrapper'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import {
  Building2,
  Gavel,
  Home,
  Users,
  ShieldAlert,
  Lightbulb,
  Globe,
  Calculator,
  ArrowRight,
} from 'lucide-react'

const practiceAreas = [
  {
    title: 'Corporate Law',
    slug: 'corporate-law',
    description: 'Strategic counsel for businesses from formation through complex transactions and governance.',
    icon: Building2,
  },
  {
    title: 'Litigation',
    slug: 'litigation',
    description: 'Aggressive representation in civil and commercial disputes at all court levels.',
    icon: Gavel,
  },
  {
    title: 'Real Estate',
    slug: 'real-estate',
    description: 'Comprehensive legal support for property transactions, development, and disputes.',
    icon: Home,
  },
  {
    title: 'Family Law',
    slug: 'family-law',
    description: 'Compassionate guidance through divorce, custody, and family legal matters.',
    icon: Users,
  },
  {
    title: 'Criminal Defense',
    slug: 'criminal-defense',
    description: 'Vigorous defense protecting your rights and freedom in criminal proceedings.',
    icon: ShieldAlert,
  },
  {
    title: 'Intellectual Property',
    slug: 'intellectual-property',
    description: 'Protection and enforcement of patents, trademarks, copyrights, and trade secrets.',
    icon: Lightbulb,
  },
  {
    title: 'Immigration',
    slug: 'immigration',
    description: 'Expert guidance through visa applications, green cards, and citizenship processes.',
    icon: Globe,
  },
  {
    title: 'Tax Law',
    slug: 'tax-law',
    description: 'Strategic tax planning, compliance, and dispute resolution for individuals and businesses.',
    icon: Calculator,
  },
]

export default function PracticeAreas() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-500 font-medium tracking-wider uppercase text-sm mb-4"
          >
            Our Expertise
          </motion.p>
          <GSAPTextReveal
            text="Practice Areas"
            tag="h2"
            className="text-3xl md:text-5xl font-bold text-navy-800 mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg"
          >
            We offer comprehensive legal services across a wide range of practice
            areas, delivering tailored solutions for every client.
          </motion.p>
        </div>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area) => (
            <StaggerItem key={area.slug}>
              <HoverScale>
                <Link
                  href={`/services/${area.slug}`}
                  className="group block bg-white p-8 rounded-sm border border-gray-100 card-hover h-full"
                >
                  <div className="w-14 h-14 rounded-sm bg-gold-50 flex items-center justify-center mb-6 group-hover:bg-gold-400 transition-colors duration-300">
                    <area.icon
                      size={28}
                      className="text-gold-500 group-hover:text-navy-800 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-navy-800 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-gold-500 group-hover:text-gold-600">
                    Learn More
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </HoverScale>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
