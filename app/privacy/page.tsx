import { Bot, Shield, Eye, Lock, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy Policy - DR Ai",
  description:
    "Learn how DR Ai protects your privacy. We store all data locally in your browser and never transmit personal information to our servers.",
  openGraph: {
    title: "Privacy Policy - DR Ai",
    description: "Privacy-first AI chatbot with local data storage and no server-side data collection.",
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DR Ai
            </h1>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-white/80">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="w-6 h-6 text-green-400" />
                <span>Privacy-First Approach</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                At DR Ai, we believe privacy is a fundamental right. This Privacy Policy explains how we collect, use,
                and protect your information when you use our AI chatbot service.
              </p>
              <p className="font-semibold text-green-400">
                Key Point: All your data is stored locally in your browser. We do not collect, store, or transmit your
                personal information to our servers.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Database className="w-6 h-6 text-blue-400" />
                <span>Data Storage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>DR Ai uses your browser's localStorage to store:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Chat History:</strong> Your conversations with the AI assistant
                </li>
                <li>
                  <strong>User Profile:</strong> Your name, bio, and profile picture (if provided)
                </li>
                <li>
                  <strong>Settings:</strong> Theme preferences, font size, and other customizations
                </li>
                <li>
                  <strong>API Configuration:</strong> Your Gemini API key (stored locally, never transmitted)
                </li>
              </ul>
              <p>This data never leaves your device and is not accessible to us or any third parties.</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Eye className="w-6 h-6 text-purple-400" />
                <span>What We Don't Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>We do NOT collect, store, or have access to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your conversations or chat history</li>
                <li>Personal information or profile data</li>
                <li>Your API keys or credentials</li>
                <li>Usage analytics or tracking data</li>
                <li>IP addresses or device information</li>
                <li>Cookies for tracking purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Lock className="w-6 h-6 text-yellow-400" />
                <span>Third-Party Services</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>DR Ai integrates with Google's Gemini API to provide AI responses. When you send a message:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your message is sent directly from your browser to Google's Gemini API</li>
                <li>We do not intercept, store, or process your messages</li>
                <li>Google's privacy policy applies to data sent to their API</li>
                <li>Your API key is used directly from your browser's local storage</li>
              </ul>
              <p>
                Please review{" "}
                <a
                  href="https://policies.google.com/privacy"
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google's Privacy Policy
                </a>{" "}
                for information about how they handle API requests.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Data Control</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>Since all data is stored locally in your browser, you have complete control:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Delete Data:</strong> Clear your browser's localStorage or use our in-app delete options
                </li>
                <li>
                  <strong>Export Data:</strong> Your data can be accessed through browser developer tools
                </li>
                <li>
                  <strong>Transfer Data:</strong> Data doesn't automatically sync across devices
                </li>
                <li>
                  <strong>Backup:</strong> You're responsible for backing up your data if desired
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Security</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>We implement security measures to protect the application:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTTPS encryption for all communications</li>
                <li>No server-side data storage eliminates data breach risks</li>
                <li>Client-side data encryption for sensitive information</li>
                <li>Regular security updates and patches</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                DR Ai does not knowingly collect personal information from children under 13. If you are a parent or
                guardian and believe your child has provided personal information, please contact us to have it removed.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Changes to Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us through
                the application's feedback system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
