'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Scale, X, Minus, RotateCcw } from 'lucide-react'
import { useChatbot } from '@/hooks/useChatbot'
import { CHATBOT_CONFIG } from '@/lib/chatbot-config'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import QuickReplies from './QuickReplies'
import TypingIndicator from './TypingIndicator'

export default function Chatbot() {
  const {
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
  } = useChatbot()

  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant')

  return (
    <>
      {/* Floating Launch Button */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {/* Pulse ring */}
            <div className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full animate-ping bg-gold-400/20 pointer-events-none" />

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gold-400 text-navy-800 rounded-full shadow-2xl flex items-center justify-center hover:bg-gold-500 transition-colors group"
              aria-label="Open Lex AI Assistant"
            >
              <Scale size={26} className="group-hover:rotate-12 transition-transform duration-300" />

              {/* Unread badge */}
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col
                       w-[400px] max-w-[calc(100vw-32px)]
                       sm:max-w-[400px]
                       max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:top-0 max-sm:w-full max-sm:max-w-full max-sm:rounded-none"
            style={{ height: isMinimized ? 'auto' : undefined, maxHeight: isMinimized ? 'auto' : 'min(600px, calc(100vh - 48px))' }}
            role="dialog"
            aria-label="Lex AI Assistant Chat"
          >
            {/* Header */}
            <div className="bg-navy-800 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-400/20 rounded-full flex items-center justify-center">
                  <Scale size={20} className="text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{CHATBOT_CONFIG.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-xs text-white/60">{CHATBOT_CONFIG.tagline} • Online</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                >
                  {isMinimized ? <RotateCcw size={16} /> : <Minus size={16} />}
                </button>
                <button
                  onClick={closeChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages area */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
                  style={{ minHeight: '300px' }}
                >
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      <ChatMessage
                        message={message}
                        showTimestamp={
                          index === 0 ||
                          message.timestamp.getTime() - messages[index - 1].timestamp.getTime() > 60000
                        }
                      />
                      {/* Quick replies after assistant messages */}
                      {message.role === 'assistant' &&
                        message.quickReplies &&
                        message.quickReplies.length > 0 &&
                        index === messages.length - 1 && (
                          <div className="ml-10 mt-1">
                            <QuickReplies
                              replies={message.quickReplies}
                              onSelect={(reply) => sendMessage(reply)}
                              disabled={isLoading}
                            />
                          </div>
                        )}
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <ChatInput
                  input={input}
                  setInput={setInput}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  inputRef={inputRef as React.RefObject<HTMLInputElement>}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
