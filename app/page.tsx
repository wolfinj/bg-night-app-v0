'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Home() {
  const { dict } = useLanguage()

  return (
      <div className="bg-background text-foreground min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-primary">{dict.welcomeMessage}</h1>
        <p className="text-muted-foreground">{dict.navigationInstruction}</p>
      </div>
  )
}

