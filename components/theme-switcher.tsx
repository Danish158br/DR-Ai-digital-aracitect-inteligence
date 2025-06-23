"use client"

import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "./theme-provider"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { value: "glass", label: "🌊 Glass", description: "Glassmorphism" },
    { value: "dark", label: "🌙 Dark", description: "Dark Mode" },
    { value: "neon", label: "⚡ Neon", description: "Neon Glow" },
    { value: "light", label: "☀️ Light", description: "Light Mode" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
          <Palette className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-md bg-black/80 border-white/20">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value as any)}
            className={`text-white hover:bg-white/10 ${theme === t.value ? "bg-white/20" : ""}`}
          >
            <div>
              <div className="font-medium">{t.label}</div>
              <div className="text-xs text-white/60">{t.description}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
