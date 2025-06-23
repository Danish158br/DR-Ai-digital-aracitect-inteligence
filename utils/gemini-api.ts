export async function generateResponse(prompt: string): Promise<string> {
  const apiKey = localStorage.getItem("gemini-api-key")

  if (!apiKey) {
    throw new Error("Please configure your Gemini API key in Settings")
  }

  if (!prompt.trim()) {
    throw new Error("Please provide a valid prompt")
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are DR Ai (Dream Architect Intelligence), a legendary digital companion designed for developers, creators, and digital visionaries. Your tagline is "Code your dreams. Architect your future."

Your personality:
- Professional yet friendly and inspiring
- Expert in coding, development, and creative problem-solving
- Futuristic and innovative in your responses
- Helpful with technical explanations and code generation
- Encouraging and empowering to users

User's prompt: ${prompt}

Please provide a helpful, detailed response that aligns with your role as a Dream Architect Intelligence.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
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
      throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || "Unknown error"}`)
    }

    const data = await response.json()

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text
    } else if (data.error) {
      throw new Error(`Gemini API Error: ${data.error.message}`)
    } else {
      throw new Error("Invalid response format from Gemini API")
    }
  } catch (error) {
    console.error("Gemini API Error:", error)
    if (error instanceof Error) {
      throw error
    } else {
      throw new Error("Failed to generate response. Please check your API key and try again.")
    }
  }
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey && apiKey.length > 20 && apiKey.startsWith("AIza")
}
