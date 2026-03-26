'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react'

const blogData: Record<string, any> = {
  'understanding-corporate-mergers': { title: 'Understanding Corporate Mergers: A Legal Perspective', date: '2026-03-20', author: 'Alexander Whitmore', category: 'Corporate Law', readTime: '8 min', content: `<p>Corporate mergers and acquisitions represent some of the most complex transactions in the business world. Whether you're a small business owner considering a merger or a corporation planning a major acquisition, understanding the legal landscape is crucial.</p><h2>Key Considerations in M&A Transactions</h2><p>Every merger or acquisition involves several critical legal considerations that must be carefully addressed. Due diligence is paramount — our team conducts thorough investigations into the target company's financial health, legal obligations, and potential liabilities.</p><h2>The Due Diligence Process</h2><p>Due diligence involves a comprehensive review of the target company's contracts, intellectual property, employee agreements, regulatory compliance, and financial statements. This process typically takes 30-90 days depending on the complexity of the transaction.</p><h2>Regulatory Compliance</h2><p>Depending on the size and nature of the transaction, various regulatory approvals may be required. Our team works closely with regulatory agencies to ensure all requirements are met.</p><p>At Lex Dominion Partners, our corporate law team has guided hundreds of successful M&A transactions. Contact us today for a consultation.</p>` },
  'protecting-ip-digital-age': { title: 'Protecting Your Intellectual Property in the Digital Age', date: '2026-03-15', author: 'Sophia Nakamura', category: 'Intellectual Property', readTime: '6 min', content: `<p>In today's digital economy, intellectual property is often a company's most valuable asset. From software algorithms to brand identities, protecting your IP is essential for long-term success.</p><h2>Types of IP Protection</h2><p>There are four main types of intellectual property protection: patents, trademarks, copyrights, and trade secrets. Each serves a different purpose and offers different levels of protection.</p><h2>Digital Challenges</h2><p>The digital age has introduced new challenges for IP protection, including software piracy, domain squatting, and digital counterfeiting. Our team stays at the forefront of digital IP law to protect our clients' interests.</p><p>Contact our IP team at Lex Dominion Partners to learn how we can protect your innovations.</p>` },
  'family-law-updates-2026': { title: 'Family Law Updates: What You Need to Know in 2026', date: '2026-03-10', author: 'Catherine Okafor', category: 'Family Law', readTime: '5 min', content: `<p>Family law continues to evolve, and 2026 has brought significant changes that affect divorce proceedings, custody arrangements, and support obligations.</p><h2>Key Changes</h2><p>New guidelines for custody evaluations, updated child support calculations, and changes to property division rules are among the most impactful updates this year.</p><p>Our family law team at Lex Dominion Partners is here to guide you through these changes.</p>` },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogData[slug]

  if (!post) {
    return <div className="section-padding text-center"><h1 className="text-3xl font-heading font-bold text-navy-800">Article Not Found</h1><Link href="/blog" className="btn-primary mt-6 inline-block">View All Articles</Link></div>
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        <div className="container-custom relative z-10 max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"><ArrowLeft size={18} /> Back to Blog</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="px-3 py-1 bg-gold-400 text-navy-800 text-xs font-semibold rounded-sm">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-4 mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {post.readTime} read</span>
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
