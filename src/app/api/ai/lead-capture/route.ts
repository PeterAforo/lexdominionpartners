import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, message, source } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: source || 'Chatbot Lead Capture',
        message: message || 'Lead captured via Lex AI Assistant',
      },
    })

    return NextResponse.json({ success: true, id: contactMessage.id })
  } catch (error) {
    console.error('Lead capture error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
