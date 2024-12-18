'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useLanguage } from '@/context/LanguageContext'

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'lv' : 'en')
  }

  return (
      <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="w-16"
      >
        {language === 'en' ? 'LV' : 'EN'}
      </Button>
  )
}

