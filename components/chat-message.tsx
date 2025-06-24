"use client"

import { User, Download, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  image?: string
  type?: "text" | "image" | "code"
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)

  const downloadImage = (imageUrl: string) => {
    const a = document.createElement("a")
    a.href = imageUrl
    a.download = `dr-ai-image-${Date.now()}.jpg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-end space-x-2 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-md ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <div className="w-5 h-5 rounded-lg overflow-hidden">
              <Image src="/dr-ai-logo.jpg" alt="DR Ai" width={20} height={20} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div className="relative group">
          {/* Image Content */}
          {message.image && (
            <div className="mb-2 relative">
              <img
                src={message.image || "/placeholder.svg"}
                alt="Uploaded content"
                className="max-w-full max-h-64 rounded-2xl shadow-lg"
                loading="lazy"
              />
              <Button
                onClick={() => downloadImage(message.image!)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full w-8 h-8 p-0"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Text Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl backdrop-blur-md shadow-lg relative ${
              isUser
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-primary"
                : "bg-white/10 border border-white/20 text-primary"
            } ${isUser ? "rounded-br-md" : "rounded-bl-md"}`}
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>

            {/* Message Actions */}
            <div className="flex items-center justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-xs text-muted">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {!isUser && (
                <button
                  onClick={() => copyToClipboard(message.content)}
                  className="text-muted hover:text-primary p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
