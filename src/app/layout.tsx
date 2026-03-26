import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Lex Dominion Partners | Law & Leadership',
    template: '%s | Lex Dominion Partners',
  },
  description:
    'Lex Dominion Partners is a premier law firm delivering exceptional legal services with a commitment to leadership, integrity, and client success.',
  keywords: [
    'law firm',
    'legal services',
    'attorney',
    'lawyer',
    'corporate law',
    'litigation',
    'Lex Dominion Partners',
  ],
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Lex Dominion Partners | Law & Leadership',
    description:
      'Premier law firm delivering exceptional legal services with a commitment to leadership, integrity, and client success.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
