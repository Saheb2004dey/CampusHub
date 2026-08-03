import { Analytics } from '@vercel/analytics/next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'CampusHub AI — Your AI-Powered Campus Learning Platform',
  description:
    'CampusHub AI turns your class notes into an intelligent knowledge base. Solve doubts with cited, confidence-scored answers, generate quizzes, get matched to the right teacher, and track your progress — built for students, teachers, and admins.',
  generator: 'v0.app',
  keywords: [
    'AI learning platform',
    'RAG doubt solving',
    'campus knowledge base',
    'AI quiz generator',
    'student learning analytics',
  ],
  openGraph: {
    title: 'CampusHub AI — Your AI-Powered Campus Learning Platform',
    description:
      'Turn class notes into an intelligent, cited knowledge base. RAG doubt-solving, AI quizzes, agentic study guidance, and analytics for students, teachers, and admins.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#141b2e' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
