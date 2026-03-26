'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'
import { MotionDiv } from '@/components/animations/MotionWrapper'
import { ArrowLeft, Mail, Phone, Linkedin, Award, BookOpen, Globe } from 'lucide-react'

const teamData: Record<string, any> = {
  'alexander-whitmore': { name: 'Alexander Whitmore', title: 'Managing Partner', specialty: 'Corporate Law', email: 'a.whitmore@lexdominion.com', phone: '+1 (234) 567-891', bio: 'Alexander Whitmore has been at the helm of Lex Dominion Partners for over 15 years. With more than 30 years in corporate law, he has guided countless businesses through complex mergers, acquisitions, and governance matters.', education: ['J.D., Harvard Law School', 'B.A. Political Science, Yale University'], barAdmissions: ['New York State Bar', 'U.S. Supreme Court'], languages: ['English', 'French'] },
  'victoria-chen': { name: 'Victoria Chen', title: 'Senior Partner', specialty: 'Litigation', email: 'v.chen@lexdominion.com', phone: '+1 (234) 567-892', bio: 'Victoria Chen is an award-winning litigator known for her tenacity and strategic brilliance in the courtroom. She has successfully litigated cases valued at over $500 million.', education: ['J.D., Stanford Law School', 'B.A. Economics, UC Berkeley'], barAdmissions: ['California State Bar', 'New York State Bar'], languages: ['English', 'Mandarin'] },
  'marcus-rivera': { name: 'Marcus Rivera', title: 'Partner', specialty: 'Real Estate', email: 'm.rivera@lexdominion.com', phone: '+1 (234) 567-893', bio: 'Marcus Rivera brings 20 years of real estate law experience, having facilitated over $2 billion in property transactions throughout his career.', education: ['J.D., Columbia Law School', 'B.S. Finance, NYU Stern'], barAdmissions: ['New York State Bar', 'New Jersey State Bar'], languages: ['English', 'Spanish'] },
  'catherine-okafor': { name: 'Catherine Okafor', title: 'Partner', specialty: 'Family Law', email: 'c.okafor@lexdominion.com', phone: '+1 (234) 567-894', bio: 'Catherine Okafor is a compassionate family law attorney who combines empathy with fierce advocacy for her clients.', education: ['J.D., Georgetown University Law Center', 'B.A. Psychology, Howard University'], barAdmissions: ['District of Columbia Bar', 'Maryland State Bar'], languages: ['English', 'Igbo'] },
  'jonathan-drake': { name: 'Jonathan Drake', title: 'Partner', specialty: 'Criminal Defense', email: 'j.drake@lexdominion.com', phone: '+1 (234) 567-895', bio: 'Jonathan Drake spent 10 years as a federal prosecutor before transitioning to criminal defense, giving him unique insight into both sides of the courtroom.', education: ['J.D., University of Chicago Law School', 'B.A. Criminal Justice, Michigan State'], barAdmissions: ['Illinois State Bar', 'Federal Criminal Bar'], languages: ['English'] },
  'sophia-nakamura': { name: 'Sophia Nakamura', title: 'Partner', specialty: 'Intellectual Property', email: 's.nakamura@lexdominion.com', phone: '+1 (234) 567-896', bio: 'Sophia Nakamura combines a background in electrical engineering with legal expertise to provide comprehensive IP protection.', education: ['J.D., MIT Sloan/Harvard Law', 'M.S. Electrical Engineering, MIT'], barAdmissions: ['USPTO Patent Bar', 'Massachusetts State Bar'], languages: ['English', 'Japanese'] },
  'daniel-hoffman': { name: 'Daniel Hoffman', title: 'Senior Associate', specialty: 'Immigration', email: 'd.hoffman@lexdominion.com', phone: '+1 (234) 567-897', bio: 'Daniel Hoffman is a multilingual immigration attorney who has helped hundreds of families and businesses navigate the U.S. immigration system.', education: ['J.D., NYU School of Law', 'B.A. International Relations, Georgetown'], barAdmissions: ['New York State Bar'], languages: ['English', 'German', 'Spanish'] },
  'amara-osei': { name: 'Amara Osei', title: 'Senior Associate', specialty: 'Tax Law', email: 'a.osei@lexdominion.com', phone: '+1 (234) 567-898', bio: 'Amara Osei holds both CPA and J.D. credentials, making her uniquely qualified to handle complex tax matters.', education: ['J.D., University of Pennsylvania Law School', 'M.S. Accounting, Wharton School'], barAdmissions: ['Pennsylvania State Bar', 'Tax Court'], languages: ['English', 'Twi'] },
}

export default function TeamMemberPage() {
  const params = useParams()
  const slug = params.slug as string
  const member = teamData[slug]

  if (!member) {
    return <div className="section-padding text-center"><h1 className="text-3xl font-heading font-bold text-navy-800">Attorney Not Found</h1><Link href="/team" className="btn-primary mt-6 inline-block">View All Attorneys</Link></div>
  }

  return (
    <>
      <section className="relative py-24 bg-navy-800">
        <div className="container-custom relative z-10">
          <Link href="/team" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors mb-8"><ArrowLeft size={18} /> Back to Team</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="aspect-[3/4] bg-navy-700 rounded-sm overflow-hidden flex items-center justify-center">
              <span className="text-8xl font-heading font-bold text-gold-400/20">{member.name.charAt(0)}</span>
            </div>
            <div className="lg:col-span-2">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium mb-2">{member.specialty}</motion.p>
              <GSAPTextReveal text={member.name} tag="h1" className="text-4xl md:text-5xl font-bold text-white mb-2" />
              <p className="text-white/60 text-lg mb-6">{member.title}</p>
              <div className="flex gap-4 mb-8">
                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-gold-400 hover:text-gold-300"><Mail size={18} />{member.email}</a>
              </div>
              <p className="text-white/80 leading-relaxed">{member.bio}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8">
          <MotionDiv><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><BookOpen size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Education</h3></div><ul className="space-y-2">{member.education.map((e: string, i: number) => <li key={i} className="text-gray-600 text-sm">{e}</li>)}</ul></div></MotionDiv>
          <MotionDiv delay={0.1}><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><Award size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Bar Admissions</h3></div><ul className="space-y-2">{member.barAdmissions.map((b: string, i: number) => <li key={i} className="text-gray-600 text-sm">{b}</li>)}</ul></div></MotionDiv>
          <MotionDiv delay={0.2}><div className="p-6 bg-gray-50 rounded-sm"><div className="flex items-center gap-3 mb-4"><Globe size={24} className="text-gold-500" /><h3 className="font-heading font-semibold text-navy-800 text-lg">Languages</h3></div><ul className="space-y-2">{member.languages.map((l: string, i: number) => <li key={i} className="text-gray-600 text-sm">{l}</li>)}</ul></div></MotionDiv>
        </div>
      </section>
    </>
  )
}
