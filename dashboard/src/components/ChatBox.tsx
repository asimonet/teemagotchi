// src/components/ChatBox.tsx
'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { ChatBubble } from './ChatBubble'
import { ChatInput }  from './ChatInput'

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; variant: 'in' | 'out' }>
  >([{ text: 'Posez moi une question', variant: 'out' }])

  // Send a question to the API
  const handleSend = useCallback(async (text: string) => {
    // 1. show outgoing bubble immediately
    setMessages(m => [...m, { text, variant: 'out' }])

    // 2. POST to /api/chat
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  }, [])

  // Poll for new responses every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/chat')
      if (res.status === 200) {
        const { text } = await res.json()
        // append only if it’s not already the last message
        setMessages(m => {
          if (m[m.length - 1]?.text === text) return m
          return [...m, { text, variant: 'out' }]
        })
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full bg-accent overflow-hidden">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-2">
        {messages.map((m, i) => (
          <ChatBubble key={i} text={m.text} variant={m.variant} />
        ))}
      </div>
      {/* Input */}
      <ChatInput onSend={handleSend} />
    </div>
  )
}
