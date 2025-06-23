import { Bot, Sparkles, Zap, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About DR Ai - Dream Architect Intelligence",
  description:
    "Learn about DR Ai, your advanced AI assistant powered by Gemini LLM. Discover features, capabilities, and the technology behind our intelligent chatbot.",
  openGraph: {
    title: "About DR Ai - Dream Architect Intelligence",
    description:
      "Advanced AI assistant powered by Gemini LLM with glassmorphism design and intelligent conversation capabilities.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            About DR Ai
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Dream Architect Intelligence - Your advanced AI companion powered by Google's Gemini LLM, designed to help
            you build, create, and innovate.
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
                with coding, creative writing, problem-solving, and more.
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
            <CardTitle className="text-2xl text-white text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-white/80 text-center">
            <p className="text-lg leading-relaxed">
              DR Ai is designed to be your digital architect - helping you build ideas, solve complex problems, and turn
              your dreams into reality. Whether you're a developer, designer, writer, or innovator, DR Ai adapts to your
              needs and provides intelligent assistance every step of the way.
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
    </div>
  )
}
