'use client'

import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'

export default function TermsOfServicePage() {
  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Legal</motion.p>
          <GSAPTextReveal text="Terms of Service" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Last updated: March 1, 2026
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-navy-800">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Lex Dominion Partners website (&quot;Site&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Site.
            </p>

            <h2>2. Description of Services</h2>
            <p>
              Lex Dominion Partners provides legal services across multiple practice areas. Our website provides information about our firm, our attorneys, and our services. The Site also allows users to submit inquiries, schedule consultations, and access general legal resources.
            </p>

            <h2>3. No Attorney-Client Relationship</h2>
            <p>
              Use of this website or submission of a contact form does not create an attorney-client relationship between you and Lex Dominion Partners. An attorney-client relationship is only established through a formal engagement agreement signed by both parties.
            </p>

            <h2>4. Confidentiality Notice</h2>
            <p>
              While we treat all communications with care, information submitted through this website prior to the establishment of an attorney-client relationship may not be protected by attorney-client privilege. Please do not send sensitive or confidential information through our website contact forms.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on this Site, including but not limited to text, graphics, logos, images, and software, is the property of Lex Dominion Partners and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our prior written consent.
            </p>

            <h2>6. User Conduct</h2>
            <p>When using our Site, you agree not to:</p>
            <ul>
              <li>Use the Site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the Site</li>
              <li>Interfere with or disrupt the operation of the Site</li>
              <li>Upload or transmit viruses, malware, or other harmful code</li>
              <li>Collect or harvest personal information of other users</li>
              <li>Impersonate any person or entity</li>
            </ul>

            <h2>7. Booking and Consultations</h2>
            <p>
              Our online booking system allows you to request consultation appointments. Submission of a booking request does not guarantee an appointment. We reserve the right to decline any consultation request at our sole discretion. Confirmed appointments may be subject to cancellation fees if not cancelled within a reasonable timeframe.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Lex Dominion Partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the Site. Our total liability for any claims arising from your use of the Site shall not exceed the amount you paid to us, if any, for accessing the Site.
            </p>

            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Lex Dominion Partners, its attorneys, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Site or violation of these Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in New York County, New York.
            </p>

            <h2>11. Modifications</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to this page. Your continued use of the Site after any changes constitutes acceptance of the revised terms.
            </p>

            <h2>12. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>

            <h2>13. Contact Us</h2>
            <p>If you have questions about these Terms of Service, please contact us at:</p>
            <ul>
              <li><strong>Email:</strong> legal@lexdominion.com</li>
              <li><strong>Phone:</strong> 0264511778</li>
              <li><strong>Address:</strong> DVLA Adenta, directly opposite the Goil Filling Station @ Ritz Junction</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  )
}
