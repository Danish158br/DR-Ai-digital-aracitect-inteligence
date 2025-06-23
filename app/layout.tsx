import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DR Ai - Dream Architect Intelligence | Code your dreams. Architect your future.",
  description:
    "DR Ai is a futuristic, mobile-first, full-stack chatbot web application powered by Gemini LLM, designed for developers, creators, and digital visionaries. Transform natural language prompts into intelligent conversations, code, and creative outputs.",
  keywords:
    "AI chatbot, Gemini LLM, artificial intelligence, chat assistant, DR Ai, Dream Architect Intelligence, code generation, developer tools, creative AI, digital architect",
  authors: [{ name: "DR Ai Team" }],
  creator: "DR Ai - Dream Architect Intelligence",
  publisher: "DR Ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dr-ai.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DR Ai - Dream Architect Intelligence",
    description:
      "Code your dreams. Architect your future. Futuristic AI chatbot powered by Gemini LLM for developers, creators, and digital visionaries.",
    url: "https://dr-ai.vercel.app",
    siteName: "DR Ai - Dream Architect Intelligence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DR Ai - Dream Architect Intelligence - Code your dreams. Architect your future.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DR Ai - Dream Architect Intelligence",
    description: "Code your dreams. Architect your future. Futuristic AI chatbot powered by Gemini LLM.",
    images: ["/og-image.png"],
    creator: "@drai_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DR Ai - Dream Architect Intelligence",
              description:
                "Futuristic AI chatbot powered by Gemini LLM for developers, creators, and digital visionaries. Code your dreams. Architect your future.",
              url: "https://dr-ai.vercel.app",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "DR Ai Team",
                description: "Legendary digital architects and full-stack masters",
              },
              keywords: "AI chatbot, Gemini LLM, code generation, developer tools, creative AI, digital architect",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
