// Lex Chatbot Knowledge Base
// Auto-populated from scanned site content — Lex Dominion Partners

export interface KnowledgeEntry {
  id: string
  question: string
  answer: string
  tags: string[]
  category: 'general' | 'services' | 'team' | 'booking' | 'fees' | 'contact' | 'blog' | 'legal_info'
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // ===== GENERAL =====
  {
    id: 'gen_001',
    question: 'What is Lex Dominion Partners?',
    answer: 'Lex Dominion Partners is a premier law firm dedicated to delivering exceptional legal services with unwavering commitment to leadership, integrity, and client success. Our tagline is "Law & Leadership."',
    tags: ['about', 'firm', 'who', 'what'],
    category: 'general',
  },
  {
    id: 'gen_002',
    question: 'Where is your office located?',
    answer: 'Our office is located at DVLA Adenta, directly opposite the Goil Filling Station @ Ritz Junction.',
    tags: ['location', 'address', 'office', 'where', 'directions'],
    category: 'contact',
  },
  {
    id: 'gen_003',
    question: 'What are your office hours?',
    answer: 'Our office hours are:\n• **Monday – Friday:** 9:00 AM – 5:00 PM\n• **Saturday:** Closed\n• **Sunday:** Closed\n\nWe also offer after-hours consultations by appointment.',
    tags: ['hours', 'open', 'when', 'schedule', 'time', 'available'],
    category: 'contact',
  },
  {
    id: 'gen_004',
    question: 'How can I contact the firm?',
    answer: "Here's how to reach us:\n• **Phone:** 0264511778\n• **Email:** info@lexdominion.com\n• **Address:** DVLA Adenta, directly opposite the Goil Filling Station @ Ritz Junction\n\nYou can also fill out our contact form at [/contact](/contact).",
    tags: ['contact', 'phone', 'email', 'reach', 'call'],
    category: 'contact',
  },

  // ===== SERVICES =====
  {
    id: 'svc_001',
    question: 'What practice areas do you cover?',
    answer: 'We offer comprehensive legal services across 8 practice areas:\n\n• **Corporate Law** — Mergers, governance, compliance\n• **Litigation** — Civil and commercial disputes\n• **Real Estate** — Transactions and property law\n• **Family Law** — Divorce, custody, adoption\n• **Criminal Defense** — State and federal cases\n• **Intellectual Property** — Patents, trademarks, copyrights\n• **Immigration** — Visas, green cards, citizenship\n• **Tax Law** — Planning, compliance, disputes\n\nLearn more at [/services](/services).',
    tags: ['services', 'practice', 'areas', 'what', 'cover', 'specialize', 'offer'],
    category: 'services',
  },
  {
    id: 'svc_002',
    question: 'Tell me about your Corporate Law services',
    answer: 'Our Corporate Law team provides strategic counsel to businesses of all sizes — from startups to multinational corporations. We handle mergers & acquisitions, corporate governance, joint ventures, securities, regulatory compliance, contract negotiation, due diligence, and corporate restructuring.\n\n**Lead Attorney:** Alexander Mensah, Managing Partner',
    tags: ['corporate', 'business', 'merger', 'acquisition', 'governance', 'company'],
    category: 'services',
  },
  {
    id: 'svc_003',
    question: 'Tell me about your Litigation services',
    answer: 'Our litigation team combines aggressive advocacy with strategic thinking. We represent clients in commercial litigation, civil rights, employment disputes, contract disputes, class actions, appellate advocacy, alternative dispute resolution, and regulatory proceedings.\n\n**Lead Attorney:** Amara Adeyemi, Senior Partner',
    tags: ['litigation', 'court', 'lawsuit', 'dispute', 'trial', 'sue'],
    category: 'services',
  },
  {
    id: 'svc_004',
    question: 'Tell me about your Real Estate services',
    answer: 'Our real estate practice covers the full spectrum of property law: commercial transactions, residential closings, land use & zoning, construction law, lease negotiations, title insurance, property development, and real estate litigation.\n\n**Lead Attorney:** Kwame Okafor, Partner',
    tags: ['real estate', 'property', 'house', 'land', 'lease', 'zoning', 'building'],
    category: 'services',
  },
  {
    id: 'svc_005',
    question: 'Tell me about your Family Law services',
    answer: 'We provide compassionate yet strategic representation in all family law matters: divorce & separation, child custody & support, adoption, prenuptial agreements, domestic violence protection, paternity, spousal support, and property division.\n\n**Lead Attorney:** Nkechi Nkosi, Partner',
    tags: ['family', 'divorce', 'custody', 'child', 'adoption', 'prenup', 'marriage', 'separation'],
    category: 'services',
  },
  {
    id: 'svc_006',
    question: 'Tell me about your Criminal Defense services',
    answer: 'Our criminal defense attorneys fight vigorously to protect your constitutional rights. We handle white collar crimes, DUI/DWI defense, drug offenses, violent crimes, federal crimes, juvenile defense, appeals, and expungement.\n\n**Lead Attorney:** Emeka Afolabi, Partner',
    tags: ['criminal', 'defense', 'crime', 'arrest', 'charge', 'dui', 'felony'],
    category: 'services',
  },
  {
    id: 'svc_007',
    question: 'Tell me about your Intellectual Property services',
    answer: 'We help innovators and creators protect their most valuable assets: patent prosecution, trademark registration, copyright protection, trade secret litigation, IP licensing, portfolio management, DMCA compliance, and IP due diligence.\n\n**Lead Attorney:** Sophia Dlamini, Partner',
    tags: ['intellectual property', 'ip', 'patent', 'trademark', 'copyright', 'invention'],
    category: 'services',
  },
  {
    id: 'svc_008',
    question: 'Tell me about your Immigration services',
    answer: 'Our immigration team helps individuals and businesses navigate the complex U.S. immigration system: work visas (H-1B, L-1, O-1), green card applications, naturalization, family-based immigration, deportation defense, asylum & refugee, business immigration, and DACA & TPS.\n\n**Lead Attorney:** Kofi Asante, Partner',
    tags: ['immigration', 'visa', 'green card', 'citizenship', 'deportation', 'asylum', 'work permit'],
    category: 'services',
  },
  {
    id: 'svc_009',
    question: 'Tell me about your Tax Law services',
    answer: 'Our tax attorneys provide strategic advice on federal, state, and local tax matters: tax planning & compliance, IRS audit representation, tax controversy, estate & gift tax, international tax, state & local tax, tax-exempt organizations, and transfer pricing.\n\n**Lead Attorney:** Abena Osei, Partner',
    tags: ['tax', 'irs', 'audit', 'estate', 'compliance', 'filing'],
    category: 'services',
  },

  // ===== TEAM =====
  {
    id: 'team_001',
    question: 'Who are your attorneys?',
    answer: 'Our leadership team includes 8 experienced attorneys:\n\n• **Alexander Mensah** — Managing Partner (Corporate Law)\n• **Amara Adeyemi** — Senior Partner (Litigation)\n• **Kwame Okafor** — Partner (Real Estate)\n• **Nkechi Nkosi** — Partner (Family Law)\n• **Emeka Afolabi** — Partner (Criminal Defense)\n• **Sophia Dlamini** — Partner (Intellectual Property)\n• **Kofi Asante** — Partner (Immigration)\n• **Abena Osei** — Partner (Tax Law)\n\nVisit [/team](/team) to see full profiles.',
    tags: ['team', 'attorney', 'lawyer', 'who', 'staff', 'partner'],
    category: 'team',
  },
  {
    id: 'team_002',
    question: 'Who is Alexander Mensah?',
    answer: 'Alexander Mensah is the Managing Partner of Lex Dominion Partners and leads the Corporate Law practice. He brings extensive experience in mergers & acquisitions, corporate governance, and complex business transactions.',
    tags: ['alexander', 'mensah', 'managing partner', 'corporate'],
    category: 'team',
  },
  {
    id: 'team_003',
    question: 'Who is Amara Adeyemi?',
    answer: 'Amara Adeyemi is a Senior Partner at Lex Dominion Partners specializing in Litigation. She is known for aggressive advocacy and strategic thinking in civil and commercial disputes.',
    tags: ['amara', 'adeyemi', 'senior partner', 'litigation'],
    category: 'team',
  },

  // ===== BOOKING =====
  {
    id: 'book_001',
    question: 'How do I book a consultation?',
    answer: "Booking a consultation is easy! You can:\n\n1. **Online:** Visit our [booking page](/booking) to select a date and time\n2. **Phone:** Call us at 0264511778\n3. **Email:** Send your request to info@lexdominion.com\n\nOur initial consultations are **complimentary**. We'll review your situation and provide a transparent fee estimate.",
    tags: ['book', 'consultation', 'appointment', 'schedule', 'meeting', 'reserve'],
    category: 'booking',
  },
  {
    id: 'book_002',
    question: 'Is the first consultation free?',
    answer: 'Yes! We offer a **free initial consultation** for all new clients. During this meeting, we will discuss your legal matter, evaluate your options, and provide a transparent fee estimate for our services.',
    tags: ['free', 'consultation', 'first', 'initial', 'complimentary', 'cost'],
    category: 'booking',
  },
  {
    id: 'book_003',
    question: 'What happens during a consultation?',
    answer: "During your consultation, one of our attorneys will:\n\n1. Listen to the details of your legal matter\n2. Ask clarifying questions to understand your situation\n3. Provide an initial assessment of your case\n4. Discuss potential legal strategies\n5. Explain our fee structure and next steps\n\nThe consultation is confidential and there's no obligation to proceed.",
    tags: ['consultation', 'what', 'expect', 'happen', 'meeting', 'process'],
    category: 'booking',
  },
  {
    id: 'book_004',
    question: 'What are the available time slots for consultation?',
    answer: 'Consultation time slots are available:\n\n• **Morning:** 9:00 AM, 9:30 AM, 10:00 AM, 10:30 AM, 11:00 AM, 11:30 AM\n• **Afternoon:** 1:00 PM, 1:30 PM, 2:00 PM, 2:30 PM, 3:00 PM, 3:30 PM, 4:00 PM, 4:30 PM\n\nVisit [/booking](/booking) to check availability for your preferred date.',
    tags: ['time', 'slots', 'available', 'when', 'schedule'],
    category: 'booking',
  },

  // ===== FEES =====
  {
    id: 'fee_001',
    question: 'What are your fees?',
    answer: 'Our fee structure varies based on the type and complexity of your case. We offer:\n\n• A **free initial consultation** to discuss your needs\n• Transparent fee estimates before engagement\n• Flexible payment arrangements\n• Various fee structures including hourly, flat-fee, and contingency (case-dependent)\n\nWould you like to schedule a free consultation to discuss fees for your specific matter?',
    tags: ['fee', 'cost', 'price', 'charge', 'expensive', 'payment', 'money', 'afford', 'rate'],
    category: 'fees',
  },
  {
    id: 'fee_002',
    question: 'Do you offer payment plans?',
    answer: "Yes, we understand that legal services can be a significant investment. We offer flexible payment arrangements to make quality legal representation accessible. Details are discussed during your initial consultation based on your specific case and needs.",
    tags: ['payment', 'plan', 'installment', 'flexible', 'finance'],
    category: 'fees',
  },

  // ===== BLOG =====
  {
    id: 'blog_001',
    question: 'Do you have a blog or legal resources?',
    answer: 'Yes! We publish regular articles on legal topics, industry insights, and practical guidance on our [blog](/blog). Recent articles include:\n\n• "Understanding Corporate Mergers: A Legal Perspective"\n• "Protecting Your Intellectual Property in the Digital Age"\n• "Family Law Updates: What You Need to Know in 2026"\n• "Navigating Immigration Law Changes"\n• "Tax Planning Strategies for 2026"\n• "The Rise of Alternative Dispute Resolution"',
    tags: ['blog', 'article', 'resource', 'read', 'news', 'insight', 'legal update'],
    category: 'blog',
  },

  // ===== LEGAL INFO =====
  {
    id: 'legal_001',
    question: 'Do you have a privacy policy?',
    answer: 'Yes, you can read our full Privacy Policy at [/privacy](/privacy). We are committed to protecting the privacy of our clients and website visitors.',
    tags: ['privacy', 'policy', 'data', 'information', 'personal'],
    category: 'legal_info',
  },
  {
    id: 'legal_002',
    question: 'What are your terms of service?',
    answer: 'Our Terms of Service are available at [/terms](/terms). They cover important information about using our website and services.',
    tags: ['terms', 'service', 'conditions', 'agreement'],
    category: 'legal_info',
  },
  {
    id: 'legal_003',
    question: 'Is this legal advice?',
    answer: "No. The information I provide is for **general informational purposes only** and does not constitute legal advice. Every legal situation is unique. For specific legal advice tailored to your situation, I strongly recommend scheduling a consultation with one of our attorneys. Would you like to book one?",
    tags: ['legal advice', 'disclaimer', 'not advice', 'warning'],
    category: 'legal_info',
  },
]

// Search the knowledge base for relevant answers
export function searchKnowledge(query: string): KnowledgeEntry | null {
  const queryLower = query.toLowerCase()
  const words = queryLower.split(/\s+/)

  let bestMatch: KnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0

    // Check tag matches (highest weight)
    for (const tag of entry.tags) {
      if (queryLower.includes(tag)) {
        score += 3
      }
      // Partial word match in tags
      for (const word of words) {
        if (word.length > 2 && tag.includes(word)) {
          score += 1
        }
      }
    }

    // Check question similarity
    const questionLower = entry.question.toLowerCase()
    for (const word of words) {
      if (word.length > 2 && questionLower.includes(word)) {
        score += 1
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  // Only return if we have a meaningful match
  return bestScore >= 2 ? bestMatch : null
}
