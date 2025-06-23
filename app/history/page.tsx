"use client"

import { useState, useEffect } from "react"
import { Bot, Trash2, MessageSquare, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { loadChats, clearAllChats } from "@/utils/local-storage"

interface ChatSession {
  id: string
  messages: any[]
  timestamp: Date
  preview: string
}

export default function HistoryPage() {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])

  useEffect(() => {
    const chats = loadChats()
    setChatSessions(chats)
  }, [])

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all chat history? This cannot be undone.")) {
      clearAllChats()
      setChatSessions([])
    }
  }

  const handleDeleteSession = (sessionId: string) => {
    if (confirm("Delete this conversation?")) {
      const updatedSessions = chatSessions.filter((session) => session.id !== sessionId)
      setChatSessions(updatedSessions)
      localStorage.setItem("dr-ai-chat-history", JSON.stringify(updatedSessions))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chat History
            </h1>
          </Link>
          <div className="flex items-center space-x-2">
            {chatSessions.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearAll}
                className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
            <Link href="/">
              <Button variant="ghost" className="text-white/80 hover:text-white">
                Back to Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {chatSessions.length === 0 ? (
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardContent className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">No Chat History</h2>
              <p className="text-white/60 mb-6">Start a conversation with DR Ai to see your chat history here.</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Start Chatting
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Conversations ({chatSessions.length})</h2>
            </div>

            {chatSessions.map((session) => (
              <Card
                key={session.id}
                className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/15 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">{session.preview}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{session.messages.length} messages</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {session.messages.slice(0, 3).map((message, index) => (
                      <div key={index} className="text-sm">
                        <span
                          className={`font-medium ${message.role === "user" ? "text-blue-400" : "text-purple-400"}`}
                        >
                          {message.role === "user" ? "You" : "DR Ai"}:
                        </span>
                        <span className="text-white/70 ml-2">
                          {message.content.length > 100 ? message.content.substring(0, 100) + "..." : message.content}
                        </span>
                      </div>
                    ))}
                    {session.messages.length > 3 && (
                      <div className="text-xs text-white/50">... and {session.messages.length - 3} more messages</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
