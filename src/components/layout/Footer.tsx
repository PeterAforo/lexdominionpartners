'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react'

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Practice Areas', href: '/services' },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog & Insights', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book Consultation', href: '/booking' },
]

const practiceAreas = [
  { label: 'Corporate Law', href: '/services/corporate-law' },
  { label: 'Litigation', href: '/services/litigation' },
  { label: 'Real Estate', href: '/services/real-estate' },
  { label: 'Family Law', href: '/services/family-law' },
  { label: 'Criminal Defense', href: '/services/criminal-defense' },
  { label: 'Intellectual Property', href: '/services/intellectual-property' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white/80">
      {/* CTA Banner */}
      <div className="bg-gold-400">
        <div className="container-custom py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-navy-800">
              Ready to Get Started?
            </h3>
            <p className="text-navy-700 mt-1">
              Schedule a consultation with our experienced attorneys today.
            </p>
          </div>
          <Link
            href="/booking"
            className="btn-dark flex items-center gap-2 whitespace-nowrap"
          >
            Book Consultation
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <Image
              src="/images/h-logo.png"
              alt="Lex Dominion Partners"
              width={220}
              height={55}
              className="h-12 w-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-sm leading-relaxed mb-6">
              Lex Dominion Partners is a premier law firm dedicated to delivering
              exceptional legal services with unwavering commitment to leadership,
              integrity, and client success.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold-400 hover:border-gold-400 hover:text-navy-800 transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-xs uppercase font-bold">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-gold-400 group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white font-heading text-lg font-semibold mb-6">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {practiceAreas.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="text-gold-400 group-hover:translate-x-1 transition-transform"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm">
                  DVLA Adenta, directly opposite
                  <br />
                  the Goil Filling Station @ Ritz Junction
                </span>
              </li>
              <li>
                <a
                  href="tel:+233264511778"
                  className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
                >
                  <Phone size={18} className="text-gold-400 shrink-0" />
                  0264511778
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lexdominion.com"
                  className="flex items-center gap-3 text-sm hover:text-gold-400 transition-colors"
                >
                  <Mail size={18} className="text-gold-400 shrink-0" />
                  info@lexdominion.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-gold-400 mt-0.5 shrink-0" />
                <span className="text-sm">
                  Mon - Fri: 9:00 AM - 5:00 PM
                  <br />
                  Weekends: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Lex Dominion Partners. All rights reserved. Developed by <a href="http://www.mcaforo.com" target="_blank" rel="noopener noreferrer" className="text-gold-400 hover:text-gold-300 transition-colors">McAforo</a></p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/disclaimer" className="hover:text-gold-400 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
