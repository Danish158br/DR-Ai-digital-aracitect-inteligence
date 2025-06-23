"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Bot, Camera, Save, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface UserProfile {
  name: string
  bio: string
  avatar: string
  joinDate: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    bio: "",
    avatar: "",
    joinDate: new Date().toISOString().split("T")[0],
  })
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem("dr-ai-profile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("dr-ai-profile", JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfile((prev) => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai Profile
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
        <Card className="backdrop-blur-md bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-white/60 text-center">Click the camera icon to upload a profile picture</p>
            </div>

            {/* Profile Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/80">
                  Display Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <Label htmlFor="bio" className="text-white/80">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                />
              </div>

              <div>
                <Label className="text-white/80">Member Since</Label>
                <div className="mt-1 p-2 bg-white/5 border border-white/20 rounded-md text-white/60">
                  {new Date(profile.joinDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {JSON.parse(localStorage.getItem("dr-ai-chat-history") || "[]").length}
                </div>
                <div className="text-xs text-white/60">Conversations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{Math.floor(Math.random() * 50) + 10}</div>
                <div className="text-xs text-white/60">Days Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{Math.floor(Math.random() * 1000) + 100}</div>
                <div className="text-xs text-white/60">Messages</div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {saved ? "Profile Saved!" : "Save Profile"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
