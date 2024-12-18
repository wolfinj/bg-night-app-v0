'use client'

import React from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { currentUser } = useAuth()
  const { dict } = useLanguage()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // Here you would typically update the user's profile in your backend
    console.log(`Theme updated for user ${currentUser?.id}: ${newTheme}`)
  }

  return (
      <Button onClick={toggleTheme} variant="outline" size="sm">
        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="ml-2">{theme === 'light' ? dict.theme.dark : dict.theme.light}</span>
      </Button>
  )
}

