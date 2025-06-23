import { Bot, FileText, Users, Gavel, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Policy - DR Ai",
  description: "DR Ai usage policies, community guidelines, and acceptable use policy for our AI chatbot service.",
  openGraph: {
    title: "Policy - DR Ai",
    description: "Usage policies and community guidelines for DR Ai chatbot service.",
    type: "website",
  },
}

export default function PolicyPage() {
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
            Usage Policy
          </h1>
          <p className="text-white/80">Guidelines for responsible use of DR Ai</p>
        </div>

        <div className="space-y-6">
          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <FileText className="w-6 h-6 text-blue-400" />
                <span>Acceptable Use Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>
                DR Ai is designed to be a helpful, safe, and productive AI assistant. By using our service, you agree to
                use it responsibly and in accordance with these guidelines.
              </p>
              <div>
                <h3 className="font-semibold text-white mb-2">Permitted Uses:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Educational and learning purposes</li>
                  <li>Creative writing and brainstorming</li>
                  <li>Programming and technical assistance</li>
                  <li>General information and research</li>
                  <li>Personal productivity and organization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <span>Prohibited Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>The following activities are strictly prohibited when using DR Ai:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generating harmful, offensive, or inappropriate content</li>
                <li>Creating content that promotes violence, hatred, or discrimination</li>
                <li>Attempting to generate illegal or unethical content</li>
                <li>Using the service to harass, threaten, or harm others</li>
                <li>Generating spam, malware, or malicious code</li>
                <li>Attempting to bypass safety measures or content filters</li>
                <li>Using the service for fraudulent or deceptive purposes</li>
                <li>Violating intellectual property rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Users className="w-6 h-6 text-green-400" />
                <span>Community Guidelines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>We strive to maintain a positive and respectful environment for all users:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Treat the AI assistant and the service with respect</li>
                <li>Use the service in a way that doesn't harm others</li>
                <li>Respect the intellectual property of others</li>
                <li>Report any issues or concerns through appropriate channels</li>
                <li>Help maintain a safe and welcoming environment</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <Gavel className="w-6 h-6 text-purple-400" />
                <span>Content Responsibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>Important considerations regarding AI-generated content:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Users are responsible for reviewing and verifying AI-generated content</li>
                <li>DR Ai responses should not be considered professional advice</li>
                <li>Always fact-check important information independently</li>
                <li>Do not rely solely on AI responses for critical decisions</li>
                <li>Understand that AI can make mistakes or provide inaccurate information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">API Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>When using your own Gemini API key with DR Ai:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Ensure your API key is kept secure and not shared</li>
                <li>Monitor your API usage to avoid unexpected charges</li>
                <li>Comply with Google's Gemini API terms of service</li>
                <li>Be aware of rate limits and usage quotas</li>
                <li>Use the API responsibly and efficiently</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Enforcement</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>While DR Ai operates primarily client-side with local data storage, we reserve the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update these policies as needed</li>
                <li>Implement technical measures to prevent misuse</li>
                <li>Cooperate with law enforcement when required</li>
                <li>Discontinue service for violations of these policies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Reporting Issues</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80 space-y-4">
              <p>If you encounter any issues or have concerns about content or behavior:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Report technical issues through our support channels</li>
                <li>Document any problematic AI responses</li>
                <li>Provide feedback to help improve the service</li>
                <li>Contact us for clarification on policy matters</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-white/80">
              <p>
                These policies may be updated from time to time to reflect changes in our service, technology, or legal
                requirements. Users will be notified of significant changes through the application interface.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
