import { Bot, User, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`flex items-start space-x-4 max-w-[85%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center relative shadow-lg ${
            isUser
              ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-500/25"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 shadow-purple-500/25"
          }`}
        >
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-white" />
              <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-optimized-pulse" />
            </>
          )}
        </div>

        <Card
          className={`p-6 card-bg shadow-xl border-opacity-50 ${
            isUser
              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30"
              : "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-purple-500/30"
          }`}
        >
          <div className="text-base leading-relaxed whitespace-pre-wrap font-medium text-primary text-enhanced">
            {message.content}
          </div>
          <div className="text-xs text-muted mt-4 font-medium">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </Card>
      </div>
    </div>
  )
}
