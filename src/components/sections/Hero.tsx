'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Scale, Shield } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        overlayRef.current,
        { scaleX: 1 },
        { scaleX: 0, duration: 1.2, transformOrigin: 'right' }
      )
        .fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.6'
        )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy-800"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
          alt="Professional law office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-900/80" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 50%, rgba(197, 165, 78, 0.15) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Animated overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-navy-900 z-10"
      />

      <div className="container-custom relative z-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gold-400/10 border border-gold-400/20 rounded-full">
              <Shield size={16} className="text-gold-400" />
              <span className="text-gold-400 text-sm font-medium tracking-wider uppercase">
                Trusted Legal Excellence
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 opacity-0"
          >
            Where Law Meets
            <span className="block gold-text mt-2">Leadership</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed opacity-0"
          >
            At Lex Dominion Partners, we combine legal mastery with strategic
            leadership to deliver exceptional outcomes. Our team of seasoned
            attorneys is committed to protecting your interests and securing
            your future.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-0">
            <Link href="/booking" className="btn-primary text-base group">
              Schedule Consultation
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link href="/services" className="btn-secondary text-base">
              Our Practice Areas
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-10 border-t border-white/10"
          >
            {[
              { value: '25+', label: 'Years Experience' },
              { value: '500+', label: 'Cases Won' },
              { value: '98%', label: 'Success Rate' },
              { value: '50+', label: 'Expert Attorneys' },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold-400">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Scale size={400} className="text-gold-400" strokeWidth={0.5} />
        </motion.div>
      </div>
    </section>
  )
}
