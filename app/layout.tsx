import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DR Ai - Dream Architect Intelligence",
  description:
    "Advanced AI chatbot powered by Google Gemini LLM. Experience intelligent conversations with glassmorphism design, local data storage, and customizable themes.",
  keywords: "AI chatbot, Gemini LLM, artificial intelligence, chat assistant, DR Ai, Dream Architect Intelligence",
  authors: [{ name: "DR Ai Team" }],
  creator: "DR Ai",
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
    description: "Advanced AI chatbot powered by Google Gemini LLM with glassmorphism design and local data storage.",
    url: "https://dr-ai.vercel.app",
    siteName: "DR Ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DR Ai - Dream Architect Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DR Ai - Dream Architect Intelligence",
    description: "Advanced AI chatbot powered by Google Gemini LLM",
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
              description: "Advanced AI chatbot powered by Google Gemini LLM",
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
              },
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
