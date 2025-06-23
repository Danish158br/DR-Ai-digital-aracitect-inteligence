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

interface UserProfile {
  name: string
  bio: string
  avatar: string
  joinDate: string
}

interface AppSettings {
  theme: string
  fontSize: number
  soundEnabled: boolean
  animationsEnabled: boolean
  memoryEnabled: boolean
}

export function saveChat(messages: Message[]) {
  try {
    if (messages.length < 2) return // Don't save single message chats

    const chatSessions = loadChats()
    const userMessage = messages.find((m) => m.role === "user")

    const newSession: ChatSession = {
      id: Date.now().toString(),
      messages: messages.map((msg) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })),
      timestamp: new Date(),
      preview: userMessage ? userMessage.content.substring(0, 50) + "..." : "New Chat",
    }

    chatSessions.unshift(newSession)

    // Keep only last 50 chat sessions
    if (chatSessions.length > 50) {
      chatSessions.splice(50)
    }

    localStorage.setItem("dr-ai-chat-history", JSON.stringify(chatSessions))
  } catch (error) {
    console.error("Error saving chat:", error)
  }
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
  try {
    localStorage.removeItem("dr-ai-chat-history")
  } catch (error) {
    console.error("Error clearing chats:", error)
  }
}

export function saveUserProfile(profile: UserProfile) {
  try {
    localStorage.setItem("dr-ai-profile", JSON.stringify(profile))
  } catch (error) {
    console.error("Error saving user profile:", error)
  }
}

export function loadUserProfile(): UserProfile | null {
  try {
    const stored = localStorage.getItem("dr-ai-profile")
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading user profile:", error)
    return null
  }
}

export function saveAppSettings(settings: AppSettings) {
  try {
    localStorage.setItem("dr-ai-settings", JSON.stringify(settings))
  } catch (error) {
    console.error("Error saving app settings:", error)
  }
}

export function loadAppSettings(): AppSettings | null {
  try {
    const stored = localStorage.getItem("dr-ai-settings")
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Error loading app settings:", error)
    return null
  }
}
