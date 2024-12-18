'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '@/lib/types'
import { users } from '@/lib/data'

interface AuthContextType {
  currentUser: User | null
  isLoggedIn: boolean
  login: (userId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const storedUserId = localStorage.getItem('currentUserId')
    if (storedUserId) {
      const user = users.find(u => u.id === storedUserId)
      if (user) {
        setCurrentUser(user)
        setIsLoggedIn(true)
      }
    }
  }, [])

  const login = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      setIsLoggedIn(true)
      localStorage.setItem('currentUserId', userId)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('currentUserId')
  }

  return (
      <AuthContext.Provider value={{ currentUser, isLoggedIn, login, logout }}>
        {children}
      </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

