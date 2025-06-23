import { Bot, Scale, Shield, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Terms & Conditions - DR Ai",
  description:
    "Read the terms and conditions for using DR Ai chatbot service. Understand your rights and responsibilities when using our AI-powered platform.",
  openGraph: {
    title: "Terms & Conditions - DR Ai",
    description: "Terms and conditions for DR Ai chatbot service powered by Gemini LLM.",
    type: "website",
  },
}

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-white/80">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Scale className="w-6 h-6 text-purple-400" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                By accessing and using DR Ai ("the Service"), you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                DR Ai is an AI-powered chatbot service that uses Google's Gemini LLM to provide intelligent responses
                and assistance to users.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Shield className="w-6 h-6 text-green-400" />
                <span>Use License</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                Permission is granted to temporarily use DR Ai for personal, non-commercial transitory viewing only.
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained in the Service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <span>Disclaimer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                The materials on DR Ai are provided on an 'as is' basis. DR Ai makes no warranties, expressed or
                implied, and hereby disclaims and negates all other warranties including without limitation, implied
                warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
              <p>
                Further, DR Ai does not warrant or make any representations concerning the accuracy, likely results, or
                reliability of the use of the materials on its website or otherwise relating to such materials or on any
                sites linked to this site.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">AI-Generated Content</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>DR Ai uses artificial intelligence to generate responses. Please note:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI responses may not always be accurate or appropriate</li>
                <li>Users should verify important information independently</li>
                <li>DR Ai is not responsible for decisions made based on AI-generated content</li>
                <li>The service should not be used for medical, legal, or financial advice</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Data Storage</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>DR Ai stores all user data locally in your browser's localStorage. This includes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Chat history and conversations</li>
                <li>User profile information and preferences</li>
                <li>Theme and application settings</li>
                <li>Uploaded profile images</li>
              </ul>
              <p>
                No personal data is transmitted to or stored on our servers. Users are responsible for backing up their
                data if desired.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Limitations</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                In no event shall DR Ai or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use DR Ai, even if DR Ai or an authorized representative has been notified orally or in writing of
                the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Revisions</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                DR Ai may revise these terms of service at any time without notice. By using this service, you are
                agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                If you have any questions about these Terms & Conditions, please contact us through the application's
                feedback system or visit our support page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
