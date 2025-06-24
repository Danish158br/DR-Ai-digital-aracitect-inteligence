"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: "glass", label: "🌊 Glass", description: "Glassmorphism Fusion" },
    { value: "dark", label: "🌙 Dark", description: "Quantum Dark Mode" },
    { value: "neon", label: "⚡ Neon", description: "Cyberpunk Neon" },
    { value: "light", label: "☀️ Light", description: "Pure Light Mode" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-secondary hover:text-primary btn-hover focus-enhanced">
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="card-bg border-opacity-50 shadow-xl">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value as any)}
            className={`text-primary hover:bg-opacity-20 btn-hover cursor-pointer focus-enhanced ${
              theme === t.value ? "bg-purple-500/20" : ""
            }`}
          >
            <div>
              <div className="font-medium text-enhanced">{t.label}</div>
              <div className="text-xs text-muted">{t.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
