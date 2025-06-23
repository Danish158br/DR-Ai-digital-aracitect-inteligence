# DR Ai - Dream Architect Intelligence

A production-ready, mobile-friendly AI chatbot web application powered by Google's Gemini LLM with glassmorphism design and local data storage.

## 🌟 Features

- **🤖 AI-Powered Chat**: Intelligent conversations using Google Gemini LLM
- **🎨 Multiple Themes**: Glass, Dark, Neon, and Light themes
- **📱 Mobile-First**: Fully responsive design optimized for all devices
- **🔒 Privacy-First**: All data stored locally in browser (no server storage)
- **⚙️ Customizable**: Profile editing, theme switching, and settings
- **📚 Chat History**: Automatic conversation saving and management
- **🚀 Fast & Lightweight**: Optimized for performance and SEO
- **📄 Complete Pages**: About, Terms, Privacy, Policy, Settings, Profile, History

## 🛠️ Tech Stack

- **Frontend**: React 18 + Next.js 14 (App Router)
- **Styling**: TailwindCSS + shadcn/ui components
- **AI**: Google Gemini LLM API
- **Storage**: Browser localStorage (no backend required)
- **Deployment**: Vercel-ready
- **Icons**: Lucide React

## 🚀 Quick Start

### 1. Clone & Install

\`\`\`bash
git clone <repository-url>
cd dr-ai
npm install
\`\`\`

### 2. Environment Setup

Create a `.env.local` file:

\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Deploy to Vercel

\`\`\`bash
npm run build
\`\`\`

Deploy using the Vercel CLI or connect your GitHub repository to Vercel.

## 📁 Project Structure

\`\`\`
dr-ai/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── history/           # Chat history page
│   ├── policy/            # Usage policy page
│   ├── privacy/           # Privacy policy page
│   ├── profile/           # User profile page
│   ├── settings/          # Settings page
│   ├── terms/             # Terms & conditions page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page (chat interface)
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── chat-message.tsx  # Chat message component
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-switcher.tsx # Theme switching component
├── utils/                # Utility functions
│   ├── gemini-api.ts     # Gemini API integration
│   └── local-storage.ts  # localStorage helpers
├── public/               # Static assets
│   ├── sitemap.xml       # SEO sitemap
│   ├── robots.txt        # Search engine directives
│   └── manifest.json     # PWA manifest
└── README.md
\`\`\`

## 🎨 Themes

DR Ai includes 4 beautiful themes:

1. **🌊 Glass**: Glassmorphism with blur effects
2. **🌙 Dark**: Dark mode with purple accents
3. **⚡ Neon**: Black background with neon highlights
4. **☀️ Light**: Clean light theme with blue gradients

## 🔧 Configuration

### API Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file or configure it in the Settings page
3. The API key is stored locally and never sent to our servers

### Customization

- **Themes**: Modify theme styles in `app/globals.css`
- **Components**: Customize UI components in the `components/` directory
- **API**: Adjust Gemini API parameters in `utils/gemini-api.ts`

## 📊 SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine crawling directives
- **Performance**: Optimized for Core Web Vitals

## 🔒 Privacy & Security

- **Local Storage**: All user data stored in browser localStorage
- **No Tracking**: No analytics or tracking by default
- **API Security**: Direct API calls from browser to Gemini
- **HTTPS**: Secure connections for all communications

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Friendly**: Optimized for touch interactions
- **Fast Loading**: Lightweight and optimized assets
- **PWA Ready**: Progressive Web App capabilities

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add your `GEMINI_API_KEY` environment variable
3. Deploy automatically on every push

### Other Platforms

DR Ai can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions

## 🎯 Roadmap

- [ ] Voice input/output
- [ ] File upload support
- [ ] Export chat as PDF
- [ ] Multiple conversation threads
- [ ] Plugin system
- [ ] Offline mode

---

**DR Ai** - Dream Architect Intelligence
Built with ❤️ using React, Next.js, and Google Gemini LLM
