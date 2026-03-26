// Lex Chatbot Configuration
// Central config for the AI-powered legal assistant chatbot

export const CHATBOT_CONFIG = {
  // Identity
  name: 'Lex',
  tagline: 'AI Legal Assistant',
  greeting: "Hi there! 👋 I'm Lex, your AI legal assistant at Lex Dominion Partners. How can I help you today?",
  fallbackMessage: "I'm not sure about that, but I can connect you with one of our attorneys. Would you like to leave a message or book a consultation?",
  errorMessage: "I'm experiencing technical difficulties right now. Please contact us directly at +1 (234) 567-890 or email info@lexdominion.com.",

  // Personality
  personality: {
    tone: 'professional, warm, and authoritative yet approachable',
    style: 'formal but accessible — matching a premium law firm brand',
    rules: [
      'Never provide specific legal advice — always recommend consulting with an attorney',
      'Be concise and helpful',
      'Always maintain a professional and empathetic tone',
      'When unsure, offer to connect the user with a human',
      'Proactively suggest booking a consultation when relevant',
    ],
  },

  // Enabled capabilities (based on project discovery)
  capabilities: {
    general_faq: true,
    lead_capture: true,
    booking_and_appointments: true,
    content_recommendations: true,
    escalation_to_human: true,
    // Disabled — not applicable to this project
    order_placement: false,
    checkout_assistance: false,
    subscription_and_newsletter: false,
    event_information: false,
    order_tracking: false,
  },

  // Quick replies shown on first open
  quickReplies: [
    { label: '📅 Book Consultation', intent: 'booking', prompt: 'I would like to book a consultation' },
    { label: '⚖️ Practice Areas', intent: 'faq', prompt: 'What practice areas do you cover?' },
    { label: '👥 Meet the Team', intent: 'faq', prompt: 'Tell me about your attorneys' },
    { label: '📞 Contact Info', intent: 'faq', prompt: 'How can I contact the firm?' },
  ],

  // Contextual quick replies for mid-conversation
  contextualReplies: {
    after_services: [
      { label: 'Book a consultation', prompt: 'I want to book a consultation' },
      { label: 'Tell me about fees', prompt: 'What are your fees?' },
    ],
    after_booking_info: [
      { label: 'Go to booking page', prompt: 'Take me to the booking page' },
      { label: 'Contact directly', prompt: 'I want to contact you directly' },
    ],
    after_escalation: [
      { label: 'Leave a message', prompt: 'I want to leave a message' },
      { label: 'Call the office', prompt: 'What is your phone number?' },
    ],
  },

  // Firm contact info
  contact: {
    phone: '+1 (234) 567-890',
    email: 'info@lexdominion.com',
    address: '123 Legal Avenue, Suite 500, New York, NY 10001',
    hours: {
      weekday: 'Monday - Friday: 9:00 AM - 6:00 PM',
      saturday: 'Saturday: 10:00 AM - 2:00 PM',
      sunday: 'Sunday: Closed',
    },
  },

  // Links
  links: {
    booking: '/booking',
    contact: '/contact',
    services: '/services',
    team: '/team',
    blog: '/blog',
    about: '/about',
  },

  // OpenAI settings
  openai: {
    model: 'gpt-4o',
    maxTokens: 500,
    temperature: 0.7,
    maxHistoryMessages: 10,
  },

  // UI settings
  ui: {
    position: 'bottom-right' as const,
    width: 400,
    height: 600,
    mobileFullScreen: true,
    showTimestamps: true,
    showUnreadBadge: true,
    autoOpenDelay: 0, // ms, 0 = don't auto-open
    typingIndicatorDelay: 500, // ms before showing typing dots
  },
}

export type ChatbotConfig = typeof CHATBOT_CONFIG
