'use client'

import { motion } from 'framer-motion'
import { Scale, User } from 'lucide-react'
import Link from 'next/link'
import type { ChatMessage as ChatMessageType } from '@/hooks/useChatbot'

interface ChatMessageProps {
  message: ChatMessageType
  showTimestamp?: boolean
}

// Parse markdown-style links [text](/path) and **bold** from message content
function parseContent(content: string) {
  const parts: (string | JSX.Element)[] = []
  // Match markdown links and bold
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index))
    }

    if (match[1] && match[2]) {
      // Link: [text](url)
      parts.push(
        <Link
          key={match.index}
          href={match[2]}
          className="text-gold-500 hover:text-gold-600 underline underline-offset-2 font-medium"
        >
          {match[1]}
        </Link>
      )
    } else if (match[3]) {
      // Bold: **text**
      parts.push(
        <strong key={match.index} className="font-semibold">
          {match[3]}
        </strong>
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex))
  }

  return parts
}

// Render message content with line breaks and parsed markdown
function RenderContent({ content }: { content: string }) {
  const lines = content.split('\n')

  return (
    <>
      {lines.map((line, i) => {
        if (line.trim() === '') return <br key={i} />

        // Detect bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('-') || /^\d+\./.test(line.trim())) {
          return (
            <div key={i} className="flex gap-2 ml-1 my-0.5">
              <span className="shrink-0">{line.trim().startsWith('•') ? '•' : line.trim().startsWith('-') ? '–' : ''}</span>
              <span>
                {parseContent(
                  line.trim().replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '')
                )}
              </span>
            </div>
          )
        }

        return (
          <span key={i}>
            {parseContent(line)}
            {i < lines.length - 1 && <br />}
          </span>
        )
      })}
    </>
  )
}

export default function ChatMessage({ message, showTimestamp = false }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? 'bg-gold-400' : 'bg-navy-800'
        }`}
      >
        {isUser ? (
          <User size={14} className="text-navy-800" />
        ) : (
          <Scale size={14} className="text-gold-400" />
        )}
      </div>

      {/* Message bubble */}
      <div className={`max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-3 rounded-xl text-sm leading-relaxed ${
            isUser
              ? 'bg-gold-400 text-navy-800 rounded-br-sm'
              : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm shadow-sm'
          }`}
        >
          <RenderContent content={message.content} />
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <span className="text-[10px] text-gray-400 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}
