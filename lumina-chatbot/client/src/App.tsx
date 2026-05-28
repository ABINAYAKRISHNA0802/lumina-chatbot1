import React from 'react'
import { ChatProvider, useChatContext } from './context/ChatContext'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'
import SuggestionsPanel from './components/SuggestionsPanel'

function Header() {
  const { clearChat, messages } = useChatContext()

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">L</span>
        </div>
        <h1 className="text-white font-semibold text-lg tracking-tight">Lumina</h1>
        <span className="text-gray-500 text-xs ml-1">AI Assistant</span>
      </div>
      {messages.length > 0 && (
        <button
          onClick={clearChat}
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors px-3 py-1 rounded-lg hover:bg-gray-800"
        >
          New chat
        </button>
      )}
    </header>
  )
}

function WelcomeScreen() {
  const { messages } = useChatContext()
  if (messages.length > 0) return null

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 pb-4">
      <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center mb-4">
        <span className="text-white text-2xl font-bold">L</span>
      </div>
      <h2 className="text-white text-2xl font-semibold mb-2">How can I help you?</h2>
      <p className="text-gray-500 text-sm text-center max-w-sm">
        Ask me anything — I can explain concepts, write code, compare technologies, and more.
      </p>
    </div>
  )
}

function ChatLayout() {
  const { messages } = useChatContext()

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      <Header />
      {messages.length === 0 ? (
        <>
          <WelcomeScreen />
          <SuggestionsPanel />
          <InputBar />
        </>
      ) : (
        <>
          <ChatWindow />
          <InputBar />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <ChatProvider>
      <ChatLayout />
    </ChatProvider>
  )
}
