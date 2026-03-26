'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Practice Areas',
    href: '/services',
    children: [
      { label: 'Corporate Law', href: '/services/corporate-law' },
      { label: 'Litigation', href: '/services/litigation' },
      { label: 'Real Estate', href: '/services/real-estate' },
      { label: 'Family Law', href: '/services/family-law' },
      { label: 'Criminal Defense', href: '/services/criminal-defense' },
      { label: 'Intellectual Property', href: '/services/intellectual-property' },
      { label: 'Immigration', href: '/services/immigration' },
      { label: 'Tax Law', href: '/services/tax-law' },
    ],
  },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-navy-800 text-white/80 text-sm">
        <div className="container-custom flex justify-between items-center py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+233264511778" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone size={14} />
              <span>0264511778</span>
            </a>
            <a href="mailto:info@lexdominion.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail size={14} />
              <span>info@lexdominion.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon - Fri: 9:00 AM - 5:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-white'
        )}
      >
        <div className="container-custom flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <Image
              src="/images/h-logo.png"
              alt="Lex Dominion Partners"
              width={280}
              height={70}
              className="h-12 md:h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-navy-700 hover:text-gold-500 transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown size={14} className="mt-0.5" />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-sm border border-gray-100 py-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-gold-50 hover:text-gold-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link href="/booking" className="hidden lg:inline-flex btn-primary text-sm">
              Book Consultation
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-navy-700"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="container-custom py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <button
                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.label ? null : link.label)}
                        className="flex items-center justify-between w-full py-3 px-4 text-navy-700 font-medium hover:text-gold-500 transition-colors"
                      >
                        {link.label}
                        <ChevronDown size={16} className={`transition-transform ${mobileDropdownOpen === link.label ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="block py-3 px-4 text-navy-700 font-medium hover:text-gold-500 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.children && mobileDropdownOpen === link.label && (
                      <div className="pl-8 space-y-1">
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className="block py-3 text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
                        >
                          View All {link.label}
                        </Link>
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="block py-3 text-sm text-gray-600 hover:text-gold-500 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Link
                    href="/booking"
                    onClick={() => setIsMobileOpen(false)}
                    className="btn-primary w-full text-center text-sm"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
