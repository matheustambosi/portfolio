import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import AuthenticatedNavbar from './components/authenticatedNavbar'

const poppins = Poppins({ weight: ['500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AtletGo',
  manifest: '/manifest.json'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextAuthSessionProvider>
          <AuthenticatedNavbar></AuthenticatedNavbar>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
