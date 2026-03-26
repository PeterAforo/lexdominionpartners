'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'

export default function PrivacyPolicyPage() {
  const [customContent, setCustomContent] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.page_privacy) setCustomContent(data.page_privacy)
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Legal</motion.p>
          <GSAPTextReveal text="Privacy Policy" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Last updated: March 1, 2026
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          {customContent ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-navy-800" dangerouslySetInnerHTML={{ __html: customContent }} />
          ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-navy-800">
            <h2>1. Introduction</h2>
            <p>
              Lex Dominion Partners (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy of our clients and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our legal services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address, and other contact details you provide through our contact forms, booking system, or when engaging our services.</li>
              <li><strong>Case-Related Information:</strong> Information relevant to your legal matter that you share with us during consultations or through our secure client portal.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to enhance your browsing experience and analyze website traffic.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To provide and improve our legal services</li>
              <li>To respond to inquiries and schedule consultations</li>
              <li>To communicate with you about your case or our services</li>
              <li>To comply with legal obligations and professional ethical requirements</li>
              <li>To improve our website functionality and user experience</li>
              <li>To send newsletters or updates (with your consent)</li>
            </ul>

            <h2>4. Attorney-Client Privilege</h2>
            <p>
              Information shared with our attorneys in the course of seeking or receiving legal advice is protected by attorney-client privilege and will be treated with the utmost confidentiality in accordance with applicable rules of professional conduct.
            </p>

            <h2>5. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:</p>
            <ul>
              <li>With your explicit consent</li>
              <li>With service providers who assist us in operating our website or conducting our business (subject to confidentiality agreements)</li>
              <li>When required by law, court order, or governmental regulation</li>
              <li>To protect our rights, privacy, safety, or property</li>
            </ul>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict the processing of your personal data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li><strong>Email:</strong> privacy@lexdominion.com</li>
              <li><strong>Phone:</strong> 0264511778</li>
              <li><strong>Address:</strong> DVLA Adenta, directly opposite the Goil Filling Station @ Ritz Junction</li>
            </ul>
          </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
