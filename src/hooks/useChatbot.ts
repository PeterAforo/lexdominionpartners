'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  action?: string
  quickReplies?: string[]
}

export interface LeadData {
  name: string
  email: string
  message: string
}

export interface ChatbotState {
  messages: ChatMessage[]
  input: string
  isLoading: boolean
  isOpen: boolean
  isMinimized: boolean
  unreadCount: number
  leadCaptureMode: boolean
  leadData: Partial<LeadData>
  leadStep: 'name' | 'email' | 'message' | 'done' | null
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: CHATBOT_CONFIG.greeting,
      timestamp: new Date(),
      action: 'none',
      quickReplies: CHATBOT_CONFIG.quickReplies.map((q) => q.label),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [unreadCount, setUnreadCount] = useState(1)
  const [leadCaptureMode, setLeadCaptureMode] = useState(false)
  const [leadStep, setLeadStep] = useState<'name' | 'email' | 'message' | 'done' | null>(null)
  const [leadData, setLeadData] = useState<Partial<LeadData>>({})
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMsg])
    return newMsg
  }, [])

  // Handle lead capture flow
  const handleLeadCapture = useCallback(async (userInput: string) => {
    if (leadStep === 'name') {
      setLeadData((prev) => ({ ...prev, name: userInput }))
      setLeadStep('email')
      addMessage({
        role: 'assistant',
        content: `Thanks, **${userInput}**! What's your email address so our team can reach you?`,
        quickReplies: ['Cancel'],
      })
      return true
    }

    if (leadStep === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userInput)) {
        addMessage({
          role: 'assistant',
          content: "That doesn't look like a valid email address. Could you please try again?",
          quickReplies: ['Cancel'],
        })
        return true
      }
      setLeadData((prev) => ({ ...prev, email: userInput }))
      setLeadStep('message')
      addMessage({
        role: 'assistant',
        content: 'Great! Is there a specific message or question you\'d like our team to address?',
        quickReplies: ['No specific message', 'Cancel'],
      })
      return true
    }

    if (leadStep === 'message') {
      const finalData = { ...leadData, message: userInput } as LeadData

      // Submit lead
      try {
        await fetch('/api/ai/lead-capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...finalData, source: 'Lex AI Chatbot' }),
        })
        addMessage({
          role: 'assistant',
          content: `Thank you, **${finalData.name}**! 🎉 Your message has been received. Our team will get back to you at **${finalData.email}** within 24 hours.\n\nIs there anything else I can help you with?`,
          action: 'none',
          quickReplies: ['Book Consultation', 'Practice Areas', 'That\'s all, thanks!'],
        })
      } catch {
        addMessage({
          role: 'assistant',
          content: `I'm sorry, there was an issue submitting your message. Please contact us directly:\n\n• **Phone:** ${CHATBOT_CONFIG.contact.phone}\n• **Email:** ${CHATBOT_CONFIG.contact.email}`,
          quickReplies: ['Try again', 'Contact directly'],
        })
      }

      setLeadCaptureMode(false)
      setLeadStep(null)
      setLeadData({})
      return true
    }

    return false
  }, [leadStep, leadData, addMessage])

  // Start lead capture flow
  const startLeadCapture = useCallback(() => {
    setLeadCaptureMode(true)
    setLeadStep('name')
    addMessage({
      role: 'assistant',
      content: "I'd be happy to have our team reach out to you! What's your name?",
      action: 'capture_lead',
      quickReplies: ['Cancel'],
    })
  }, [addMessage])

  // Send message to API
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userContent = content.trim()
    addMessage({ role: 'user', content: userContent })
    setInput('')

    // Check for cancel in lead capture mode
    if (leadCaptureMode && userContent.toLowerCase() === 'cancel') {
      setLeadCaptureMode(false)
      setLeadStep(null)
      setLeadData({})
      addMessage({
        role: 'assistant',
        content: 'No problem! Is there anything else I can help you with?',
        quickReplies: ['Book Consultation', 'Practice Areas', 'Contact Info'],
      })
      return
    }

    // Handle lead capture flow
    if (leadCaptureMode) {
      const handled = await handleLeadCapture(userContent)
      if (handled) return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userContent }]
            .filter((m) => m.role !== undefined)
            .map((m) => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      })

      const data = await response.json()

      // Handle action-based responses
      if (data.action === 'capture_lead') {
        startLeadCapture()
        return
      }

      addMessage({
        role: 'assistant',
        content: data.message || CHATBOT_CONFIG.fallbackMessage,
        action: data.action || 'none',
        quickReplies: data.quick_replies || [],
      })

      // If chat is not open, increment unread
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    } catch {
      addMessage({
        role: 'assistant',
        content: CHATBOT_CONFIG.errorMessage,
        quickReplies: ['Try again', 'Contact directly'],
      })
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages, sessionId, isOpen, leadCaptureMode, handleLeadCapture, startLeadCapture, addMessage])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }, [input, sendMessage])

  const openChat = useCallback(() => {
    setIsOpen(true)
    setIsMinimized(false)
    setUnreadCount(0)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev)
  }, [])

  return {
    messages,
    input,
    setInput,
    isLoading,
    isOpen,
    isMinimized,
    unreadCount,
    messagesEndRef,
    inputRef,
    sendMessage,
    handleSubmit,
    openChat,
    closeChat,
    toggleMinimize,
    leadCaptureMode,
  }
}
