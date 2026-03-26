'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'

const fallbackTestimonials = [
  {
    name: 'Robert Owusu',
    title: 'CEO, Owusu Holdings',
    content:
      'Lex Dominion Partners provided exceptional counsel during our merger. Their expertise in corporate law and strategic thinking were invaluable. They anticipated challenges before they arose and ensured a smooth transaction.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=200&q=80',
  },
  {
    name: 'Amina Diallo',
    title: 'Real Estate Developer',
    content:
      'Working with Lex Dominion on our property portfolio was a game-changer. Their real estate team handled complex transactions with precision and always kept us informed. Truly a top-tier law firm.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  },
  {
    name: 'Kwame Mensah',
    title: 'Private Client',
    content:
      'During a very difficult family matter, the team at Lex Dominion showed both compassion and legal brilliance. They fought for my rights while maintaining dignity throughout the process.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Ngozi Adekunle',
    title: 'Founder, TechStart Inc.',
    content:
      'Their intellectual property team helped us secure patents and protect our innovations. The attorneys at Lex Dominion truly understand the tech landscape and provide proactive legal strategies.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=200&q=80',
  },
]

interface TestimonialData {
  id?: string
  name: string
  title?: string | null
  company?: string | null
  content: string
  rating: number
  image?: string | null
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(fallbackTestimonials)
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

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
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 relative">
                  <Image src={testimonials[current].image || '/placeholder.jpg'} alt={testimonials[current].name} fill className="object-cover" />
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
