'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Translations, enTranslations, lvTranslations } from '../lib/translations'

type Language = 'en' | 'lv'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  dict: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const dictionaries: Record<Language, Translations> = {
  en: enTranslations,
  lv: lvTranslations,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [dict, setDict] = useState<Translations>(dictionaries.en)

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'lv')) {
      setLanguage(storedLanguage)
      setDict(dictionaries[storedLanguage])
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setDict(dictionaries[lang])
    localStorage.setItem('language', lang)
  }

  return (
      <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, dict }}>
        {children}
      </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

