import { NextRequest, NextResponse } from 'next/server'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'
import { KNOWLEDGE_BASE, searchKnowledge } from '@/lib/chatbot-knowledge'

// Rate limiting: simple in-memory store
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 30 // requests per window
const RATE_WINDOW = 60 * 1000 // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// Cache for dynamic knowledge (refreshes every 5 minutes)
let dynamicKnowledgeCache: { content: string; fetchedAt: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

async function fetchDynamicKnowledge(): Promise<string> {
  const now = Date.now()
  if (dynamicKnowledgeCache && now - dynamicKnowledgeCache.fetchedAt < CACHE_TTL) {
    return dynamicKnowledgeCache.content
  }

  try {
    // Use internal fetch to the sync-knowledge endpoint
    const baseUrl = process.env.NEXTAUTH_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const res = await fetch(`${baseUrl}/api/ai/sync-knowledge`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      dynamicKnowledgeCache = { content: data.dynamicKnowledge || '', fetchedAt: now }
      return dynamicKnowledgeCache.content
    }
  } catch (err) {
    console.error('Failed to fetch dynamic knowledge:', err)
  }

  return dynamicKnowledgeCache?.content || ''
}

// Build the system prompt dynamically from config, knowledge base, and live DB content
async function buildSystemPrompt(): Promise<string> {
  const { name, personality, contact, capabilities } = CHATBOT_CONFIG

  const knowledgeSummary = KNOWLEDGE_BASE.map(
    (k) => `Q: ${k.question}\nA: ${k.answer}`
  ).join('\n\n')

  // Fetch live content from database
  const dynamicKnowledge = await fetchDynamicKnowledge()

  return `You are ${name}, the AI legal assistant for Lex Dominion Partners, a premier law firm. Tagline: "Law & Leadership".

PERSONALITY: ${personality.tone}. ${personality.style}.

RULES:
${personality.rules.map((r) => `- ${r}`).join('\n')}

CONTACT INFO:
- Phone: ${contact.phone}
- Email: ${contact.email}
- Address: ${contact.address}
- Hours: ${contact.hours.weekday}, ${contact.hours.saturday}, ${contact.hours.sunday}

ENABLED CAPABILITIES:
${Object.entries(capabilities)
  .filter(([, v]) => v)
  .map(([k]) => `- ${k}`)
  .join('\n')}

RESPONSE FORMAT:
You MUST respond with valid JSON in this exact format — no markdown code fences, just raw JSON:
{
  "message": "Your text response to the user. Use markdown for formatting (bold, lists, links).",
  "action": "none",
  "quick_replies": ["Suggestion 1", "Suggestion 2"]
}

ACTION VALUES (use exactly one):
- "none" — normal conversational response
- "book_appointment" — user wants to book a consultation. The frontend will handle the booking flow inline — just confirm you'll help them book.
- "capture_lead" — user wants to leave a message or be contacted. Ask for name and email.
- "redirect" — user should be directed to a specific page. Include the path in message.
- "show_services" — user wants to see practice areas overview.
- "escalate" — user is frustrated or needs human help.

QUICK_REPLIES: Always suggest 2-4 short follow-up options (max 30 chars each) that are relevant to the conversation context.

CONVERSATION FLOWS:
1. BOOKING: When user wants to book → return action "book_appointment". The frontend handles the full booking flow inline (collecting details, checking availability, confirming).
2. LEAD CAPTURE: When user wants to leave a message → ask for name → ask for email → ask for their message → confirm receipt
3. ESCALATION: When user seems frustrated → acknowledge → offer to connect with human → provide contact info or trigger lead capture
4. FAQ: Search knowledge base first, then provide relevant answer with source

KNOWLEDGE BASE:
${knowledgeSummary}
${dynamicKnowledge ? `\nLIVE WEBSITE DATA (updated automatically from database — always prefer this over static knowledge if there is a conflict):\n${dynamicKnowledge}` : ''}

IMPORTANT:
- Always stay on-topic about legal services and Lex Dominion Partners
- If you don't know something, offer to connect the user with an attorney
- ALWAYS respond with valid JSON only — no extra text before or after
- When mentioning pages, use markdown links like [booking page](/booking)
- Keep responses concise (2-4 sentences for simple queries, more for detailed explanations)
- If live website data is available, use it as the source of truth for services, team members, blog posts, and testimonials`
}

// Detect conversation intent for fallback routing
function detectIntent(message: string): string {
  const msg = message.toLowerCase()

  // Frustration detection
  const frustrationWords = ['frustrated', 'unhappy', 'broken', 'terrible', 'worst', 'angry', 'ridiculous', 'useless', 'waste']
  if (frustrationWords.some((w) => msg.includes(w))) return 'escalate'

  // Booking intent
  if (msg.includes('book') || msg.includes('consultation') || msg.includes('appointment') || msg.includes('schedule') || msg.includes('meeting')) return 'booking'

  // Lead capture intent
  if (msg.includes('leave a message') || msg.includes('reach out') || msg.includes('talk to someone') || msg.includes('contact you') || msg.includes('call me back')) return 'lead_capture'

  // Services intent
  if (msg.includes('practice') || msg.includes('service') || msg.includes('area') || msg.includes('what do you do') || msg.includes('specialize')) return 'services'

  // Contact intent
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('address') || msg.includes('location') || msg.includes('where')) return 'contact'

  // Team intent
  if (msg.includes('team') || msg.includes('attorney') || msg.includes('lawyer') || msg.includes('who')) return 'team'

  // Fee intent
  if (msg.includes('fee') || msg.includes('cost') || msg.includes('price') || msg.includes('charge') || msg.includes('expensive') || msg.includes('payment') || msg.includes('afford')) return 'fees'

  // Hours intent
  if (msg.includes('hour') || msg.includes('open') || msg.includes('when') || msg.includes('available')) return 'hours'

  // Blog intent
  if (msg.includes('blog') || msg.includes('article') || msg.includes('read') || msg.includes('resource') || msg.includes('news')) return 'blog'

  // Greeting intent
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good morning') || msg.includes('good afternoon') || msg.includes('good evening')) return 'greeting'

  return 'general'
}

// Build fallback response with structured format
function getFallbackResponse(userMessage: string): object {
  const intent = detectIntent(userMessage)

  // Try knowledge base search first
  const knowledgeMatch = searchKnowledge(userMessage)

  if (knowledgeMatch && intent !== 'greeting') {
    const quickReplies = getQuickRepliesForCategory(knowledgeMatch.category)
    return {
      message: knowledgeMatch.answer,
      action: intent === 'booking' ? 'book_appointment' : intent === 'escalate' ? 'escalate' : 'none',
      quick_replies: quickReplies,
    }
  }

  // Intent-based fallback
  switch (intent) {
    case 'greeting':
      return {
        message: "Hello! Welcome to Lex Dominion Partners. I'm Lex, your AI legal assistant. I can help you with:\n\n• Booking a free consultation\n• Information about our practice areas\n• Contact details and office hours\n• General questions about our services\n\nHow can I assist you today?",
        action: 'none',
        quick_replies: ['Book Consultation', 'Practice Areas', 'Contact Info', 'Meet the Team'],
      }
    case 'booking':
      return {
        message: "I can help you book a consultation right here! Our initial consultations are **complimentary**. Let me walk you through the process.",
        action: 'book_appointment',
        quick_replies: ['Corporate Law', 'Family Law', 'Criminal Defense', 'Immigration'],
      }
    case 'escalate':
      return {
        message: "I'm sorry you're having trouble. Let me connect you with our team directly. You can:\n\n• **Call:** +1 (234) 567-890\n• **Email:** info@lexdominion.com\n• **Contact form:** [/contact](/contact)\n\nOr I can take your details and have someone reach out to you. Would you like that?",
        action: 'escalate',
        quick_replies: ['Leave a message', 'Call the office', 'Book consultation'],
      }
    case 'lead_capture':
      return {
        message: "I'd be happy to have someone reach out to you! Could you please share your **name** and **email address**? Our team will get back to you within 24 hours.",
        action: 'capture_lead',
        quick_replies: ['Call instead', 'Book consultation'],
      }
    default:
      return {
        message: "Thank you for your question. While I can help with general information about our firm and services, for specific legal matters, I'd recommend scheduling a consultation with one of our attorneys.\n\nWould you like to:\n\n1. **Book a consultation** — Visit [/booking](/booking)\n2. **Learn about our services** — Visit [/services](/services)\n3. **Contact us directly** — Call +1 (234) 567-890",
        action: 'none',
        quick_replies: ['Book Consultation', 'Our Services', 'Contact Us'],
      }
  }
}

function getQuickRepliesForCategory(category: string): string[] {
  switch (category) {
    case 'services':
      return ['Book Consultation', 'What are your fees?', 'Meet the team']
    case 'booking':
      return ['Go to booking page', 'What to expect', 'Contact directly']
    case 'fees':
      return ['Book free consultation', 'Payment plans', 'Contact us']
    case 'team':
      return ['Book Consultation', 'Practice Areas', 'Contact Info']
    case 'contact':
      return ['Book Consultation', 'Office Hours', 'Practice Areas']
    case 'blog':
      return ['Book Consultation', 'Practice Areas', 'Contact Us']
    default:
      return ['Book Consultation', 'Our Services', 'Contact Us']
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "You've sent too many messages. Please wait a moment before trying again.", action: 'none', quick_replies: [] },
        { status: 429 }
      )
    }

    const { messages, sessionId } = await req.json()
    const lastMessage = messages[messages.length - 1]?.content || ''

    // Try OpenAI if API key is configured
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
      try {
        const systemPrompt = await buildSystemPrompt()

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: CHATBOT_CONFIG.openai.model,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.slice(-CHATBOT_CONFIG.openai.maxHistoryMessages),
            ],
            max_tokens: CHATBOT_CONFIG.openai.maxTokens,
            temperature: CHATBOT_CONFIG.openai.temperature,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const rawContent = data.choices?.[0]?.message?.content || ''

          // Try to parse as structured JSON
          try {
            const parsed = JSON.parse(rawContent)
            return NextResponse.json({
              message: parsed.message || rawContent,
              action: parsed.action || 'none',
              quick_replies: parsed.quick_replies || [],
            })
          } catch {
            // If not valid JSON, wrap the raw text
            return NextResponse.json({
              message: rawContent,
              action: 'none',
              quick_replies: ['Book Consultation', 'Our Services', 'Contact Us'],
            })
          }
        }
      } catch (apiError) {
        console.error('OpenAI API error:', apiError)
        // Fall through to fallback
      }
    }

    // Fallback: use knowledge base + intent detection
    const fallback = getFallbackResponse(lastMessage)
    return NextResponse.json(fallback)
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({
      message: CHATBOT_CONFIG.errorMessage,
      action: 'none',
      quick_replies: ['Call +1 (234) 567-890', 'Email us'],
    })
  }
}
