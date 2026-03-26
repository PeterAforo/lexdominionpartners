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

export interface BookingData {
  service: string
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

type BookingStep = 'service' | 'firstName' | 'lastName' | 'email' | 'phone' | 'date' | 'time' | 'confirm' | null

const PRACTICE_AREAS = [
  'Corporate Law', 'Litigation', 'Real Estate', 'Family Law',
  'Criminal Defense', 'Intellectual Property', 'Immigration', 'Tax Law', 'Other',
]

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

  // Lead capture state
  const [leadCaptureMode, setLeadCaptureMode] = useState(false)
  const [leadStep, setLeadStep] = useState<'name' | 'email' | 'message' | 'done' | null>(null)
  const [leadData, setLeadData] = useState<Partial<LeadData>>({})

  // Booking state
  const [bookingMode, setBookingMode] = useState(false)
  const [bookingStep, setBookingStep] = useState<BookingStep>(null)
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({})
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

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

  // =====================
  // BOOKING FLOW
  // =====================
  const resetBooking = useCallback(() => {
    setBookingMode(false)
    setBookingStep(null)
    setBookingData({})
    setAvailableSlots([])
  }, [])

  const startBooking = useCallback((preselectedService?: string) => {
    setBookingMode(true)
    setBookingData({})
    setAvailableSlots([])

    if (preselectedService && PRACTICE_AREAS.some((a) => a.toLowerCase() === preselectedService.toLowerCase())) {
      // Service already selected — skip to firstName
      const matched = PRACTICE_AREAS.find((a) => a.toLowerCase() === preselectedService.toLowerCase()) || preselectedService
      setBookingData({ service: matched })
      setBookingStep('firstName')
      addMessage({
        role: 'assistant',
        content: `Great, I'll help you book a **${matched}** consultation! 📋\n\nLet's get your details. What is your **first name**?`,
        quickReplies: ['Cancel booking'],
      })
    } else {
      setBookingStep('service')
      addMessage({
        role: 'assistant',
        content: "Let's book your consultation! 📅\n\nFirst, which **practice area** is your matter related to?",
        quickReplies: [...PRACTICE_AREAS.slice(0, 4), 'More areas...'],
      })
    }
  }, [addMessage])

  const handleBookingFlow = useCallback(async (userInput: string): Promise<boolean> => {
    if (!bookingMode) return false

    const input = userInput.trim()

    // Show more practice areas
    if (bookingStep === 'service' && input.toLowerCase() === 'more areas...') {
      addMessage({
        role: 'assistant',
        content: 'Here are all our practice areas:',
        quickReplies: [...PRACTICE_AREAS, 'Cancel booking'],
      })
      return true
    }

    switch (bookingStep) {
      case 'service': {
        const matched = PRACTICE_AREAS.find((a) => a.toLowerCase() === input.toLowerCase()) || input
        setBookingData((prev) => ({ ...prev, service: matched }))
        setBookingStep('firstName')
        addMessage({
          role: 'assistant',
          content: `**${matched}** — excellent choice.\n\nNow, let's get your details. What is your **first name**?`,
          quickReplies: ['Cancel booking'],
        })
        return true
      }

      case 'firstName': {
        setBookingData((prev) => ({ ...prev, firstName: input }))
        setBookingStep('lastName')
        addMessage({
          role: 'assistant',
          content: `Thanks, **${input}**! What is your **last name**?`,
          quickReplies: ['Cancel booking'],
        })
        return true
      }

      case 'lastName': {
        setBookingData((prev) => ({ ...prev, lastName: input }))
        setBookingStep('email')
        addMessage({
          role: 'assistant',
          content: `Got it, **${bookingData.firstName} ${input}**.\n\nWhat's your **email address**? We'll send your booking confirmation here.`,
          quickReplies: ['Cancel booking'],
        })
        return true
      }

      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input)) {
          addMessage({
            role: 'assistant',
            content: "That doesn't look like a valid email. Please enter a valid email address.",
            quickReplies: ['Cancel booking'],
          })
          return true
        }
        setBookingData((prev) => ({ ...prev, email: input }))
        setBookingStep('phone')
        addMessage({
          role: 'assistant',
          content: "What's your **phone number**?",
          quickReplies: ['Cancel booking'],
        })
        return true
      }

      case 'phone': {
        setBookingData((prev) => ({ ...prev, phone: input }))
        setBookingStep('date')
        // Calculate min date (tomorrow)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const minDate = tomorrow.toISOString().split('T')[0]
        addMessage({
          role: 'assistant',
          content: `What **date** would you prefer for your consultation?\n\nPlease enter a date in **YYYY-MM-DD** format (e.g., ${minDate}).\n\nOur office hours:\n• **Mon–Fri:** 9 AM – 6 PM\n• **Saturday:** 10 AM – 2 PM\n• **Sunday:** Closed`,
          quickReplies: [minDate, 'Cancel booking'],
        })
        return true
      }

      case 'date': {
        // Validate date format
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        if (!dateRegex.test(input)) {
          addMessage({
            role: 'assistant',
            content: "Please enter the date in **YYYY-MM-DD** format (e.g., 2026-04-01).",
            quickReplies: ['Cancel booking'],
          })
          return true
        }

        const selectedDate = new Date(input + 'T12:00:00')
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate <= today) {
          addMessage({
            role: 'assistant',
            content: "That date is in the past. Please choose a **future date**.",
            quickReplies: ['Cancel booking'],
          })
          return true
        }

        // Check availability via API
        setIsLoading(true)
        try {
          const res = await fetch('/api/ai/booking/check-availability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: input }),
          })
          const data = await res.json()

          if (!data.available || data.availableSlots.length === 0) {
            // No slots — suggest another date
            const nextDay = new Date(selectedDate)
            nextDay.setDate(nextDay.getDate() + 1)
            // Skip Sunday
            if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1)
            const altDate = nextDay.toISOString().split('T')[0]

            addMessage({
              role: 'assistant',
              content: `${data.message || 'Sorry, no available slots on that date.'}\n\nWould you like to try a different date?`,
              quickReplies: [altDate, 'Pick another date', 'Cancel booking'],
            })
            return true
          }

          // Slots available — show them
          setBookingData((prev) => ({ ...prev, date: input }))
          setAvailableSlots(data.availableSlots)
          setBookingStep('time')

          // Show slots in groups
          const morningSlots = data.availableSlots.filter((s: string) => s.includes('AM'))
          const afternoonSlots = data.availableSlots.filter((s: string) => s.includes('PM'))

          let slotsMessage = `**${data.availableSlots.length} time slots available** on **${input}**:\n\n`
          if (morningSlots.length > 0) {
            slotsMessage += `🌅 **Morning:** ${morningSlots.join(', ')}\n`
          }
          if (afternoonSlots.length > 0) {
            slotsMessage += `☀️ **Afternoon:** ${afternoonSlots.join(', ')}\n`
          }
          slotsMessage += '\nWhich time slot would you prefer?'

          // Show first 4 slots as quick replies
          const quickSlots = data.availableSlots.slice(0, 4)

          addMessage({
            role: 'assistant',
            content: slotsMessage,
            quickReplies: [...quickSlots, 'Cancel booking'],
          })
        } catch {
          addMessage({
            role: 'assistant',
            content: "I couldn't check availability right now. You can also book directly at our [booking page](/booking), or try again.",
            quickReplies: ['Try again', 'Go to booking page', 'Cancel booking'],
          })
        } finally {
          setIsLoading(false)
        }
        return true
      }

      case 'time': {
        // Check if the selected time is in available slots
        const selectedTime = availableSlots.find(
          (s) => s.toLowerCase() === input.toLowerCase()
        ) || input

        if (!availableSlots.some((s) => s.toLowerCase() === input.toLowerCase())) {
          addMessage({
            role: 'assistant',
            content: `**${input}** is not available. Please choose from the available time slots:`,
            quickReplies: [...availableSlots.slice(0, 4), 'Cancel booking'],
          })
          return true
        }

        setBookingData((prev) => ({ ...prev, time: selectedTime }))
        setBookingStep('confirm')

        // Show booking summary
        const summary = `Here's your booking summary:\n\n` +
          `• **Practice Area:** ${bookingData.service}\n` +
          `• **Name:** ${bookingData.firstName} ${bookingData.lastName}\n` +
          `• **Email:** ${bookingData.email}\n` +
          `• **Phone:** ${bookingData.phone}\n` +
          `• **Date:** ${bookingData.date}\n` +
          `• **Time:** ${selectedTime}\n\n` +
          `Shall I **confirm** this booking?`

        addMessage({
          role: 'assistant',
          content: summary,
          quickReplies: ['✅ Confirm Booking', 'Change date', 'Change time', 'Cancel booking'],
        })
        return true
      }

      case 'confirm': {
        const response = input.toLowerCase()

        if (response.includes('confirm') || response === 'yes' || response === 'y') {
          // Submit the booking
          setIsLoading(true)
          try {
            const res = await fetch('/api/ai/booking/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookingData),
            })
            const data = await res.json()

            if (data.success) {
              addMessage({
                role: 'assistant',
                content: `🎉 **Booking Confirmed!**\n\n` +
                  `Your **${bookingData.service}** consultation has been booked:\n\n` +
                  `• **Date:** ${bookingData.date}\n` +
                  `• **Time:** ${bookingData.time}\n` +
                  `• **Confirmation will be sent to:** ${bookingData.email}\n\n` +
                  `Our team will confirm your appointment via email within 24 hours. The initial consultation is **complimentary**.\n\n` +
                  `Is there anything else I can help you with?`,
                action: 'none',
                quickReplies: ['Practice Areas', 'Contact Info', "That's all, thanks!"],
              })
              resetBooking()
            } else {
              // Slot was taken between check and confirm
              addMessage({
                role: 'assistant',
                content: `${data.error || 'Sorry, this slot is no longer available.'}\n\nWould you like to choose a different time?`,
                quickReplies: ['Pick another time', 'Pick another date', 'Cancel booking'],
              })
              setBookingStep('date')
            }
          } catch {
            addMessage({
              role: 'assistant',
              content: `I'm sorry, there was an error completing your booking. Please try again or book directly at [/booking](/booking).\n\n• **Phone:** ${CHATBOT_CONFIG.contact.phone}`,
              quickReplies: ['Try again', 'Go to booking page', 'Cancel booking'],
            })
          } finally {
            setIsLoading(false)
          }
          return true
        }

        if (response.includes('change date') || response.includes('another date') || response.includes('pick another date')) {
          setBookingStep('date')
          const tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          const minDate = tomorrow.toISOString().split('T')[0]
          addMessage({
            role: 'assistant',
            content: 'No problem! Please enter your preferred **date** (YYYY-MM-DD format):',
            quickReplies: [minDate, 'Cancel booking'],
          })
          return true
        }

        if (response.includes('change time') || response.includes('another time') || response.includes('pick another time')) {
          setBookingStep('time')
          addMessage({
            role: 'assistant',
            content: `Here are the available time slots on **${bookingData.date}**:\n\n${availableSlots.join(', ')}\n\nWhich time would you prefer?`,
            quickReplies: [...availableSlots.slice(0, 4), 'Cancel booking'],
          })
          return true
        }

        // Not understood
        addMessage({
          role: 'assistant',
          content: "Would you like to **confirm** this booking, or make changes?",
          quickReplies: ['✅ Confirm Booking', 'Change date', 'Change time', 'Cancel booking'],
        })
        return true
      }

      default:
        return false
    }
  }, [bookingMode, bookingStep, bookingData, availableSlots, addMessage, resetBooking, setIsLoading])

  // =====================
  // LEAD CAPTURE FLOW
  // =====================
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
          quickReplies: ['Book Consultation', 'Practice Areas', "That's all, thanks!"],
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

  // =====================
  // MAIN SEND MESSAGE
  // =====================
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userContent = content.trim()
    addMessage({ role: 'user', content: userContent })
    setInput('')

    // Cancel any active flow
    if (userContent.toLowerCase() === 'cancel booking' || userContent.toLowerCase() === 'cancel') {
      if (bookingMode) {
        resetBooking()
        addMessage({
          role: 'assistant',
          content: 'Booking cancelled. Is there anything else I can help you with?',
          quickReplies: ['Book Consultation', 'Practice Areas', 'Contact Info'],
        })
        return
      }
      if (leadCaptureMode) {
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
    }

    // Handle active booking flow
    if (bookingMode) {
      const handled = await handleBookingFlow(userContent)
      if (handled) return
    }

    // Handle active lead capture flow
    if (leadCaptureMode) {
      const handled = await handleLeadCapture(userContent)
      if (handled) return
    }

    // Detect if user wants to start booking (check for practice area match first)
    const lowerContent = userContent.toLowerCase()
    const isBookingIntent = lowerContent.includes('book') || lowerContent.includes('consultation') ||
      lowerContent.includes('appointment') || lowerContent.includes('schedule')
    const matchedArea = PRACTICE_AREAS.find((a) => lowerContent.includes(a.toLowerCase()))

    if (isBookingIntent || matchedArea) {
      if (!bookingMode) {
        startBooking(matchedArea || undefined)
        return
      }
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

      // Handle action-based responses from AI
      if (data.action === 'capture_lead') {
        startLeadCapture()
        return
      }

      if (data.action === 'book_appointment') {
        startBooking()
        return
      }

      addMessage({
        role: 'assistant',
        content: data.message || CHATBOT_CONFIG.fallbackMessage,
        action: data.action || 'none',
        quickReplies: data.quick_replies || [],
      })

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
  }, [isLoading, messages, sessionId, isOpen, bookingMode, leadCaptureMode, handleBookingFlow, handleLeadCapture, startBooking, startLeadCapture, addMessage, resetBooking])

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
    bookingMode,
  }
}
