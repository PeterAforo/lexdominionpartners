'use client'

import { Send } from 'lucide-react'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  inputRef: React.RefObject<HTMLInputElement>
  placeholder?: string
}

export default function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  inputRef,
  placeholder = 'Type your message...',
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-3 border-t border-gray-100 bg-white shrink-0">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
          disabled={isLoading}
          maxLength={500}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 bg-gold-400 text-navy-800 rounded-lg hover:bg-gold-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between mt-1.5 px-1">
        <span className="text-[10px] text-gray-400">
          Powered by Lex AI • Not legal advice
        </span>
        {input.length > 400 && (
          <span className="text-[10px] text-gray-400">
            {input.length}/500
          </span>
        )}
      </div>
    </form>
  )
}
