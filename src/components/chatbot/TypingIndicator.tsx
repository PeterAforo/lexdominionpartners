'use client'

import { motion } from 'framer-motion'
import { Scale } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
        <Scale size={14} className="text-gold-400" />
      </div>
      <div className="bg-white p-3 rounded-lg border border-gray-100 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gold-400"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
