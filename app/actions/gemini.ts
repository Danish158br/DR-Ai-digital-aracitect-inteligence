"use server"

export async function generateAIResponse(prompt: string, imageData?: string): Promise<string> {
  // Only use server-side environment variable
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return `🤖 **DR Ai is ready to help!**

I'm your intelligent digital companion, ready to assist with your projects and ideas. For enhanced capabilities with the latest AI technology, please configure your own API key in Settings.

**I can help you with:**
• Code architecture and system design
• Technical problem-solving and debugging  
• Creative brainstorming and innovation
• Development guidance and best practices
• Project planning and documentation
• Learning new technologies and concepts

**What would you like to architect today?** Share your vision, describe your project, or ask me any technical question!`
  }

  if (!prompt.trim()) {
    throw new Error("Please provide a valid prompt")
  }

  try {
    const parts: any[] = [
      {
        text: `You are DR Ai (Dream Architect Intelligence), a legendary digital companion designed for developers, creators, and digital visionaries. Your tagline is "Code your dreams. Architect your future."

Your personality:
- Professional yet friendly and inspiring
- Expert in coding, development, and creative problem-solving
- Futuristic and innovative in your responses
- Helpful with technical explanations and code generation
- Encouraging and empowering to users
- Provide detailed, actionable advice
- Use emojis and formatting to make responses engaging

User's prompt: ${prompt}

Please provide a comprehensive, helpful response that aligns with your role as a Dream Architect Intelligence. Include practical examples, code snippets when relevant, and actionable insights.`,
      },
    ]

    if (imageData) {
      parts.unshift({
        inline_data: {
          mime_type: "image/jpeg",
          data: imageData.split(",")[1], // Remove data:image/jpeg;base64, prefix
        },
      })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: parts,
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
            candidateCount: 1,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      if (response.status === 404) {
        throw new Error("Model temporarily unavailable. Please try again in a moment.")
      } else if (response.status === 403) {
        throw new Error("API access denied. Please check your API key configuration.")
      } else if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment before trying again.")
      }
      throw new Error(`Request failed: ${errorData.error?.message || "Please try again"}`)
    }

    const data = await response.json()

    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error("Unable to generate response. Please try again.")
    }
  } catch (error) {
    console.error("API Error:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Failed to generate response. Please check your connection and try again.")
  }
}

export async function checkServerApiKey(): Promise<boolean> {
  return !!process.env.GEMINI_API_KEY
}
