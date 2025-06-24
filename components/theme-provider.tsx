"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "glass" | "dark" | "neon" | "light"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("glass")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("dr-ai-theme") as Theme
    if (savedTheme && ["glass", "dark", "neon", "light"].includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dr-ai-theme", theme)

      // Remove all theme classes
      document.documentElement.classList.remove("theme-glass", "theme-dark", "theme-neon", "theme-light")

      // Add current theme class
      document.documentElement.classList.add(`theme-${theme}`)

      // Set data attribute for CSS targeting
      document.documentElement.setAttribute("data-theme", theme)

      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        const themeColors = {
          glass: "#8b5cf6",
          dark: "#1e1b4b",
          neon: "#00ff88",
          light: "#8b5cf6",
        }
        metaThemeColor.setAttribute("content", themeColors[theme])
      }
    }
  }, [theme, mounted])

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme} min-h-screen transition-all duration-300`}>{children}</div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
