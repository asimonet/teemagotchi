'use client'
import React, { useState, useCallback } from 'react'
import { ChatBubble }  from './ChatBubble'
import { ChatInput }   from './ChatInput'
import { useChatSSE }   from '@/hooks/useChatSSE'

export const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{ text: string; variant: 'in' | 'out' }>
  >([{ text: 'Posez moi une question', variant: 'out' }])

  const onMsg = useCallback((msg: { text: string }) => {
    setMessages(m => [...m, { text: msg.text, variant: 'in' }])
  }, [])

  const { send } = useChatSSE(onMsg)

  const handleSend = (text: string) => {
    setMessages(m => [...m, { text, variant: 'in' }])
    send(text)
  }

  return (
    <div className="flex flex-col h-full bg-accent overflow-hidden">
      {/* Messages scrollable */}
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
