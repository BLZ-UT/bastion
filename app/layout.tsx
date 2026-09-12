import type { Metadata } from 'next'
import { Barlow, Oswald, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'INFRAANALYSIS — Infrastructure Intelligence',
  description:
    'Live public market intelligence for critical infrastructure: Energy, Defense, AI Infrastructure, Space, and Cybersecurity.',
  keywords: [
    'infrastructure',
    'energy',
    'defense',
    'AI infrastructure',
    'space',
    'cybersecurity',
    'public markets',
    'comps',
  ],
  openGraph: {
    title: 'INFRAANALYSIS — Infrastructure Intelligence',
    description: 'Live public market intelligence for critical infrastructure sectors.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${oswald.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans bg-bg-base text-txt-primary min-h-screen flex flex-col grain-overlay">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
