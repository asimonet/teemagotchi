import { useEffect, useRef } from 'react'

export function useChatSSE(onMessage: (msg: { text: string }) => void) {
  const esRef = useRef<EventSource|null>(null)

  function send(text: string) {
    // close any existing stream
    esRef.current?.close()

    // open SSE stream
    // note: Next.js API routes need absolute URL in production
    const url = `/api/chat`
    esRef.current = new EventSource(url, { 
      withCredentials: false,
      // we want POST, so we construct a little trick:
      // SSE doesn’t support POST directly, but you can pass the text
      // in a query param or use fetch() to initialize.
    })

    // listen for messages
    esRef.current.onmessage = e => {
      const data = JSON.parse(e.data)
      onMessage(data)
    }

    // actually send the question
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
  }

  useEffect(() => () => esRef.current?.close(), [])
  return { send }
}
