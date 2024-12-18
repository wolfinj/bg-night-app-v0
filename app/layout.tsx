import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { LanguageProvider } from '@/context/LanguageContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobile Web App',
  description: 'A mobile web app with side navigation',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navigation />
            <main className="p-4 pt-16">
              {children}
            </main>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
      </body>
      </html>
  )
}

