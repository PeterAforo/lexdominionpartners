'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Robert Anderson',
    title: 'CEO, Anderson Holdings',
    content:
      'Lex Dominion Partners provided exceptional counsel during our merger. Their expertise in corporate law and strategic thinking were invaluable. They anticipated challenges before they arose and ensured a smooth transaction.',
    rating: 5,
  },
  {
    name: 'Sarah Mitchell',
    title: 'Real Estate Developer',
    content:
      'Working with Lex Dominion on our property portfolio was a game-changer. Their real estate team handled complex transactions with precision and always kept us informed. Truly a top-tier law firm.',
    rating: 5,
  },
  {
    name: 'James Worthington',
    title: 'Private Client',
    content:
      'During a very difficult family matter, the team at Lex Dominion showed both compassion and legal brilliance. They fought for my rights while maintaining dignity throughout the process.',
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    title: 'Founder, TechStart Inc.',
    content:
      'Their intellectual property team helped us secure patents and protect our innovations. The attorneys at Lex Dominion truly understand the tech landscape and provide proactive legal strategies.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="section-padding bg-navy-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 opacity-5">
        <Quote size={200} className="text-gold-400" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4"
          >
            Client Testimonials
          </motion.p>
          <GSAPTextReveal
            text="What Our Clients Say"
            tag="h2"
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          />
        </div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-accent italic">
                &ldquo;{testimonials[current].content}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="w-16 h-16 rounded-full bg-gold-400/20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gold-400 font-heading font-bold text-xl">
                    {testimonials[current].name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-white font-semibold text-lg">
                  {testimonials[current].name}
                </h4>
                <p className="text-gold-400/80 text-sm">
                  {testimonials[current].title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold-400 hover:border-gold-400 hover:text-navy-800 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAutoplay(false)
                    setCurrent(i)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === current
                      ? 'bg-gold-400 w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold-400 hover:border-gold-400 hover:text-navy-800 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
