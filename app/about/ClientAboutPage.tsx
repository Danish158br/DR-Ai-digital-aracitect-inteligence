"use client"

import { Bot, Sparkles, Zap, Shield, Code, MessageCircle, Rocket, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const ClientAboutPage = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello Danish! I'd like to provide feedback about DR Ai - Dream Architect Intelligence.",
    )
    const whatsappUrl = `https://wa.me/923019521031?text=${message}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 card-bg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About DR Ai
            </h1>
          </Link>
          <div className="flex items-center space-x-3">
            <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 text-white font-medium">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Danish
            </Button>
            <Link href="/">
              <Button variant="ghost" className="text-secondary hover:text-primary">
                Back to Chat
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            DR Ai
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-primary">Dream Architect Intelligence</h2>
          <p className="text-2xl md:text-3xl font-medium mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            "Code your dreams. Architect your future."
          </p>
          <p className="text-xl text-secondary max-w-4xl mx-auto leading-relaxed">
            DR Ai is a revolutionary AI-powered development assistant built with Gemini 2.0 Flash technology. Transform
            your wildest ideas into reality through advanced AI-powered conversations, intelligent code generation, and
            futuristic problem-solving capabilities designed for the digital architects of 2025.
          </p>
        </div>

        {/* Developer Section */}
        <Card className="card-bg mb-16 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/developer-photo.jpg"
                    alt="Danish - Creator of DR Ai"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary mb-4">Meet Danish</h3>
                <p className="text-xl text-secondary mb-4 font-medium">Creator & Lead Developer of DR Ai</p>
                <p className="text-lg text-secondary leading-relaxed mb-6">
                  A visionary developer and digital architect passionate about creating AI-powered solutions that
                  transform how we interact with technology. Danish combines cutting-edge AI research with practical
                  development expertise to build tools that empower creators and innovators worldwide.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-primary">AI Specialist</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-lg">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-primary">Full-Stack Developer</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-lg">
                    <Rocket className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-primary">Innovation Leader</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Brain className="w-7 h-7 text-purple-400" />
                <span>Gemini 2.0 Flash</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Powered by Google's latest Gemini 2.0 Flash model for lightning-fast responses, advanced reasoning, and
                multimodal understanding including text, images, and code.
              </p>
            </CardContent>
          </Card>

          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Rocket className="w-7 h-7 text-blue-400" />
                <span>Future-Ready Architecture</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Built for 2025 and beyond with cutting-edge technology stack, optimized performance, and scalable
                architecture that evolves with your growing needs.
              </p>
            </CardContent>
          </Card>

          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Zap className="w-7 h-7 text-yellow-400" />
                <span>Lightning Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Zero-lag interactions with optimized rendering, intelligent caching, and performance-first design
                ensuring smooth experience across all devices.
              </p>
            </CardContent>
          </Card>

          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Shield className="w-7 h-7 text-green-400" />
                <span>Privacy-First Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Your data stays secure with local storage, optional API configuration, and transparent privacy
                practices. No tracking, no data mining, just pure AI assistance.
              </p>
            </CardContent>
          </Card>

          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Code className="w-7 h-7 text-pink-400" />
                <span>Advanced Code Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Transform natural language into sophisticated code architectures. From concept to deployment, architect
                your digital dreams with AI precision.
              </p>
            </CardContent>
          </Card>

          <Card className="card-bg hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-primary">
                <Sparkles className="w-7 h-7 text-purple-400" />
                <span>Multimodal Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-secondary">
              <p>
                Upload images, analyze visuals, generate content, and interact with multiple data types. Experience the
                future of AI-human collaboration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="card-bg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center flex items-center justify-center">
              <Rocket className="w-8 h-8 mr-3 text-purple-400" />
              Our Vision for 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="text-secondary text-center space-y-6">
            <p className="text-xl leading-relaxed">
              DR Ai represents the future of human-AI collaboration. We're not just building another chatbot – we're
              architecting the foundation for tomorrow's digital renaissance.
            </p>
            <p className="text-lg leading-relaxed">
              In 2025, the boundary between imagination and implementation dissolves. Whether you're a developer pushing
              the limits of what's possible, a creator bringing impossible visions to life, or a digital visionary
              exploring uncharted territories, DR Ai is your quantum leap into the future.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Every conversation is a step toward tomorrow. Every line of code is a building block of the future. Every
              dream you architect becomes a reality that shapes our digital world.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="card-bg border-green-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center flex items-center justify-center">
              <MessageCircle className="w-7 h-7 mr-3 text-green-400" />
              Connect with Danish
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-secondary leading-relaxed">
              Have feedback, ideas, or want to collaborate? Danish is always excited to connect with fellow innovators
              and hear how DR Ai is helping you architect your dreams.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Message Danish on WhatsApp
            </Button>
            <p className="text-sm text-muted">Direct line to the creator • Feedback • Collaboration • Support</p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="card-bg mt-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary text-center">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent className="text-secondary">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="font-semibold text-purple-400 text-lg">Frontend</div>
                <div className="text-sm">React 18 & Next.js 14</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-blue-400 text-lg">AI Engine</div>
                <div className="text-sm">Gemini 2.0 Flash</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-green-400 text-lg">Styling</div>
                <div className="text-sm">TailwindCSS</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-yellow-400 text-lg">Deployment</div>
                <div className="text-sm">Vercel Platform</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClientAboutPage
