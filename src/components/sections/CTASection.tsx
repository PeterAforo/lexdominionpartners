'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-sm bg-navy-800 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Modern law office"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-900/85" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Need Legal Guidance?
              <span className="block text-gold-400 mt-2">We&apos;re Here to Help.</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Don&apos;t face your legal challenges alone. Our experienced attorneys are
              ready to provide the expert counsel you need. Schedule a
              confidential consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/booking" className="btn-primary text-base group">
                Book Free Consultation
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+233264511778" className="btn-secondary text-base flex items-center gap-2">
                <Phone size={18} />
                0264511778
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
