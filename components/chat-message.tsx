"use client";

import {
  User,
  Download,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  image?: string;
  type?: "text" | "image" | "code";
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const downloadImage = (imageUrl: string) => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `dr-ai-image-${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} mb-8 w-full`}>
      {/* Avatar on top */}
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-md mb-2">
        {isUser ? (
          <Image
            src="/placeholder-user.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src="/dr-ai-logo.jpg"
            alt="DR Ai Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Message Content without bubble */}
      <div className="max-w-2xl w-fit px-4">
        {/* Image Content */}
        {message.image && (
          <div className="mb-4 relative rounded-lg overflow-hidden">
            <img
              src={message.image || "/placeholder.svg"}
              alt="Uploaded content"
              className="w-full rounded-lg shadow-md"
              loading="lazy"
            />
            <Button
              onClick={() => downloadImage(message.image!)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              aria-label="Download image"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Text Content */}
        <p className="text-base leading-relaxed font-medium text-primary whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Message Actions */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted">
          <span>
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>

          {!isUser && (
            <Button
              onClick={() => copyToClipboard(message.content)}
              size="sm"
              variant="ghost"
              className="text-muted hover:text-primary"
              aria-label="Copy message"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

