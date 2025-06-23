"use client"

import { useState, useEffect } from "react"
import { Bot, Save, Key, Palette, Volume2, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { WhatsAppContact } from "@/components/whatsapp-contact"
import { validateApiKey } from "@/utils/gemini-api"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [fontSize, setFontSize] = useState([16])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [memoryEnabled, setMemoryEnabled] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Load settings from localStorage
    const savedApiKey = localStorage.getItem("gemini-api-key") || ""
    const savedFontSize = localStorage.getItem("dr-ai-font-size")
    const savedSound = localStorage.getItem("dr-ai-sound-enabled")
    const savedAnimations = localStorage.getItem("dr-ai-animations-enabled")
    const savedMemory = localStorage.getItem("dr-ai-memory-enabled")

    setApiKey(savedApiKey)
    setFontSize(savedFontSize ? [Number.parseInt(savedFontSize)] : [16])
    setSoundEnabled(savedSound !== "false")
    setAnimationsEnabled(savedAnimations !== "false")
    setMemoryEnabled(savedMemory !== "false")
  }, [])

  const handleSave = () => {
    setError("")

    // Validate API key if provided
    if (apiKey && !validateApiKey(apiKey)) {
      setError("Invalid API key format. Please check your Gemini API key.")
      return
    }

    try {
      // Save API key
      if (apiKey) {
        localStorage.setItem("gemini-api-key", apiKey)
      }

      // Save other settings
      localStorage.setItem("dr-ai-font-size", fontSize[0].toString())
      localStorage.setItem("dr-ai-sound-enabled", soundEnabled.toString())
      localStorage.setItem("dr-ai-animations-enabled", animationsEnabled.toString())
      localStorage.setItem("dr-ai-memory-enabled", memoryEnabled.toString())

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      setError("Failed to save settings. Please try again.")
    }
  }

  const handleClearApiKey = () => {
    setApiKey("")
    localStorage.removeItem("gemini-api-key")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai Settings
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {saved && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <AlertDescription className="text-green-200">Settings saved successfully!</AlertDescription>
            </Alert>
          )}

          {/* API Configuration */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Key className="w-5 h-5 text-yellow-400" />
                <span>API Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="api-key" className="text-white/80">
                  Gemini API Key
                </Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-white/60 hover:text-white"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-white/60">
                    Get your API key from{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
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
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Palette className="w-5 h-5 text-purple-400" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white/80">Theme</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { value: "glass", label: "🌊 Glass", desc: "Glassmorphism" },
                    { value: "dark", label: "🌙 Dark", desc: "Dark Mode" },
                    { value: "neon", label: "⚡ Neon", desc: "Neon Glow" },
                    { value: "light", label: "☀️ Light", desc: "Light Mode" },
                  ].map((t) => (
                    <Button
                      key={t.value}
                      variant={theme === t.value ? "default" : "outline"}
                      onClick={() => setTheme(t.value as any)}
                      className={`flex flex-col h-auto p-3 ${
                        theme === t.value
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <span className="font-medium">{t.label}</span>
                      <span className="text-xs opacity-70">{t.desc}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white/80">Font Size: {fontSize[0]}px</Label>
                <Slider value={fontSize} onValueChange={setFontSize} max={24} min={12} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Behavior Settings */}
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Volume2 className="w-5 h-5 text-green-400" />
                <span>Behavior</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Sound Effects</Label>
                  <p className="text-xs text-white/60">Play sounds for notifications</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Animations</Label>
                  <p className="text-xs text-white/60">Enable smooth animations</p>
                </div>
                <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-white/80">Chat Memory</Label>
                  <p className="text-xs text-white/60">Remember conversation context</p>
                </div>
                <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {saved ? "Settings Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>

      <WhatsAppContact />
    </div>
  )
}
