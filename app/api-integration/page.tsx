"use client"

import { useState, useEffect } from "react"
import { Bot, Save, Key, Zap, Eye, EyeOff, CheckCircle, AlertCircle, Cpu } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { validateApiKey } from "@/utils/gemini-api"

export default function ApiIntegrationPage() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key") || ""
    setApiKey(savedApiKey)
    setIsConnected(!!savedApiKey)
  }, [])

  const handleSave = () => {
    setError("")

    // Validate API key if provided
    if (apiKey && !validateApiKey(apiKey)) {
      setError("Invalid API key format. Please verify your key and try again.")
      return
    }

    try {
      // Save API key
      if (apiKey) {
        localStorage.setItem("gemini-api-key", apiKey)
        setIsConnected(true)
      } else {
        localStorage.removeItem("gemini-api-key")
        setIsConnected(false)
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      setError("Failed to save configuration. Please try again.")
    }
  }

  const handleClearApiKey = () => {
    setApiKey("")
    localStorage.removeItem("gemini-api-key")
    setIsConnected(false)
  }

  const handleTestConnection = async () => {
    if (!apiKey) {
      setError("Please enter an API key first.")
      return
    }

    try {
      // Simple test to validate the API key works
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }],
          }),
        },
      )

      if (response.ok) {
        setIsConnected(true)
        setError("")
        setSaved(true)
        localStorage.setItem("gemini-api-key", apiKey)
      } else {
        setError("Connection failed. Please check your API key.")
        setIsConnected(false)
      }
    } catch (error) {
      setError("Connection test failed. Please check your internet connection.")
      setIsConnected(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/20 border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                API Integration
              </h1>
              <p className="text-xs text-purple-300/80">Configure your AI services</p>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-500/20">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Connection Status */}
        <div className="mb-8">
          <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                  ></div>
                  <span className="text-white font-medium">
                    {isConnected ? "AI Service Connected" : "AI Service Disconnected"}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-purple-300/80">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">Neural Network Status</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Error/Success Alerts */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {saved && (
            <Alert className="bg-green-500/10 border-green-500/30 backdrop-blur-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200">Configuration saved successfully!</AlertDescription>
            </Alert>
          )}

          {/* API Configuration Tabs */}
          <Tabs defaultValue="gemini" className="w-full">
            <TabsList className="grid w-full grid-cols-1 bg-black/30 border border-purple-500/30">
              <TabsTrigger
                value="gemini"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white text-purple-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Google Gemini AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gemini" className="space-y-6">
              <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Key className="w-5 h-5 text-yellow-400" />
                    <span>Gemini AI Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="api-key" className="text-purple-200 font-medium">
                      API Key
                    </Label>
                    <div className="flex space-x-2 mt-2">
                      <Input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="flex-1 bg-black/30 border-purple-500/30 text-white placeholder:text-purple-300/50 focus:border-purple-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-sm text-purple-300/70">
                        Get your API key from{" "}
                        <a
                          href="https://makersuite.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline font-medium"
                        >
                          Google AI Studio
                        </a>
                      </p>
                      {apiKey && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleClearApiKey}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleTestConnection}
                      disabled={!apiKey}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saved ? "Saved!" : "Save Configuration"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Guide */}
              <Card className="backdrop-blur-xl bg-black/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Integration Guide</CardTitle>
                </CardHeader>
                <CardContent className="text-purple-200 space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Step 1: Get Your API Key</h4>
                    <p className="text-sm">
                      Visit Google AI Studio and create a new API key. This key will enable DR Ai to access advanced AI
                      capabilities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Step 2: Configure & Test</h4>
                    <p className="text-sm">
                      Enter your API key above and click "Test Connection" to verify it's working correctly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Step 3: Start Architecting</h4>
                    <p className="text-sm">
                      Once configured, return to the main chat interface and start building your digital dreams!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
