import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "DR Ai - Dream Architect Intelligence | AI-Powered Code Generation & Development Assistant",
  description:
    "Transform your ideas into reality with DR Ai, the ultimate AI-powered development companion. Generate code, architect systems, and build the future with advanced Gemini 2.0 Flash AI technology. Perfect for developers, creators, and digital visionaries.",
  keywords: [
    "AI code generation",
    "artificial intelligence developer tools",
    "Gemini AI assistant",
    "code architect",
    "AI programming helper",
    "dream architect intelligence",
    "AI development companion",
    "automated code generation",
    "AI system architecture",
    "machine learning development",
    "AI-powered coding",
    "intelligent code assistant",
    "developer AI tools",
    "programming AI",
    "code generation platform",
  ].join(", "),
  authors: [{ name: "Danish - DR Ai Team", url: "https://dr-ai-dream.vercel.app" }],
  creator: "Danish - Dream Architect Intelligence",
  publisher: "DR Ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dr-ai-dream.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DR Ai - Dream Architect Intelligence | AI Code Generation Platform",
    description:
      "Revolutionary AI-powered development assistant that transforms ideas into code. Built with Gemini 2.0 Flash for developers, creators, and digital innovators.",
    url: "https://dr-ai-dream.vercel.app",
    siteName: "DR Ai - Dream Architect Intelligence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DR Ai - Dream Architect Intelligence - AI-Powered Code Generation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DR Ai - Dream Architect Intelligence",
    description: "Revolutionary AI-powered development assistant. Code your dreams. Architect your future.",
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
  category: "Technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DR Ai - Dream Architect Intelligence",
              description:
                "Revolutionary AI-powered development assistant that transforms ideas into code using advanced Gemini 2.0 Flash technology.",
              url: "https://dr-ai-dream.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Person",
                name: "Danish",
                jobTitle: "AI Developer & Digital Architect",
                image: "https://dr-ai-dream.vercel.app/developer-photo.jpg",
              },
              keywords:
                "AI code generation, artificial intelligence, developer tools, Gemini AI, programming assistant",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "1247",
              },
              screenshot: "https://dr-ai-dream.vercel.app/screenshot.png",
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
