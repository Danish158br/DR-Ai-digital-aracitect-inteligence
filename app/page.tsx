"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import {
  Send,
  Bot,
  Settings,
  History,
  UserCircle,
  Code,
  Sparkles,
  Zap,
  Upload,
  Download,
  ImageIcon,
  Wand2,
  Loader2,
  AlertCircle,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ChatMessage } from "@/components/chat-message"
import { generateAIResponse, checkServerApiKey } from "@/app/actions/gemini"
import { generateResponseWithUserKey } from "@/utils/gemini-api"
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
  const [hasServerApiKey, setHasServerApiKey] = useState(false)
  const [hasUserApiKey, setHasUserApiKey] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    const checkKeys = async () => {
      const serverKey = await checkServerApiKey()
      const userKey = !!localStorage.getItem("gemini-api-key")
      setHasServerApiKey(serverKey)
      setHasUserApiKey(userKey)
    }

    checkKeys()

    const handleStorageChange = () => {
      const userKey = !!localStorage.getItem("gemini-api-key")
      setHasUserApiKey(userKey)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const hasAnyApiKey = hasServerApiKey || hasUserApiKey

  const welcomeMessage = useMemo(
    () => ({
      id: "welcome-1",
      content: `**Welcome to DR Ai — Dream Architect Intelligence**

🎨 _"Complete your dreams with code. Architect the impossible."_

I'm your personal **Legendary Digital Architect**, designed to **transform your ideas into real working software** — whether it's a full website, mobile app, or whatever your dream.

---

🧠 **Core Functionalities:**
• 🧩 **Generate any code** — from frontend to backend (HTML, React, Next.js, PHP, Node, Flutter, Kotlin, etc.)
• 🗺️ **Create complete maps of websites or apps** — layout, routes, API structure
• 📱 **Auto-generate full APK apps** — with working UI, logic, and exportable code
• 🧠 **AI-powered tutor** — explain, debug, and teach any concept step-by-step
• 🖼️ **Image-to-code & analysis** — upload an image and let DR Ai process or code it
• 🔄 **File conversion & understanding** — convert .pdf, .xml, .zip, .txt, and analyze the contents
• 📂 **Download your chats, code, images** — full export system built-in
• ♥️ **Multi-modal interactions** — seamlessly combine text, images, and other file types for advanced AI processing.`,
      role: "assistant" as const,
      timestamp: new Date(),
    }),
    [hasAnyApiKey],
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
      if ((!input.trim() && !selectedImage) || isLoading) return

      setError(null)
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input.trim() || (selectedImage ? "Please analyze this image" : ""),
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
        let response: string

        if (hasServerApiKey) {
          response = await generateAIResponse(
            input.trim() || (selectedImage ? "Please analyze this image" : ""),
            selectedImage || undefined,
          )
        } else if (hasUserApiKey) {
          response = await generateResponseWithUserKey(
            input.trim() || (selectedImage ? "Please analyze this image" : ""),
            selectedImage || undefined,
          )
        } else {
          throw new Error("No API key configured. Please set up your API key in Settings.")
        }

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
        setError(error instanceof Error ? error.message : "Failed to get response. Please try again.")
      } finally {
        setIsLoading(false)
      }
    },
    [input, selectedImage, isLoading, hasServerApiKey, hasUserApiKey],
  )

  const handleNewChat = useCallback(() => {
    setMessages([welcomeMessage])
    setInput("")
    setSelectedImage(null)
    setError(null)
  }, [welcomeMessage])

  const downloadChat = useCallback(() => {
    if (messages.length === 0) return

    const chatContent = messages.map((msg) => `${msg.role === "user" ? "You" : "DR Ai"}: ${msg.content}`).join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `dr-ai-chat-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [messages])

  const downloadImage = useCallback(() => {
    if (!selectedImage) return

    const a = document.createElement("a")
    a.href = selectedImage
    a.download = `dr-ai-image-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [selectedImage])

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid pointer-events-none"></div>

      {/* Drag Overlay */}
      {dragActive && (
        <div className="fixed inset-0 z-50 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center">
          <div className="card-bg p-8 rounded-2xl border-2 border-dashed border-purple-400">
            <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-primary text-center">Drop your image here</p>
            <p className="text-muted text-center mt-2">I'll analyze it for you</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex-shrink-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative gpu-accelerated">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-2 ring-purple-400/30">
                <Image
                  src="/dr-ai-logo.jpg"
                  alt="DR Ai Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                DR Ai
              </h1>
              <p className="text-xs text-secondary font-medium">Dream Architect Intelligence</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              onClick={handleNewChat}
              variant="ghost"
              size="sm"
              className="text-secondary hover:text-primary border border-white/20 hover:border-white/40 hidden sm:flex focus-ring glass-button transition-all duration-200"
              aria-label="Start new chat session"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            <Button
              onClick={downloadChat}
              variant="ghost"
              size="sm"
              className="text-secondary hover:text-primary focus-ring glass-button transition-all duration-200"
              disabled={messages.length <= 1}
              aria-label="Download chat history"
            >
              <Download className="w-4 h-4" />
            </Button>

            <ThemeSwitcher />

            <Link href="/history" aria-label="View chat history">
              <Button variant="ghost" size="sm" className="text-secondary hover:text-primary focus-ring glass-button transition-all duration-200">
                <History className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/profile" aria-label="View profile">
              <Button variant="ghost" size="sm" className="text-secondary hover:text-primary focus-ring glass-button transition-all duration-200">
                <UserCircle className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/settings" aria-label="Open settings">
              <Button variant="ghost" size="sm" className="text-secondary hover:text-primary focus-ring glass-button transition-all duration-200">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Tagline Banner */}
      <div className="flex-shrink-0 card-bg border-b border-white/20">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-base md:text-lg font-semibold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            <Wand2 className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
            Architect the impossible.
          </p>
        </div>
      </div>

      {/* API Integration Notice */}
      {!hasAnyApiKey && (
        <div className="flex-shrink-0 card-bg border-b border-white/20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-2 text-yellow-400">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                AI Integration Required: Configure your AI service in{" "}
                <Link href="/settings" className="underline hover:text-yellow-300 transition-colors">
                  API Integration
                </Link>{" "}
                to unlock the full potential of DR Ai.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area (Chat Messages and Input) */}
      <div className="flex-1 overflow-hidden relative max-w-full">
        <div className="container mx-auto px-4 py-6 max-w-6xl h-full flex flex-col relative z-10">
          <Card className="flex-1 card-bg flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {messages.map((message) => (
                <div key={message.id} className="max-w-[100%] overflow-x-hidden">
                  <ChatMessage message={message} />
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center space-x-3 text-secondary px-4 py-2" role="status" aria-live="polite">
                  <div className="relative">
                    <Bot className="w-6 h-6 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full animate-ping"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                    <span className="text-sm font-medium">Architecting your response...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center px-4">
                  <div className="bg-red-500/10 backdrop-blur-md rounded-xl px-4 py-3 border border-red-500/20 max-w-md">
                    <div className="flex items-center space-x-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Section */}
            <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm">
              {/* Image Preview */}
              {selectedImage && (
                <div className="px-6 pt-4 pb-2">
                  <div className="relative inline-block">
                    <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/20">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected for analysis"
                        className="max-w-32 max-h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <Button
                      onClick={() => setSelectedImage(null)}
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 w-7 h-7 p-0 rounded-full shadow-lg border border-white/20 transition-all duration-200 hover:scale-110"
                      aria-label="Remove selected image"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={downloadImage}
                      size="icon"
                      variant="ghost"
                      className="absolute -bottom-2 -left-2 w-7 h-7 p-0 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all duration-200 hover:scale-110"
                      aria-label="Download image"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Input Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="flex items-end gap-3">
                  {/* File Upload Button */}
                  <div className="flex-shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-11 h-11 text-secondary hover:text-primary focus-ring glass-button transition-all duration-200 hover:scale-105 border border-white/20 hover:border-white/40"
                      aria-label="Upload image"
                      disabled={isLoading}
                    >
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Select image file"
                  />

                  {/* Text Input Container */}
                  <div className="flex-1 relative">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        hasAnyApiKey
                          ? "Architect your vision... Type your message here"
                          : "Configure AI integration to start architecting..."
                      }
                      className="w-full input-bg text-primary text-base py-3 px-4 pr-12 focus-ring glass-input border border-white/20 hover:border-white/30 focus:border-purple-400/50 rounded-xl transition-all duration-200 min-h-[44px] resize-none"
                      disabled={isLoading || !hasAnyApiKey}
                      aria-label="Chat input"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                    />
                    
                    {/* Character count or status indicator */}
                    {input.length > 0 && (
                      <div className="absolute right-3 bottom-1 text-xs text-secondary/60">
                        {input.length}
                      </div>
                    )}
                  </div>

                  {/* Send Button */}
                  <div className="flex-shrink-0">
                    <Button
                      type="submit"
                      size="icon"
                      className={`w-11 h-11 transition-all duration-200 focus-ring ${
                        (!input.trim() && !selectedI
