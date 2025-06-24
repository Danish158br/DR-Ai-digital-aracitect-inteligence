"use client"

import { User, Download, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`flex items-start space-x-4 max-w-[85%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-lg ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-500"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          }`}
        >
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <div className="w-8 h-8 rounded-xl overflow-hidden">
              <Image src="/dr-ai-logo.jpg" alt="DR Ai" width={32} height={32} className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <Card className="card-bg shadow-xl relative group max-w-full">
          <CardContent className="p-6">
            {/* Image Content */}
            {message.image && (
              <div className="mb-4 relative">
                <img
                  src={message.image || "/placeholder.svg"}
                  alt="Uploaded content"
                  className="max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
                <Button
                  onClick={() => downloadImage(message.image!)}
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Download image"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Text Content */}
            <div className="text-base leading-relaxed whitespace-pre-wrap font-medium text-primary">
              {message.content}
            </div>

            {/* Message Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-muted font-medium">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>

              {!isUser && (
                <Button
                  onClick={() => copyToClipboard(message.content)}
                  size="sm"
                  variant="ghost"
                  className="text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Copy message"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
