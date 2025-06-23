import { Bot, Sparkles, Zap, Shield, Code, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WhatsAppContact } from "@/components/whatsapp-contact"

export const metadata = {
  title: "About DR Ai - Dream Architect Intelligence | Code your dreams. Architect your future.",
  description:
    "Learn about DR Ai, a futuristic AI chatbot powered by Gemini LLM, designed for developers, creators, and digital visionaries. Transform natural language into intelligent conversations, code, and creative outputs.",
  openGraph: {
    title: "About DR Ai - Dream Architect Intelligence",
    description:
      "Futuristic AI chatbot powered by Gemini LLM for developers, creators, and digital visionaries. Code your dreams. Architect your future.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-16 h-16 text-purple-400 mr-4" />
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            DR Ai
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white/90">Dream Architect Intelligence</h2>
          <p className="text-xl md:text-2xl font-medium mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            "Code your dreams. Architect your future."
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
            DR Ai is a futuristic, mobile-first, full-stack chatbot web application powered by Gemini LLM, designed for
            developers, creators, and digital visionaries. Transform natural language prompts into intelligent
            conversations, code, and creative outputs – all within a sleek, glassmorphism UI.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span>Intelligent Conversations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                Powered by Google's advanced Gemini LLM, DR Ai provides intelligent, context-aware responses to help you
                with coding, creative writing, problem-solving, and architectural planning.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Zap className="w-6 h-6 text-yellow-400" />
                <span>Lightning Fast</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                Experience rapid response times with our optimized architecture. Get answers instantly without
                compromising on quality or accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="w-6 h-6 text-green-400" />
                <span>Privacy First</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                Your conversations are stored locally in your browser. We prioritize your privacy and don't store your
                personal data on our servers.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Bot className="w-6 h-6 text-blue-400" />
                <span>Customizable Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                Choose from multiple themes including Glassmorphism, Dark, Neon, and Light modes. Customize your profile
                and chat preferences.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center">
              <Code className="w-6 h-6 mr-2 text-purple-400" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-center">
            <p className="text-lg leading-relaxed mb-4">
              DR Ai is your legendary digital companion - designed to be the ultimate architect of your digital dreams.
              Whether you're a developer building the next breakthrough app, a creator crafting innovative content, or a
              digital visionary exploring new frontiers, DR Ai adapts to your needs and provides intelligent assistance
              every step of the way.
            </p>
            <p className="text-base leading-relaxed">
              We believe in empowering creators with AI that understands context, generates meaningful code, and
              transforms abstract ideas into concrete solutions. Your dreams are the blueprint - we help you architect
              the future.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center">
              <MessageCircle className="w-6 h-6 mr-2 text-green-400" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-center">
            <p className="text-lg leading-relaxed mb-4">
              Have questions, feedback, or want to collaborate? Connect with our creator DANISH directly on WhatsApp.
            </p>
            <p className="text-sm text-white/60">
              Click the WhatsApp button in the bottom-right corner to start a conversation!
            </p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Built With</CardTitle>
          </CardHeader>
          <CardContent className="text-white/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-semibold text-purple-400">Frontend</div>
                <div className="text-sm">React & Next.js</div>
              </div>
              <div>
                <div className="font-semibold text-blue-400">Styling</div>
                <div className="text-sm">TailwindCSS</div>
              </div>
              <div>
                <div className="font-semibold text-green-400">AI Engine</div>
                <div className="text-sm">Google Gemini</div>
              </div>
              <div>
                <div className="font-semibold text-yellow-400">Storage</div>
                <div className="text-sm">LocalStorage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <WhatsAppContact />
    </div>
  )
}
