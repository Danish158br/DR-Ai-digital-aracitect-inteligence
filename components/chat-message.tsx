import { Bot, User } from "lucide-react"
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
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-purple-500 to-pink-500"
          }`}
        >
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
        </div>

        <Card
          className={`p-3 backdrop-blur-md border-white/20 ${
            isUser ? "bg-blue-500/20 text-white" : "bg-white/10 text-white"
          }`}
        >
          <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
          <div className="text-xs text-white/50 mt-2">{message.timestamp.toLocaleTimeString()}</div>
        </Card>
      </div>
    </div>
  )
}
