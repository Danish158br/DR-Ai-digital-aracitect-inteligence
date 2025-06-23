"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppContact() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in DR Ai - Dream Architect Intelligence.")
    const whatsappUrl = `https://wa.me/923019521031?text=${message}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
      title="Message DANISH on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  )
}
