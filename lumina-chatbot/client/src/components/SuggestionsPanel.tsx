import React from 'react'
import { useChatContext } from '../context/ChatContext'

const SUGGESTIONS = [
  'Explain how React hooks work',
  'Write a Python function to sort a list',
  'What is the difference between SQL and NoSQL',
  'Give me 5 tips for clean code',
]

export default function SuggestionsPanel() {
  const { messages, sendMessage } = useChatContext()

  if (messages.length > 0) return null

  return (
    <div className="px-4 pb-4">
      <p className="text-gray-500 text-xs text-center mb-3 uppercase tracking-wider">
        Try asking…
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SUGGESTIONS.map((text) => (
          <button
            key={text}
            onClick={() => sendMessage(text)}
            className="text-left px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm border border-gray-700 hover:border-purple-500 transition-all duration-150"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
