"use client"

import { useState, useEffect } from "react"
import { Save, Key, Palette, Volume2, Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { validateApiKey, testApiConnection } from "@/utils/gemini-api"
import Image from "next/image"

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

  const handleSave = async () => {
    setError("")

    if (apiKey && !validateApiKey(apiKey)) {
      setError("Invalid API key format.")
      return
    }

    try {
      if (apiKey) {
        const testResult = await testApiConnection(apiKey)
        if (!testResult.success) {
          setError(`API key validation failed: ${testResult.error}`)
          return
        }
        localStorage.setItem("gemini-api-key", apiKey)
      } else {
        localStorage.removeItem("gemini-api-key")
      }

      localStorage.setItem("dr-ai-font-size", fontSize[0].toString())
      localStorage.setItem("dr-ai-sound-enabled", soundEnabled.toString())
      localStorage.setItem("dr-ai-animations-enabled", animationsEnabled.toString())
      localStorage.setItem("dr-ai-memory-enabled", memoryEnabled.toString())

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      setError("Failed to save settings.")
    }
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 card-bg border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/dr-ai-logo.jpg"
                alt="DR Ai Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Settings
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-secondary hover:text-primary">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          {error && (
            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertDescription className="text-red-200">{error}</AlertDescription>
            </Alert>
          )}

          {saved && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <AlertDescription className="text-green-200">Settings saved successfully!</AlertDescription>
            </Alert>
          )}

          {/* API Configuration */}
          <Card className="card-bg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Key className="w-5 h-5 text-yellow-400" />
                <span>API Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-secondary">
                Configure your Gemini API key for enhanced AI capabilities. The app works with built-in intelligence
                even without an API key.
              </p>
              <div>
                <Label htmlFor="api-key" className="text-primary">
                  Gemini API Key (Optional)
                </Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Gemini API key"
                    className="flex-1 input-bg text-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-secondary hover:text-primary"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="card-bg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Palette className="w-5 h-5 text-purple-400" />
                <span>Appearance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-primary">Theme</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { value: "glass", label: "🌊 Glass" },
                    { value: "dark", label: "🌙 Dark" },
                    { value: "neon", label: "⚡ Neon" },
                    { value: "light", label: "☀️ Light" },
                  ].map((t) => (
                    <Button
                      key={t.value}
                      variant={theme === t.value ? "default" : "outline"}
                      onClick={() => setTheme(t.value as any)}
                      className={`p-3 ${
                        theme === t.value
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "card-bg text-primary hover:bg-opacity-20"
                      }`}
                    >
                      {t.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-primary">Font Size: {fontSize[0]}px</Label>
                <Slider value={fontSize} onValueChange={setFontSize} max={24} min={12} step={1} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Behavior Settings */}
          <Card className="card-bg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Volume2 className="w-5 h-5 text-green-400" />
                <span>Behavior</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-primary">Sound Effects</Label>
                  <p className="text-xs text-secondary">Play sounds for notifications</p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-primary">Animations</Label>
                  <p className="text-xs text-secondary">Enable smooth animations</p>
                </div>
                <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-primary">Chat Memory</Label>
                  <p className="text-xs text-secondary">Remember conversation context</p>
                </div>
                <Switch checked={memoryEnabled} onCheckedChange={setMemoryEnabled} />
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {saved ? "Settings Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  )
}
