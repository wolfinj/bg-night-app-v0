'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { users } from '@/lib/data'
import { User } from '@/lib/types'
import { useLanguage } from '@/context/LanguageContext'

export default function MyGamesPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const router = useRouter()
    const { dict } = useLanguage()

    useEffect(() => {
        const storedUserId = localStorage.getItem('currentUserId')
        if (storedUserId) {
            const user = users.find(u => u.id === storedUserId)
            if (user) {
                setCurrentUser(user)
            } else {
                router.push('/login')
            }
        } else {
            router.push('/login')
        }
    }, [router])

    if (!currentUser) {
        return <div className="bg-background text-foreground min-h-screen">{dict.common.loading}</div>
    }

    return (
        <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-primary">{dict.navigation.myGames}</h1>
            <ul className="space-y-2">
                {currentUser.games.map(game => (
                    <li key={game.bggId} className="bg-card text-card-foreground shadow-md rounded-lg p-4">
                        <Link href={`https://boardgamegeek.com/boardgame/${game.bggId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {dict.games.bggId}: {game.bggId}
                        </Link>
                        <p className="text-muted-foreground">{dict.games.ownedSince}: {game.dateOwned.toDateString()}</p>
                        <p className="text-muted-foreground">{dict.games.canTeachRules}: {game.canTeachRules ? dict.common.yes : dict.common.no}</p>
                    </li>
                ))}
            </ul>
            <Button
                variant="default"
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => router.push('/profile')}
            >
                {dict.profile.backToHome}
            </Button>
        </div>
    )
}

