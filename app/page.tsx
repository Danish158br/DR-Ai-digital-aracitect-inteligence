"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Bot, Settings, History, UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ChatMessage } from "@/components/chat-message"
import { generateResponse } from "@/utils/gemini-api"
import { saveChat } from "@/utils/local-storage"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load welcome message
    const welcomeMessage: Message = {
      id: "1",
      content: "Hello! I'm DR Ai, your Dream Architect Intelligence assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await generateResponse(input.trim())
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => {
        const newMessages = [...prev, assistantMessage]
        saveChat(newMessages)
        return newMessages
      })
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I apologize, but I'm having trouble connecting right now. Please check your API key in settings and try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <History className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <UserCircle className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] backdrop-blur-md bg-white/10 border-white/20 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-2 text-white/60">
                <Bot className="w-5 h-5 animate-pulse" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-4 border-t border-white/20">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask DR Ai anything..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Footer Navigation */}
      <footer className="mt-8 py-6 border-t border-white/20 backdrop-blur-md bg-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/policy" className="hover:text-white transition-colors">
              Policy
            </Link>
          </div>
          <div className="text-center mt-4 text-xs text-white/40">© 2024 DR Ai - Dream Architect Intelligence</div>
        </div>
      </footer>
    </div>
  )
}
