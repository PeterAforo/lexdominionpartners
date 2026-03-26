import { NextRequest, NextResponse } from 'next/server'

const FIRM_KNOWLEDGE = `
You are Lex, the AI legal assistant for Lex Dominion Partners, a premier law firm. Tagline: "Law & Leadership". Always introduce yourself as "Lex" when greeting users.

PRACTICE AREAS: Corporate Law, Litigation, Real Estate, Family Law, Criminal Defense, Intellectual Property, Immigration, Tax Law.

CONTACT INFO:
- Phone: +1 (234) 567-890
- Email: info@lexdominion.com
- Address: 123 Legal Avenue, Suite 500, New York, NY 10001
- Hours: Mon-Fri 9AM-6PM, Sat 10AM-2PM

KEY TEAM MEMBERS:
- Alexander Mensah - Managing Partner, Corporate Law
- Amara Adeyemi - Senior Partner, Litigation
- Kwame Okafor - Partner, Real Estate
- Nkechi Nkosi - Partner, Family Law
- Emeka Afolabi - Partner, Criminal Defense
- Sophia Dlamini - Partner, Intellectual Property
- Kofi Asante - Partner, Immigration
- Abena Osei - Partner, Tax Law

BOOKING: Direct users to /booking page or offer to help them start the booking process. Consultations are free for the first meeting.

GUIDELINES:
- Be professional, warm, and helpful
- Never provide specific legal advice - always recommend consulting with an attorney
- Help with booking consultations, answering general questions about services, and providing contact information
- If asked about fees, say "Our fee structure varies by case type. We offer a free initial consultation to discuss your needs and provide a transparent fee estimate."
- Keep responses concise and helpful
`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: FIRM_KNOWLEDGE },
            ...messages.slice(-10),
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      })

      const data = await response.json()
      return NextResponse.json({
        message: data.choices?.[0]?.message?.content || getFallbackResponse(messages[messages.length - 1]?.content),
      })
    }

    return NextResponse.json({
      message: getFallbackResponse(messages[messages.length - 1]?.content || ''),
    })
  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json({
      message: 'I apologize for the inconvenience. Please contact us directly at +1 (234) 567-890 or email info@lexdominion.com for immediate assistance.',
    })
  }
}

function getFallbackResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('book') || msg.includes('consultation') || msg.includes('appointment') || msg.includes('schedule')) {
    return 'I\'d be happy to help you book a consultation! You can schedule one directly on our booking page at /booking, or call us at +1 (234) 567-890. Our initial consultations are complimentary. What practice area is your matter related to?'
  }
  if (msg.includes('practice') || msg.includes('service') || msg.includes('area') || msg.includes('what do you')) {
    return 'Lex Dominion Partners offers comprehensive legal services in:\n\n• **Corporate Law** - Mergers, governance, compliance\n• **Litigation** - Civil and commercial disputes\n• **Real Estate** - Transactions and property law\n• **Family Law** - Divorce, custody, adoption\n• **Criminal Defense** - State and federal cases\n• **Intellectual Property** - Patents, trademarks, copyrights\n• **Immigration** - Visas, green cards, citizenship\n• **Tax Law** - Planning, compliance, disputes\n\nWould you like to know more about any specific area?'
  }
  if (msg.includes('hour') || msg.includes('open') || msg.includes('when')) {
    return 'Our office hours are:\n\n• **Monday - Friday:** 9:00 AM - 6:00 PM\n• **Saturday:** 10:00 AM - 2:00 PM\n• **Sunday:** Closed\n\nWe also offer after-hours consultations by appointment. Call +1 (234) 567-890 to schedule.'
  }
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('address') || msg.includes('location')) {
    return 'Here\'s how to reach us:\n\n• **Phone:** +1 (234) 567-890\n• **Email:** info@lexdominion.com\n• **Address:** 123 Legal Avenue, Suite 500, New York, NY 10001\n\nYou can also fill out our contact form at /contact.'
  }
  if (msg.includes('fee') || msg.includes('cost') || msg.includes('price') || msg.includes('charge') || msg.includes('expensive')) {
    return 'Our fee structure varies based on the type and complexity of your case. We offer a **free initial consultation** where we can discuss your situation and provide a transparent fee estimate. We also offer flexible payment arrangements. Would you like to schedule a consultation?'
  }
  if (msg.includes('team') || msg.includes('attorney') || msg.includes('lawyer') || msg.includes('who')) {
    return 'Our leadership team includes:\n\n• **Alexander Mensah** - Managing Partner (Corporate Law)\n• **Amara Adeyemi** - Senior Partner (Litigation)\n• **Kwame Okafor** - Partner (Real Estate)\n• **Nkechi Nkosi** - Partner (Family Law)\n• **Emeka Afolabi** - Partner (Criminal Defense)\n• **Sophia Dlamini** - Partner (Intellectual Property)\n• **Kofi Asante** - Partner (Immigration)\n• **Abena Osei** - Partner (Tax Law)\n\nVisit /team to see all our attorneys and their profiles.'
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good')) {
    return 'Hello! Welcome to Lex Dominion Partners. I\'m Lex, your AI legal assistant. I can help you with:\n\n• Booking a consultation\n• Information about our practice areas\n• Contact details and office hours\n• General questions about our services\n\nHow can I assist you today?'
  }

  return 'Thank you for your question. While I can help with general information about our firm and services, for specific legal matters, I\'d recommend scheduling a consultation with one of our attorneys. Would you like to:\n\n1. **Book a consultation** - Visit /booking\n2. **Learn about our services** - Visit /services\n3. **Contact us directly** - Call +1 (234) 567-890\n\nHow can I help?'
}
