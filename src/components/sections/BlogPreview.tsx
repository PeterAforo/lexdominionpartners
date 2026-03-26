'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper'
import { ArrowRight, Calendar } from 'lucide-react'

const blogPosts = [
  {
    title: 'Understanding Corporate Mergers: A Legal Perspective',
    excerpt: 'Navigate the complex landscape of corporate mergers with insights from our experienced team of corporate attorneys.',
    date: '2026-03-20',
    category: 'Corporate Law',
    slug: 'understanding-corporate-mergers',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    title: 'Protecting Your Intellectual Property in the Digital Age',
    excerpt: 'Learn how to safeguard your innovations, trademarks, and creative works in an increasingly digital world.',
    date: '2026-03-15',
    category: 'Intellectual Property',
    slug: 'protecting-ip-digital-age',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    title: 'Family Law Updates: What You Need to Know in 2026',
    excerpt: 'Stay informed about the latest changes in family law and how they might affect your rights and responsibilities.',
    date: '2026-03-10',
    category: 'Family Law',
    slug: 'family-law-updates-2026',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80',
  },
]

export default function BlogPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold-500 font-medium tracking-wider uppercase text-sm mb-4"
          >
            Latest Insights
          </motion.p>
          <GSAPTextReveal
            text="News & Articles"
            tag="h2"
            className="text-3xl md:text-5xl font-bold text-navy-800 mb-6"
          />
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-sm overflow-hidden card-hover h-full">
                <div className="h-48 bg-navy-800 relative overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-navy-900/60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-gold-400 text-navy-800 text-xs font-semibold rounded-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-navy-800 mb-3 group-hover:text-gold-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-gold-500 group-hover:text-gold-600">
                    Read More
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="text-center mt-12">
          <Link href="/blog" className="btn-secondary">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
