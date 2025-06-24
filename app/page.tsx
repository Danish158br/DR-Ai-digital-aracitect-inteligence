"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  Send,
  Settings,
  History,
  UserCircle,
  Sparkles,
  Upload,
  Download,
  ImageIcon,
  Loader2,
  AlertCircle,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ChatMessage } from "@/components/chat-message"
import { generateResponse } from "@/utils/gemini-api"
import { saveChat, loadChats } from "@/utils/local-storage"
import Image from "next/image"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  image?: string
  type?: "text" | "image" | "code"
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY || localStorage.getItem("gemini-api-key")
    setHasApiKey(!!apiKey)
  }, [])

  const welcomeMessage = useMemo(
    () => ({
      id: "welcome-1",
      content: `🚀 **Welcome to DR Ai - Dream Architect Intelligence**

✨ **Code your dreams. Architect your future.**

I'm your legendary digital companion, designed to transform your ideas into reality. Whether you're architecting complex systems, crafting innovative solutions, or exploring the frontiers of technology, I'm here to amplify your creative potential.

🎯 **What I can help you with:**
• **Advanced code generation** and optimization
• **System architecture** and design patterns  
• **Creative problem-solving** and innovation
• **Technical documentation** and analysis
• **Image analysis** and visual understanding
• **File processing** and content generation

Ready to architect the future together? ${hasApiKey ? "Let's start building!" : "Configure your API key in Settings to unlock full capabilities."}`,
      role: "assistant" as const,
      timestamp: new Date(),
    }),
    [hasApiKey],
  )

  useEffect(() => {
    const existingChats = loadChats()
    if (existingChats.length > 0) {
      setMessages(existingChats[0].messages)
    } else {
      setMessages([welcomeMessage])
    }
  }, [welcomeMessage])

  const handleImageUpload = useCallback((file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleImageUpload(file)
      }
    },
    [handleImageUpload],
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      const file = e.dataTransfer.files?.[0]
      if (file) {
        handleImageUpload(file)
      }
    },
    [handleImageUpload],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if ((!input.trim() && !selectedImage) || isLoading || !hasApiKey) return

      setError(null)
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input.trim() || "Please analyze this image",
        role: "user",
        timestamp: new Date(),
        image: selectedImage || undefined,
        type: selectedImage ? "image" : "text",
      }

      setMessages((prev) => [...prev, userMessage])
      setInput("")
      setSelectedImage(null)
      setIsLoading(true)

      try {
        const response = await generateResponse(input.trim() || "Please analyze this image", selectedImage || undefined)

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: "assistant",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => {
          const newMessages = [...prev, assistantMessage]
          saveChat(newMessages)
          return newMessages
        })
      } catch (error) {
        console.error("Chat error:", error)
        setError(error instanceof Error ? error.message : "Failed to get response")
      } finally {
        setIsLoading(false)
      }
    },
    [input, selectedImage, isLoading, hasApiKey],
  )

  const handleNewChat = useCallback(() => {
    setMessages([welcomeMessage])
    setInput("")
    setSelectedImage(null)
    setError(null)
  }, [welcomeMessage])

  const downloadImage = useCallback(() => {
    if (!selectedImage) return

    const a = document.createElement("a")
    a.href = selectedImage
    a.download = `dr-ai-image-${Date.now()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [selectedImage])

  const canSend = hasApiKey && (input.trim() || selectedImage) && !isLoading

  return (
    <div
      className="h-screen overflow-hidden flex flex-col relative"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      {/* Drag Overlay */}
      {dragActive && (
        <div className="fixed inset-0 z-50 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl">
            <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-primary text-center">Drop your image here</p>
            <p className="text-muted text-center mt-2">I'll analyze it for you</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 bg-white/5 backdrop-blur-md border-b border-white/10 relative z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-secondary hover:text-primary lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/dr-ai-logo.jpg"
                  alt="DR Ai"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  DR Ai
                </h1>
                <p className="text-xs text-secondary">Dream Architect Intelligence</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="text-secondary hover:text-primary hidden sm:flex"
            >
              New Chat
            </Button>
            <ThemeSwitcher />
            <div className="hidden lg:flex items-center space-x-1">
              <Link href="/history">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <History className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <UserCircle className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* API Key Warning */}
        {!hasApiKey && (
          <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20">
            <div className="flex items-center space-x-2 text-yellow-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Configure your API key in Settings for full functionality</span>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white/10 backdrop-blur-md border-l border-white/20 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-primary">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Link href="/history" onClick={() => setSidebarOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  <History className="w-4 h-4 mr-3" />
                  History
                </Button>
              </Link>
              <Link href="/profile" onClick={() => setSidebarOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  <UserCircle className="w-4 h-4 mr-3" />
                  Profile
                </Button>
              </Link>
              <Link href="/settings" onClick={() => setSidebarOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-secondary hover:text-primary">
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Messages Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-md overflow-hidden">
                    <Image
                      src="/dr-ai-logo.jpg"
                      alt="DR Ai"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-sm text-secondary">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-500/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-red-500/20 max-w-md">
                <div className="flex items-center space-x-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Integrated into chat container */}
        <div className="flex-shrink-0 bg-white/5 backdrop-blur-md border-t border-white/10 p-4">
          {/* Image Preview */}
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected for analysis"
                className="max-w-20 max-h-20 rounded-xl shadow-lg"
              />
              <Button
                onClick={() => setSelectedImage(null)}
                size="sm"
                variant="destructive"
                className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
              >
                ×
              </Button>
              <Button
                onClick={downloadImage}
                size="sm"
                variant="ghost"
                className="absolute -bottom-2 -left-2 w-6 h-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white"
              >
                <Download className="w-3 h-3" />
              </Button>
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-secondary hover:text-primary p-3"
                  disabled={isLoading}
                >
                  <ImageIcon className="w-5 h-5" />
                </Button>

                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={hasApiKey ? "Message DR Ai..." : "Configure API key in Settings to start chatting..."}
                  className="flex-1 border-0 bg-transparent text-primary placeholder:text-muted focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-2"
                  disabled={isLoading || !hasApiKey}
                  maxLength={2000}
                />

                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={!canSend}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl p-3 shadow-lg"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </form>

          {/* Footer */}
          <div className="flex items-center justify-center mt-3 text-xs text-muted">
            <Sparkles className="w-3 h-3 mr-2" />
            <span>Built for visionaries and innovators</span>
          </div>
        </div>
      </div>
    </div>
  )
}
