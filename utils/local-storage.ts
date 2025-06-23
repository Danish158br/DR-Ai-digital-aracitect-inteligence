interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface ChatSession {
  id: string
  messages: Message[]
  timestamp: Date
  preview: string
}

export function saveChat(messages: Message[]) {
  if (messages.length < 2) return // Don't save single message chats

  const chatSessions = loadChats()
  const userMessage = messages.find((m) => m.role === "user")

  const newSession: ChatSession = {
    id: Date.now().toString(),
    messages,
    timestamp: new Date(),
    preview: userMessage ? userMessage.content.substring(0, 50) + "..." : "New Chat",
  }

  chatSessions.unshift(newSession)

  // Keep only last 50 chat sessions
  if (chatSessions.length > 50) {
    chatSessions.splice(50)
  }

  localStorage.setItem("dr-ai-chat-history", JSON.stringify(chatSessions))
}

export function loadChats(): ChatSession[] {
  try {
    const stored = localStorage.getItem("dr-ai-chat-history")
    if (!stored) return []

    const sessions = JSON.parse(stored)
    return sessions.map((session: any) => ({
      ...session,
      timestamp: new Date(session.timestamp),
      messages: session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
    }))
  } catch (error) {
    console.error("Error loading chat history:", error)
    return []
  }
}

export function clearAllChats() {
  localStorage.removeItem("dr-ai-chat-history")
}

export function saveUserProfile(profile: any) {
  localStorage.setItem("dr-ai-profile", JSON.stringify(profile))
}

export function loadUserProfile() {
  try {
    const stored = localStorage.getItem("dr-ai-profile")
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading user profile:", error)
    return null
  }
}
