import React, { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios'
import { Message, ChatRequest, ChatResponse } from '../types'

interface ChatContextValue {
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const history = [...messages, userMessage].map(({ role, content }) => ({
        role,
        content,
      }))

      const payload: ChatRequest = { messages: history }
      const { data } = await axios.post<ChatResponse>(`${API_URL}/api/chat`, payload)

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearChat = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within a ChatProvider')
  return ctx
}
