'use client'

import { motion } from 'framer-motion'

interface QuickRepliesProps {
  replies: string[]
  onSelect: (reply: string) => void
  disabled?: boolean
}

export default function QuickReplies({ replies, onSelect, disabled }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {replies.map((reply, i) => (
        <motion.button
          key={`${reply}-${i}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08 }}
          onClick={() => !disabled && onSelect(reply)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gold-50 text-gold-700 rounded-full hover:bg-gold-100 transition-colors border border-gold-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {reply}
        </motion.button>
      ))}
    </div>
  )
}
