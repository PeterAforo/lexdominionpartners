'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { ArrowLeft, Mail, Phone, Award, BookOpen, Globe } from 'lucide-react'

const fallbackData: Record<string, any> = {
  'alexander-mensah': { name: 'Alexander Mensah', title: 'Managing Partner', bio: 'Alexander Mensah has been at the helm of Lex Dominion Partners for over 15 years. With more than 30 years in corporate law, he has guided countless businesses through complex mergers, acquisitions, and governance matters.', email: 'a.mensah@lexdominion.com', phone: '+1 (234) 567-891', education: 'J.D., Harvard Law School | B.A. Political Science, Yale University', barAdmissions: 'New York State Bar | U.S. Supreme Court', languages: 'English | French', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80' },
  'victoria-adeyemi': { name: 'Victoria Adeyemi', title: 'Senior Partner', bio: 'Victoria Adeyemi is an award-winning litigator known for her tenacity and strategic brilliance in the courtroom.', email: 'v.adeyemi@lexdominion.com', education: 'J.D., Stanford Law School | B.A. Economics, UC Berkeley', barAdmissions: 'California State Bar | New York State Bar', languages: 'English | Yoruba', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80' },
  'marcus-okafor': { name: 'Marcus Okafor', title: 'Partner', bio: 'Marcus Okafor brings 20 years of real estate law experience.', email: 'm.okafor@lexdominion.com', education: 'J.D., Columbia Law School | B.S. Finance, NYU Stern', barAdmissions: 'New York State Bar | New Jersey State Bar', languages: 'English | Igbo', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80' },
  'catherine-nkosi': { name: 'Catherine Nkosi', title: 'Partner', bio: 'Catherine Nkosi is a compassionate family law attorney.', email: 'c.nkosi@lexdominion.com', education: 'J.D., Georgetown University Law Center | B.A. Psychology, Howard University', barAdmissions: 'District of Columbia Bar | Maryland State Bar', languages: 'English | Zulu', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80' },
  'jonathan-afolabi': { name: 'Jonathan Afolabi', title: 'Partner', bio: 'Jonathan Afolabi spent 10 years as a federal prosecutor before transitioning to criminal defense.', email: 'j.afolabi@lexdominion.com', education: 'J.D., University of Chicago Law School | B.A. Criminal Justice, Michigan State', barAdmissions: 'Illinois State Bar | Federal Criminal Bar', languages: 'English | Yoruba', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80' },
  'sophia-dlamini': { name: 'Sophia Dlamini', title: 'Partner', bio: 'Sophia Dlamini combines engineering and legal expertise for comprehensive IP protection.', email: 's.dlamini@lexdominion.com', education: 'J.D., MIT Sloan/Harvard Law | M.S. Electrical Engineering, MIT', barAdmissions: 'USPTO Patent Bar | Massachusetts State Bar', languages: 'English | Swahili', image: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=600&q=80' },
  'daniel-asante': { name: 'Daniel Asante', title: 'Senior Associate', bio: 'Daniel Asante is a multilingual immigration attorney.', email: 'd.asante@lexdominion.com', education: 'J.D., NYU School of Law | B.A. International Relations, Georgetown', barAdmissions: 'New York State Bar', languages: 'English | Twi | French', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
  'amara-osei': { name: 'Amara Osei', title: 'Senior Associate', bio: 'Amara Osei holds both CPA and J.D. credentials.', email: 'a.osei@lexdominion.com', education: 'J.D., University of Pennsylvania Law School | M.S. Accounting, Wharton School', barAdmissions: 'Pennsylvania State Bar | Tax Court', languages: 'English | Twi', image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80' },
}

interface TeamMemberDetail {
  id: string
  name: string
  slug: string
  title: string
  email?: string | null
  phone?: string | null
  bio?: string | null
  image?: string | null
  education?: string | null
  barAdmissions?: string | null
  languages?: string | null
}

function splitField(value?: string | null): string[] {
  if (!value) return []
  return value.split('|').map((s) => s.trim()).filter(Boolean)
}

export default function TeamMemberPage() {
  const params = useParams()
  const slug = params.slug as string
  const [member, setMember] = useState<TeamMemberDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/team/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => setMember(data))
      .catch(() => {
        const fb = fallbackData[slug]
        if (fb) {
          setMember({ id: slug, slug, ...fb } as TeamMemberDetail)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full" /></div>
  }

  if (notFound || !member) {
    return <div className="section-padding text-center"><h1 className="text-3xl font-heading font-bold text-navy-800">Attorney Not Found</h1><Link href="/team" className="btn-primary mt-6 inline-block">View All Attorneys</Link></div>
  }

  const education = splitField(member.education)
  const barAdmissions = splitField(member.barAdmissions)
  const languages = splitField(member.languages)

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        <div className="container-custom relative z-10">
          <Link href="/team" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"><ArrowLeft size={18} /> Back to Team</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="aspect-[3/4] bg-navy-700 rounded-sm overflow-hidden relative">
              <Image src={member.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'} alt={member.name} fill className="object-cover" />
            </div>
            <div className="lg:col-span-2">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium mb-2">{member.title}</motion.p>
              <GSAPTextReveal text={member.name} tag="h1" className="text-4xl md:text-5xl font-bold text-white mb-2" />
              <p className="text-white/60 text-lg mb-6">{member.title}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                {member.email && <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-gold-400 hover:text-gold-300"><Mail size={18} />{member.email}</a>}
                {member.phone && <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-gold-400 hover:text-gold-300"><Phone size={18} />{member.phone}</a>}
              </div>
              {member.bio && <p className="text-white/80 leading-relaxed">{member.bio}</p>}
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          {education.length > 0 && (
            <MotionDiv><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><BookOpen size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Education</h3></div><ul className="space-y-2">{education.map((e, i) => <li key={i} className="text-gray-600 text-sm">{e}</li>)}</ul></div></MotionDiv>
          )}
          {barAdmissions.length > 0 && (
            <MotionDiv delay={0.1}><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><Award size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Bar Admissions</h3></div><ul className="space-y-2">{barAdmissions.map((b, i) => <li key={i} className="text-gray-600 text-sm">{b}</li>)}</ul></div></MotionDiv>
          )}
          {languages.length > 0 && (
            <MotionDiv delay={0.2}><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><Globe size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Languages</h3></div><ul className="space-y-2">{languages.map((l, i) => <li key={i} className="text-gray-600 text-sm">{l}</li>)}</ul></div></MotionDiv>
          )}
        </div>
      </section>
    </>
  )
}
