'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { ArrowLeft, CheckCircle2, ArrowRight, Phone } from 'lucide-react'

const serviceData: Record<string, { title: string; description: string; details: string[]; process: string[] }> = {
  'corporate-law': {
    title: 'Corporate Law',
    description: 'Our Corporate Law team provides strategic counsel to businesses of all sizes, from startups to multinational corporations. We guide clients through formation, governance, transactions, and regulatory compliance with precision and foresight.',
    details: ['Mergers & Acquisitions', 'Corporate Governance', 'Joint Ventures & Partnerships', 'Securities & Capital Markets', 'Regulatory Compliance', 'Contract Negotiation & Drafting', 'Due Diligence', 'Corporate Restructuring'],
    process: ['Initial Consultation', 'Situation Analysis', 'Strategy Development', 'Implementation & Execution', 'Ongoing Support'],
  },
  'litigation': {
    title: 'Litigation',
    description: 'Our litigation team combines aggressive advocacy with strategic thinking to achieve optimal outcomes. We represent clients in complex civil and commercial disputes across all court levels.',
    details: ['Commercial Litigation', 'Civil Rights', 'Employment Disputes', 'Contract Disputes', 'Class Actions', 'Appellate Advocacy', 'Alternative Dispute Resolution', 'Regulatory Proceedings'],
    process: ['Case Evaluation', 'Pre-Litigation Strategy', 'Discovery & Investigation', 'Trial Preparation', 'Resolution & Settlement'],
  },
  'real-estate': {
    title: 'Real Estate',
    description: 'Our real estate practice covers the full spectrum of property law, from residential transactions to large-scale commercial development projects.',
    details: ['Commercial Transactions', 'Residential Closings', 'Land Use & Zoning', 'Construction Law', 'Lease Negotiations', 'Title Insurance', 'Property Development', 'Real Estate Litigation'],
    process: ['Property Review', 'Due Diligence', 'Contract Drafting', 'Closing Management', 'Post-Closing Support'],
  },
  'family-law': {
    title: 'Family Law',
    description: 'We provide compassionate yet strategic representation in all family law matters, protecting your rights and the well-being of your loved ones.',
    details: ['Divorce & Separation', 'Child Custody & Support', 'Adoption', 'Prenuptial Agreements', 'Domestic Violence Protection', 'Paternity', 'Spousal Support', 'Property Division'],
    process: ['Confidential Consultation', 'Case Assessment', 'Strategy Planning', 'Negotiation or Litigation', 'Resolution & Compliance'],
  },
  'criminal-defense': {
    title: 'Criminal Defense',
    description: 'Our criminal defense attorneys fight vigorously to protect your constitutional rights, freedom, and reputation in both state and federal proceedings.',
    details: ['White Collar Crimes', 'DUI/DWI Defense', 'Drug Offenses', 'Violent Crimes', 'Federal Crimes', 'Juvenile Defense', 'Appeals', 'Expungement'],
    process: ['Emergency Consultation', 'Investigation & Analysis', 'Defense Strategy', 'Court Representation', 'Post-Trial Support'],
  },
  'intellectual-property': {
    title: 'Intellectual Property',
    description: 'We help innovators and creators protect their most valuable assets through comprehensive IP strategies covering patents, trademarks, copyrights, and trade secrets.',
    details: ['Patent Prosecution', 'Trademark Registration', 'Copyright Protection', 'Trade Secret Litigation', 'IP Licensing', 'IP Portfolio Management', 'DMCA Compliance', 'IP Due Diligence'],
    process: ['IP Audit', 'Protection Strategy', 'Filing & Registration', 'Enforcement & Defense', 'Portfolio Management'],
  },
  'immigration': {
    title: 'Immigration',
    description: 'Our immigration team helps individuals and businesses navigate the complex U.S. immigration system with expertise and dedication.',
    details: ['Work Visas (H-1B, L-1, O-1)', 'Green Card Applications', 'Naturalization', 'Family-Based Immigration', 'Deportation Defense', 'Asylum & Refugee', 'Business Immigration', 'DACA & TPS'],
    process: ['Eligibility Assessment', 'Documentation Preparation', 'Application Filing', 'Interview Preparation', 'Status Monitoring'],
  },
  'tax-law': {
    title: 'Tax Law',
    description: 'Our tax attorneys provide strategic advice on federal, state, and local tax matters for individuals, businesses, and tax-exempt organizations.',
    details: ['Tax Planning & Compliance', 'IRS Audit Representation', 'Tax Controversy', 'Estate & Gift Tax', 'International Tax', 'State & Local Tax', 'Tax-Exempt Organizations', 'Transfer Pricing'],
    process: ['Tax Assessment', 'Strategy Development', 'Implementation', 'Compliance Management', 'Dispute Resolution'],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const service = serviceData[slug]

  if (!service) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-3xl font-heading font-bold text-navy-800">Service Not Found</h1>
        <Link href="/services" className="btn-primary mt-6 inline-block">View All Services</Link>
      </div>
    )
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        <div className="container-custom relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8">
            <ArrowLeft size={18} /> Back to Practice Areas
          </Link>
          <GSAPTextReveal text={service.title} tag="h1" className="text-4xl md:text-6xl font-bold text-white" />
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <MotionDiv>
                <p className="text-lg text-gray-600 leading-relaxed mb-10">{service.description}</p>
              </MotionDiv>

              <MotionDiv delay={0.1}>
                <h2 className="text-2xl font-heading font-bold text-navy-800 mb-6">What We Cover</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {service.details.map((detail, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                      <CheckCircle2 size={20} className="text-gold-500 shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </MotionDiv>

              <MotionDiv delay={0.2}>
                <h2 className="text-2xl font-heading font-bold text-navy-800 mb-6">Our Process</h2>
                <div className="space-y-4">
                  {service.process.map((step, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 border-l-4 border-gold-400 bg-gold-50/50">
                      <span className="w-8 h-8 rounded-full bg-gold-400 text-navy-800 flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                      <span className="text-navy-800 font-medium">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </MotionDiv>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-navy-800 text-white p-8 rounded-sm">
                  <h3 className="text-xl font-heading font-semibold mb-4">Need Legal Help?</h3>
                  <p className="text-white/70 text-sm mb-6">Schedule a confidential consultation with our {service.title} team.</p>
                  <Link href="/booking" className="btn-primary w-full text-center text-sm">Book Consultation</Link>
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <a href="tel:+1234567890" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors">
                      <Phone size={18} /> +1 (234) 567-890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
