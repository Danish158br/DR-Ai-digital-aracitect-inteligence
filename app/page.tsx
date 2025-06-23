"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Bot, Settings, History, UserCircle, Code, Sparkles, Zap, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ChatMessage } from "@/components/chat-message"
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
          "🚀 **Welcome to DR Ai - Dream Architect Intelligence**\n\n✨ **Code your dreams. Architect your future.**\n\nI'm your legendary digital companion, designed to transform your ideas into reality. Whether you're architecting complex systems, crafting innovative solutions, or exploring the frontiers of technology, I'm here to amplify your creative potential.\n\n🎯 **What I can help you with:**\n• Advanced code generation and optimization\n• System architecture and design patterns\n• Creative problem-solving and innovation\n• Technical documentation and analysis\n• Future-tech exploration and planning\n\nReady to architect the future together?",
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
          "⚠️ **Connection Error**\n\nI'm experiencing connectivity issues. This could be due to:\n\n• Network connectivity problems\n• Service temporarily unavailable\n• Configuration issues\n\n🔧 **Quick Solutions:**\n• Check your internet connection\n• Verify your API configuration in the API Integration page\n• Try again in a few moments\n\nI'll be back online shortly to continue architecting your dreams!",
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
          "🆕 **New Architecture Session Initiated**\n\nFresh canvas, infinite possibilities. What groundbreaking project shall we architect today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                DR Ai
              </h1>
              <p className="text-sm text-purple-300/80 font-medium">Dream Architect Intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30 hidden sm:flex"
            >
              <Zap className="w-4 h-4 mr-2" />
              New Session
            </Button>
            <ThemeSwitcher />
            <Link href="/history">
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
                <History className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
                <UserCircle className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Futuristic Tagline Banner */}
      <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-lg font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            <Code className="w-5 h-5 inline mr-2" />
            Code your dreams. Architect your future.
          </p>
        </div>
      </div>

      {/* API Configuration Alert */}
      {apiKeyMissing && (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Alert className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30 backdrop-blur-sm">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <AlertDescription className="text-yellow-200">
              <strong>AI Integration Required:</strong> Configure your AI service in{" "}
              <Link href="/api-integration" className="underline hover:text-yellow-100 font-semibold">
                API Integration
              </Link>{" "}
              to unlock the full potential of DR Ai.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-5xl relative z-10">
        <Card className="h-[calc(100vh-320px)] backdrop-blur-xl bg-black/20 border-purple-500/30 flex flex-col shadow-2xl">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center space-x-3 text-purple-300/80">
                <div className="relative">
                  <Bot className="w-6 h-6 animate-pulse" />
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping"></div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-sm font-medium">Architecting your response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="p-6 border-t border-purple-500/20 bg-gradient-to-r from-purple-900/10 to-pink-900/10">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  apiKeyMissing
                    ? "Configure AI integration to start architecting..."
                    : "Describe your vision, and I'll help architect it into reality..."
                }
                className="flex-1 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 text-lg py-6"
                disabled={isLoading || apiKeyMissing}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim() || apiKeyMissing}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 disabled:opacity-50 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-purple-500/25"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <div className="flex items-center justify-center mt-4 text-sm text-purple-300/60">
              <Sparkles className="w-4 h-4 mr-2" />
              Advanced AI Architecture • Built for visionaries and innovators
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Navigation */}
      <footer className="mt-8 py-8 border-t border-purple-500/20 backdrop-blur-xl bg-black/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-purple-300/80">
            <Link href="/about" className="hover:text-white transition-colors font-medium">
              About
            </Link>
            <Link href="/api-integration" className="hover:text-white transition-colors font-medium">
              API Integration
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors font-medium">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors font-medium">
              Privacy
            </Link>
            <Link href="/policy" className="hover:text-white transition-colors font-medium">
              Policy
            </Link>
          </div>
          <div className="text-center mt-6 text-sm text-purple-400/60">
            © 2025 DR Ai - Dream Architect Intelligence • Shaping tomorrow's digital landscape
          </div>
        </div>
      </footer>
    </div>
  )
}
