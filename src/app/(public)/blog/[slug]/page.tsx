'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'

const fallbackPosts: Record<string, any> = {
  'understanding-corporate-mergers': { title: 'Understanding Corporate Mergers: A Legal Perspective', createdAt: '2026-03-20', author: { name: 'Alexander Mensah' }, category: 'Corporate Law', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80', content: `<p>Corporate mergers and acquisitions represent some of the most complex transactions in the business world.</p><h2>Key Considerations in M&A Transactions</h2><p>Every merger or acquisition involves several critical legal considerations. Due diligence is paramount.</p><h2>The Due Diligence Process</h2><p>Due diligence involves a comprehensive review of contracts, intellectual property, employee agreements, regulatory compliance, and financial statements.</p><p>At Lex Dominion Partners, our corporate law team has guided hundreds of successful M&A transactions. Contact us today.</p>` },
  'protecting-ip-digital-age': { title: 'Protecting Your Intellectual Property in the Digital Age', createdAt: '2026-03-15', author: { name: 'Sophia Dlamini' }, category: 'Intellectual Property', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', content: `<p>In today's digital economy, intellectual property is often a company's most valuable asset.</p><h2>Types of IP Protection</h2><p>There are four main types: patents, trademarks, copyrights, and trade secrets.</p><p>Contact our IP team at Lex Dominion Partners to learn how we can protect your innovations.</p>` },
  'family-law-updates-2026': { title: 'Family Law Updates: What You Need to Know in 2026', createdAt: '2026-03-10', author: { name: 'Catherine Nkosi' }, category: 'Family Law', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=80', content: `<p>Family law continues to evolve, and 2026 has brought significant changes.</p><h2>Key Changes</h2><p>New guidelines for custody evaluations, updated child support calculations, and changes to property division rules.</p><p>Our family law team at Lex Dominion Partners is here to guide you.</p>` },
}

interface BlogPostDetail {
  id: string
  title: string
  slug: string
  content: string
  image?: string | null
  category?: string | null
  createdAt: string
  author?: { name: string; email?: string }
}

function estimateReadTime(content: string): string {
  const text = content.replace(/<[^>]+>/g, '')
  const words = text.split(/\s+/).length
  return `${Math.max(1, Math.ceil(words / 200))} min`
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPostDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => setPost(data))
      .catch(() => {
        const fb = fallbackPosts[slug]
        if (fb) {
          setPost({ id: slug, slug, ...fb } as BlogPostDetail)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>
  }

  if (notFound || !post) {
    return <div className="section-padding text-center"><h1 className="text-3xl font-heading font-bold text-navy-800">Article Not Found</h1><Link href="/blog" className="btn-primary mt-6 inline-block">View All Articles</Link></div>
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        {post.image && (
          <div className="absolute inset-0">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-navy-900/85" />
          </div>
        )}
        <div className="container-custom relative z-10 max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"><ArrowLeft size={18} /> Back to Blog</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {post.category && <span className="px-3 py-1 bg-gold-400 text-navy-800 text-xs font-semibold rounded-sm">{post.category}</span>}
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              {post.author?.name && <span className="flex items-center gap-2"><User size={16} /> {post.author.name}</span>}
              <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {estimateReadTime(post.content)} read</span>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-a:text-gold-500" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>
    </>
  )
}
