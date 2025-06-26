export const metadata = {
  title: "About DR Ai - Dream Architect Intelligence | Code your dreams. Architect your future.",
  description:
    "DR Ai is your legendary digital companion — designed for beginners, developers, and creators to build apps, games, and platforms using intelligent AI systems. No experience needed. Just a dream.",
  openGraph: {
    title: "About DR Ai - Dream Architect Intelligence",
    description:
      "Whether you're a complete beginner or an expert developer, DR Ai helps you code your dreams into real digital systems — apps, websites, games, and more. Architect your future today.",
    type: "website",
    url: "https://dr-ai-dream.vercel.app/about",
    images: [
      {
        url: "https://dr-ai-dream.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "DR Ai - Architect Your Future",
      },
    ],
  },
};

import ClientAboutPage from "./ClientAboutPage";

export default function AboutPage() {
  return <ClientAboutPage />;
}
