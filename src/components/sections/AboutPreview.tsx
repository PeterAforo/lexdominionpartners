'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GSAPReveal, GSAPCounter } from '@/components/animations/GSAPWrapper'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const highlights = [
  'Award-winning legal team with decades of experience',
  'Client-centered approach with personalized strategies',
  'Proven track record of successful case outcomes',
  'Transparent communication and competitive pricing',
]

const stats = [
  { value: 25, suffix: '+', label: 'Years of Excellence' },
  { value: 500, suffix: '+', label: 'Cases Resolved' },
  { value: 50, suffix: '+', label: 'Expert Attorneys' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

export default function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image/Visual */}
          <GSAPReveal animation="fadeLeft">
            <div className="relative">
              <div className="aspect-[4/3] bg-navy-800 rounded-sm overflow-hidden relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `linear-gradient(135deg, #C5A54E 0%, transparent 50%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl font-heading font-bold text-gold-400/20">
                      25+
                    </div>
                    <div className="text-xl text-white/80 font-heading mt-2">
                      Years of Legal Excellence
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gold-400 text-navy-800 p-6 rounded-sm shadow-xl"
              >
                <div className="text-3xl font-heading font-bold">98%</div>
                <div className="text-sm font-medium">Success Rate</div>
              </motion.div>
            </div>
          </GSAPReveal>

          {/* Right: Content */}
          <GSAPReveal animation="fadeRight" delay={0.2}>
            <div>
              <p className="text-gold-500 font-medium tracking-wider uppercase text-sm mb-4">
                About Our Firm
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-800 mb-6">
                A Legacy of Legal Excellence & Leadership
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Founded on the principles of integrity, excellence, and client
                advocacy, Lex Dominion Partners has grown into one of the most
                respected law firms in the region. Our multidisciplinary team
                brings together diverse expertise to deliver comprehensive legal
                solutions.
              </p>

              {/* Highlights */}
              <ul className="space-y-4 mb-8">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={20} className="text-gold-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <Link href="/about" className="btn-primary group">
                Discover Our Story
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </GSAPReveal>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-200">
          {stats.map((stat, i) => (
            <GSAPReveal key={i} animation="fadeUp" delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-navy-800">
                  <GSAPCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 mt-2">{stat.label}</div>
              </div>
            </GSAPReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
