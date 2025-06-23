"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Bot, Settings, History, UserCircle, Code, Sparkles, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ChatMessage } from "@/components/chat-message"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { generateResponse } from "@/utils/gemini-api"
import { saveChat, loadChats } from "@/utils/local-storage"

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
  const [apiKeyMissing, setApiKeyMissing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check if API key exists
    const apiKey = localStorage.getItem("gemini-api-key")
    setApiKeyMissing(!apiKey)

    // Load existing chat or show welcome message
    const existingChats = loadChats()
    if (existingChats.length > 0) {
      // Load the most recent chat
      setMessages(existingChats[0].messages)
    } else {
      // Show welcome message
      const welcomeMessage: Message = {
        id: "welcome-1",
        content:
          "🚀 **Welcome to DR Ai - Dream Architect Intelligence!**\n\n✨ **Code your dreams. Architect your future.**\n\nI'm your legendary digital companion, powered by Gemini LLM. Whether you're coding, creating, or exploring new ideas, I'm here to help transform your natural language prompts into intelligent conversations, code, and creative outputs.\n\n💡 **Get Started:**\n• Configure your Gemini API key in Settings\n• Ask me to help with coding, debugging, or creative projects\n• Explore different themes and customize your experience\n\nHow can I help you build something amazing today?",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const apiKey = localStorage.getItem("gemini-api-key")
    if (!apiKey) {
      setApiKeyMissing(true)
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setApiKeyMissing(false)

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
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "⚠️ I'm having trouble connecting right now. This could be due to:\n\n• Invalid or expired API key\n• Network connectivity issues\n• API rate limits\n\n💡 **Solutions:**\n• Check your Gemini API key in Settings\n• Verify your internet connection\n• Try again in a few moments\n\nGet your free API key from Google AI Studio and configure it in Settings.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: "new-chat-1",
        content:
          "🆕 **New conversation started!**\n\nI'm ready to help you code, create, and architect your next big idea. What would you like to work on?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-purple-400" />
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                DR Ai
              </h1>
              <p className="text-xs text-white/60 hidden sm:block">Dream Architect Intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hidden sm:flex"
            >
              New Chat
            </Button>
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

      {/* Tagline Banner */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-2 text-center">
          <p className="text-sm font-medium bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            <Code className="w-4 h-4 inline mr-2" />
            Code your dreams. Architect your future.
          </p>
        </div>
      </div>

      {/* API Key Warning */}
      {apiKeyMissing && (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Alert className="bg-yellow-500/10 border-yellow-500/20">
            <AlertCircle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>API Key Required:</strong> Please configure your Gemini API key in{" "}
              <Link href="/settings" className="underline hover:text-yellow-100">
                Settings
              </Link>{" "}
              to start chatting. Get your free key from{" "}
              <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-100"
              >
                Google AI Studio
              </a>
              .
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-280px)] backdrop-blur-md bg-white/10 border-white/20 flex flex-col">
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
                <span className="text-sm">DR Ai is architecting your response...</span>
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
                placeholder={
                  apiKeyMissing
                    ? "Configure API key in Settings first..."
                    : "Ask DR Ai to code, create, or architect anything..."
                }
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                disabled={isLoading || apiKeyMissing}
                maxLength={2000}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim() || apiKeyMissing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex items-center justify-between mt-2 text-xs text-white/40">
              <div className="flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                Powered by Gemini LLM • Built for developers, creators & digital visionaries
              </div>
              <div>{input.length}/2000</div>
            </div>
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
          <div className="text-center mt-4 text-xs text-white/40">
            © 2024 DR Ai - Dream Architect Intelligence • Your legendary digital companion
          </div>
        </div>
      </footer>

      {/* WhatsApp Contact Button */}
      <WhatsAppContact />
    </div>
  )
}
