"use client";

import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  Code,
  MessageCircle,
  Rocket,
  Brain
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ClientAboutPage = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello Danish! I'd like to provide feedback about DR Ai - Dream Architect Intelligence."
    );
    const whatsappUrl = `https://wa.me/923019521031?text=${message}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Hero */}
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
            DR Ai is a legendary intelligence platform that transforms raw imagination into working digital systems.
            From total beginners to elite creators, anyone can build apps, websites, tools, and automations—no experience required.
            If you can think it, DR Ai can architect it.
          </p>
        </div>

        {/* Meet the Creator */}
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
                  A visionary architect of digital intelligence, Danish has one mission: 
                  to bring the power of code to those who’ve never written a line. With DR Ai, he’s building a future 
                  where imagination is the only requirement to create something world-changing.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-lg">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-primary">Digital Architect</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-lg">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-medium text-primary">Creative Engineer</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-lg">
                    <Rocket className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-primary">Dream Realizer</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision Section */}
        <Card className="card-bg mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center flex items-center justify-center">
              <Rocket className="w-8 h-8 mr-3 text-purple-400" />
              Our Vision for 2025
            </CardTitle>
          </CardHeader>
          <CardContent className="text-secondary text-center space-y-6">
            <p className="text-xl leading-relaxed">
              DR Ai is the doorway to digital independence. Whether you’re building your first app, creating your dream business,
              or launching a revolutionary platform—DR Ai makes it possible.
            </p>
            <p className="text-lg leading-relaxed">
              No coding. No limits. Only dreams, execution, and a future you build yourself.
            </p>
            <p className="text-base leading-relaxed text-muted">
              Every line of logic DR Ai writes is shaped by your vision—not syntax.
              Every system it constructs begins with your dream—not documentation.
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
              Want to share your feedback, collaborate, or say salam? Danish welcomes your message—just reach out.
            </p>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Message Danish on WhatsApp
            </Button>
            <p className="text-sm text-muted">Feedback • Ideas • Support • Vision</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientAboutPage;
