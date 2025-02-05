'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { AppHero } from '../ui/ui-layout'

export function DoulaChat() {
  const [message, setMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([])
  const { publicKey } = useWallet()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) return
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }])
    
    // TODO: Integrate with AI model API
    // For now, using placeholder response
    const doulaResponse = "Thank you for your question. As your AI doula, I'm here to support you. [Placeholder response]"
    
    setChatHistory(prev => [...prev, { role: 'doula', content: doulaResponse }])
    setMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="chat-container min-h-[400px] bg-base-200 rounded-lg p-4 mb-4">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input input-bordered flex-1"
          placeholder="Ask your doula a question..."
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
} 