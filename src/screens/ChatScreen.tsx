/**
 * screens/ChatScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The "uMama AI" tab — a chat UI with a seeded example conversation
 * (see `data/chatData.ts`) plus a text input and four "quick question"
 * chips that pre-fill the input.
 *
 * IMPORTANT: there is no real AI/backend integration here. `send()`
 * always appends the exact same canned reply regardless of what the user
 * typed. This is a UI prototype of the chat experience, not a working
 * assistant.
 *
 * TO PERSONALISE / MAKE FUNCTIONAL: replace the hardcoded string in
 * `send()` with a call to a real chat/LLM API (passing `messages` as
 * conversation history), and consider a loading/typing-indicator state
 * while awaiting a response.
 */
import { useState } from 'react'
import { UMamaIcon } from '../components/UMamaIcon'
import { initialMessages } from '../data/chatData'
import type { Translations } from '../types'

interface ChatScreenProps {
  tr: Translations
}

export function ChatScreen({ tr }: ChatScreenProps) {
  // Seed the transcript, substituting the translated intro for the first
  // (bot) message's empty placeholder text.
  const [messages, setMessages] = useState(
    initialMessages.map((m, i) => ({
      ...m,
      text: i === 0 ? tr.chatIntro : m.text,
    })),
  )
  const [input, setInput] = useState('')

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [
      ...prev,
      { from: 'user', text: userMsg },
      // Canned reply — see file header. Not a real AI response.
      { from: 'bot', text: "Thank you for sharing. I'm here to help. Please consult a healthcare professional for a proper diagnosis. Would you like me to find a nearby clinic?" },
    ])
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.from === 'bot' && (
              <div className="w-7 h-7 rounded-full mr-2 flex-shrink-0 mt-1 border-2 border-blush-200 bg-blush-500 flex items-center justify-center overflow-hidden">
                <UMamaIcon size={28} />
              </div>
            )}
            <div
              className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
              ${
                msg.from === 'user'
                  ? 'bg-blush-500 text-white rounded-br-sm'
                  : 'bg-white text-gray-700 rounded-bl-sm border border-blush-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-blush-100 bg-white">
        <div className="flex gap-2 items-end">
          <input
            className="flex-1 bg-blush-50 border border-blush-200 rounded-2xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blush-400 placeholder:text-gray-400"
            placeholder={tr.chatPlaceholder}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button
            onClick={send}
            className="w-10 h-10 rounded-full bg-blush-500 flex items-center justify-center shadow-md hover:bg-blush-600 transition-colors flex-shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L14 2L8 8L14 14L2 8Z" fill="white" />
            </svg>
          </button>
        </div>
        {/* Quick-question chips — tapping one just fills the input, it doesn't auto-send */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {['Cramps', 'Irregular cycle', 'Heavy bleeding', 'Find clinic'].map(q => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="text-xs px-3 py-1 rounded-full bg-blush-50 text-blush-600 border border-blush-200 hover:bg-blush-100 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
