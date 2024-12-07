'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'

type RequirementTemplate = string;

interface AIChatProps {
  selectedTemplate: RequirementTemplate
  userFirstName: string
}

export default function AIChat({ selectedTemplate, userFirstName }: AIChatProps) {
  const initialMessage = `Hi ${userFirstName}, let me know how I can help you verify the ${selectedTemplate} document. You can view my abilities <a href="#" class="text-blue-500 hover:underline">here</a>.`
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: initialMessage, isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isAgentTyping, setIsAgentTyping] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleSend = (message: string) => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true }])
      setInput('')
      setIsAgentTyping(true)

      // Simulate AI response (replace with actual AI service call)
      setTimeout(() => {
        setIsAgentTyping(false)
        setMessages(prev => [...prev, { text: `AI response to: ${message}`, isUser: false }])
      }, 1000)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="mb-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-2">
        <h3 className="text-lg font-medium text-gray-700">Chat with your agent</h3>
      </div>
      {/* Chat messages */}
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 max-h-[600px] custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            {!msg.isUser && <GiBrain className="text-gray-500 mr-2 mt-1" size={20} />}
            <div className={`max-w-[70%] p-2 rounded-lg ${msg.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-[15px] whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          </div>
        ))}
        {isAgentTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center text-gray-500 text-sm">
              <GiBrain className="mr-2" size={16} />
              <span>Agent is typing</span>
              <span className="typing-animation ml-1">...</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend(input)
            }
          }}
          className="w-full border border-gray-300 rounded-md p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 min-h-[40px] max-h-[250px] resize-none overflow-y-auto scrollbar-hide hover:scrollbar-default"
          placeholder="Type with your agent to provide them with instructions..."
          rows={1}
        />
        <button
          onClick={() => handleSend(input)}
          className={`absolute right-3 bottom-3 transition-colors duration-150 ease-in-out ${input.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <FaRegPaperPlane size={20} />
        </button>
      </div>
    </div>
  )
}