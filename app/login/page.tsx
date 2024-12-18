'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { users } from '@/lib/data'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

export default function LoginPage() {
    const router = useRouter()
    const { login } = useAuth()
    const { dict } = useLanguage()

    const handleLogin = (userId: string) => {
        login(userId)
        router.push('/profile')
    }

    return (
        <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-primary">{dict.auth.login}</h1>
            <div className="space-y-2">
                {users.map(user => (
                    <Button
                        key={user.id}
                        variant="outline"
                        className="w-full justify-start bg-card text-card-foreground hover:bg-muted"
                        onClick={() => handleLogin(user.id)}
                    >
                        {dict.auth.loginAs} {user.name} {user.surname}
                    </Button>
                ))}
            </div>
        </div>
    )
}

