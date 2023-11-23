import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import NextAuthSessionProvider from './providers/sessionProvider'
import AuthenticatedNavbar from './components/AuthenticatedNavbar'

const poppins = Poppins({ weight: ['500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AtletiGo',
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

        <ToastContainer />
      </body>
    </html>
  )
}
