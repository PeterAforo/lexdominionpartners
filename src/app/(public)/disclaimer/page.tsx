'use client'

import { motion } from 'framer-motion'
import { GSAPTextReveal } from '@/components/animations/GSAPWrapper'

export default function DisclaimerPage() {
  return (
    <>
      <section className="relative py-24 bg-navy-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(197, 165, 78, 0.3) 0%, transparent 50%)` }} />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400 font-medium tracking-wider uppercase text-sm mb-4">Legal</motion.p>
          <GSAPTextReveal text="Disclaimer" tag="h1" className="text-4xl md:text-6xl font-bold text-white mb-6" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-white/70 text-lg max-w-2xl mx-auto">
            Last updated: March 1, 2026
          </motion.p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-navy-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-navy-800">
            <h2>1. General Disclaimer</h2>
            <p>
              The information provided on the Lex Dominion Partners website is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>

            <h2>2. Not Legal Advice</h2>
            <p>
              The content on this website does not constitute legal advice and should not be relied upon as such. Legal matters are highly fact-specific and the application of law varies by jurisdiction. You should consult with a qualified attorney before making any legal decisions or taking any action based on information found on this website.
            </p>

            <h2>3. No Attorney-Client Relationship</h2>
            <p>
              Visiting this website, reading its content, or contacting us through the website does not create an attorney-client relationship between you and Lex Dominion Partners or any of its attorneys. An attorney-client relationship is only formed through a written engagement agreement signed by an authorized representative of the firm.
            </p>

            <h2>4. Results Disclaimer</h2>
            <p>
              Any case results, testimonials, or client reviews mentioned on this website are not a guarantee or prediction of the outcome of any future case. Each legal matter is unique, and past results do not guarantee similar outcomes. The outcome of any case depends on a variety of factors specific to that case.
            </p>

            <h2>5. Third-Party Content</h2>
            <p>
              Our website may contain links to third-party websites, articles, or resources. These links are provided for convenience and informational purposes only. Lex Dominion Partners does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>

            <h2>6. Professional Responsibility</h2>
            <p>
              The attorneys at Lex Dominion Partners are licensed to practice law in specific jurisdictions. Nothing on this website should be construed as an offer to represent clients in jurisdictions where our attorneys are not licensed, unless otherwise stated. Jurisdictional limitations may apply to the services we can provide.
            </p>

            <h2>7. AI Assistant Disclaimer</h2>
            <p>
              Our website features an AI-powered legal assistant designed to provide general information and help direct inquiries. The AI assistant does not provide legal advice, and its responses should not be relied upon as a substitute for professional legal counsel. For specific legal questions, please schedule a consultation with one of our qualified attorneys.
            </p>

            <h2>8. Communication Disclaimer</h2>
            <p>
              Communications sent through this website, including but not limited to emails, contact forms, and booking requests, are not guaranteed to be secure or confidential. Until an attorney-client relationship has been formally established, please refrain from sending confidential or sensitive information through our website.
            </p>

            <h2>9. Fee Disclaimer</h2>
            <p>
              Any references to fees, pricing, or &quot;free consultations&quot; on this website are subject to change without notice. Actual fees for legal services will be discussed and agreed upon during the initial consultation and formalized in a written engagement agreement.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              In no event shall Lex Dominion Partners, its attorneys, employees, or agents be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, arising from the use of or reliance on information provided on this website.
            </p>

            <h2>11. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to update or modify this Disclaimer at any time without prior notice. Your continued use of the website following any changes indicates your acceptance of the revised Disclaimer.
            </p>

            <h2>12. Contact Us</h2>
            <p>If you have questions about this Disclaimer, please contact us at:</p>
            <ul>
              <li><strong>Email:</strong> legal@lexdominion.com</li>
              <li><strong>Phone:</strong> +1 (234) 567-890</li>
              <li><strong>Address:</strong> 123 Legal Avenue, Suite 500, New York, NY 10001</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  )
}
