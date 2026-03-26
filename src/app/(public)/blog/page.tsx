'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { StaggerContainer, StaggerItem } from '@/components/animations/MotionWrapper'
import { Calendar, ArrowRight, Tag } from 'lucide-react'

const posts = [
  { title: 'Understanding Corporate Mergers: A Legal Perspective', excerpt: 'Navigate the complex landscape of corporate mergers with insights from our experienced team.', date: '2026-03-20', category: 'Corporate Law', slug: 'understanding-corporate-mergers', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { title: 'Protecting Your Intellectual Property in the Digital Age', excerpt: 'Learn how to safeguard your innovations and creative works in an increasingly digital world.', date: '2026-03-15', category: 'Intellectual Property', slug: 'protecting-ip-digital-age', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { title: 'Family Law Updates: What You Need to Know in 2026', excerpt: 'Stay informed about the latest changes in family law and how they might affect your rights.', date: '2026-03-10', category: 'Family Law', slug: 'family-law-updates-2026', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&q=80' },
  { title: 'Navigating Immigration Law Changes', excerpt: 'Recent policy shifts have significant implications for businesses and individuals seeking immigration services.', date: '2026-03-05', category: 'Immigration', slug: 'navigating-immigration-changes', image: 'https://images.unsplash.com/photo-1569025743873-ea3a9ede5be5?w=600&q=80' },
  { title: 'Tax Planning Strategies for 2026', excerpt: 'Expert tax attorneys share strategies to minimize liability and maximize your financial position.', date: '2026-02-28', category: 'Tax Law', slug: 'tax-planning-2026', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80' },
  { title: 'The Rise of Alternative Dispute Resolution', excerpt: 'Why more businesses are turning to mediation and arbitration over traditional litigation.', date: '2026-02-20', category: 'Litigation', slug: 'alternative-dispute-resolution', image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&q=80' },
]

export default function BlogPage() {
  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} /></div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Insights & News</motion.p>
          <GSAPTextReveal text="Our Blog" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Stay informed with the latest legal insights, news, and analysis from our team of expert attorneys.
          </motion.p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-sm overflow-hidden card-hover border border-gray-100 h-full">
                  <div className="h-48 bg-navy-800 relative overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-navy-900/60" />
                    <div className="absolute bottom-4 left-4"><span className="px-3 py-1 bg-gold-400 text-navy-800 text-xs font-semibold rounded-sm">{post.category}</span></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3"><Calendar size={14} /><span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></div>
                    <h3 className="text-lg font-heading font-semibold text-navy-800 mb-3 group-hover:text-gold-500 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <span className="inline-flex items-center text-sm font-medium text-gold-500 group-hover:text-gold-600">Read More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /></span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  )
}
