"use client"

import { Bot, Sparkles, Zap, Shield, Code, MessageCircle, Rocket, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const ClientAboutPage = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello! I'd like to provide feedback about DR Ai - Dream Architect Intelligence.",
    )
    const whatsappUrl = `https://wa.me/923019521031?text=${message}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai
            </h1>
          </Link>
          <div className="flex items-center space-x-3">
            <Button onClick={handleWhatsAppClick} className="bg-green-500 hover:bg-green-600 text-white font-medium">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact & Feedback
            </Button>
            <Link href="/">
              <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
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
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            DR Ai
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-white/90">Dream Architect Intelligence</h2>
          <p className="text-2xl md:text-3xl font-medium mb-8 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            "Code your dreams. Architect your future."
          </p>
          <p className="text-xl text-purple-200/80 max-w-4xl mx-auto leading-relaxed">
            DR Ai is a next-generation AI companion designed for the digital architects of 2025. Transform your wildest
            ideas into reality through advanced AI-powered conversations, intelligent code generation, and futuristic
            problem-solving capabilities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Brain className="w-7 h-7 text-purple-400" />
                <span>Neural Architecture</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Advanced AI neural networks that understand context, generate sophisticated code, and provide
                architectural insights for complex digital systems.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Rocket className="w-7 h-7 text-blue-400" />
                <span>Future-Ready</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Built for 2025 and beyond with cutting-edge technology, futuristic UI design, and next-generation
                capabilities that evolve with your needs.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Zap className="w-7 h-7 text-yellow-400" />
                <span>Quantum Speed</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Lightning-fast response times with optimized neural processing. Experience instant AI interactions
                without compromising on depth or accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Shield className="w-7 h-7 text-green-400" />
                <span>Quantum Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Your digital thoughts are protected with quantum-grade security. All data remains in your local
                environment with zero external storage.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Code className="w-7 h-7 text-pink-400" />
                <span>Code Genesis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Transform natural language into sophisticated code architectures. From concept to deployment, architect
                your digital dreams with AI precision.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <Sparkles className="w-7 h-7 text-purple-400" />
                <span>Infinite Customization</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-purple-200/80">
              <p>
                Adaptive themes, personalized experiences, and infinite customization options. Your AI companion evolves
                with your creative vision.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30 mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-white text-center flex items-center justify-center">
              <Rocket className="w-8 h-8 mr-3 text-purple-400" />
              Our Vision for 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="text-purple-200/80 text-center space-y-6">
            <p className="text-xl leading-relaxed">
              DR Ai represents the future of human-AI collaboration. We're not just building another chatbot – we're
              architecting the foundation for tomorrow's digital renaissance.
            </p>
            <p className="text-lg leading-relaxed">
              In 2025, the boundary between imagination and implementation dissolves. Whether you're a developer pushing
              the limits of what's possible, a creator bringing impossible visions to life, or a digital visionary
              exploring uncharted territories, DR Ai is your quantum leap into the future.
            </p>
            <p className="text-base leading-relaxed text-purple-300/70">
              Every conversation is a step toward tomorrow. Every line of code is a building block of the future. Every
              dream you architect becomes a reality that shapes our digital world.
            </p>
          </CardContent>
        </Card>

        {/* Contact & Feedback Section */}
        <Card className="backdrop-blur-xl bg-black/20 border-green-500/30 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center flex items-center justify-center">
              <MessageCircle className="w-7 h-7 mr-3 text-green-400" />
              Connect & Collaborate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-purple-200/80 leading-relaxed">
              Your feedback shapes the future of DR Ai. Connect with our creator DANISH to share ideas, report issues,
              or collaborate on the next breakthrough in AI architecture.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Message DANISH on WhatsApp
            </Button>
            <p className="text-sm text-purple-300/60">
              Direct line to the architect • Feedback • Collaboration • Support
            </p>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Quantum Architecture Stack</CardTitle>
          </CardHeader>
          <CardContent className="text-purple-200/80">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="font-semibold text-purple-400 text-lg">Neural Frontend</div>
                <div className="text-sm">React Quantum & Next.js 2025</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-blue-400 text-lg">Quantum Styling</div>
                <div className="text-sm">TailwindCSS Fusion</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-green-400 text-lg">AI Core</div>
                <div className="text-sm">Advanced Neural Networks</div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-yellow-400 text-lg">Quantum Storage</div>
                <div className="text-sm">Local Quantum Encryption</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClientAboutPage
