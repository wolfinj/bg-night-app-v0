'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { groups } from '@/lib/data'
import { Group, User } from '@/lib/types'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default function ProfilePage() {
  const [userGroups, setUserGroups] = useState<Group[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)
  const router = useRouter()
  const { currentUser, isLoggedIn } = useAuth()
  const { dict } = useLanguage()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
    } else if (currentUser) {
      setEditedUser(currentUser)
      const userGroups = groups.filter(group =>
          group.members.some(member => member.userId === currentUser.id)
      )
      setUserGroups(userGroups)
    }
  }, [isLoggedIn, currentUser, router])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedUser) {
      // In a real application, you would update the user data in your database here
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedUser(currentUser)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value })
    }
  }

  if (!currentUser) {
    return <div className="bg-background text-foreground min-h-screen">{dict.common.loading}</div>
  }

  return (
      <div className="container mx-auto p-4 bg-background text-foreground min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-primary">{dict.profile.profile}</h1>
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 border border-border">
          <div className="flex items-center space-x-4 mb-4">
            <Image
                src={currentUser.profileImage}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
            />
            <div>
              {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="name">{dict.profile.name}</Label>
                    <Input id="name" name="name" value={editedUser?.name} onChange={handleChange} />
                    <Label htmlFor="surname">{dict.profile.surname}</Label>
                    <Input id="surname" name="surname" value={editedUser?.surname} onChange={handleChange} />
                    <Label htmlFor="bggName">{dict.profile.bggName}</Label>
                    <Input id="bggName" name="bggName" value={editedUser?.bggName} onChange={handleChange} />
                    <Label htmlFor="discordId">{dict.profile.discordId}</Label>
                    <Input id="discordId" name="discordId" value={editedUser?.discordId} onChange={handleChange} />
                  </div>
              ) : (
                  <>
                    <h2 className="text-xl font-semibold">{currentUser.name} {currentUser.surname}</h2>
                    <p className="text-muted-foreground">
                      {dict.profile.bggName}: <Link href={`https://boardgamegeek.com/user/${currentUser.bggName}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{currentUser.bggName}</Link>
                    </p>
                    <p className="text-muted-foreground">{dict.profile.discordId}: {currentUser.discordId}</p>
                  </>
              )}
            </div>
          </div>
          {isEditing ? (
              <div className="space-x-2">
                <Button onClick={handleSave}>{dict.profile.save}</Button>
                <Button variant="outline" onClick={handleCancel}>{dict.profile.cancel}</Button>
              </div>
          ) : (
              <Button onClick={handleEdit} className="bg-primary text-primary-foreground hover:bg-primary/90">
                {dict.profile.editProfile}
              </Button>
          )}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{dict.profile.theme}</h3>
            <ThemeSwitcher />
          </div>
          <h3 className="text-lg font-semibold mt-4 mb-2">{dict.profile.myGroups}</h3>
          <ul className="space-y-2">
            {userGroups.map(group => (
                <li key={group.id} className="bg-muted text-muted-foreground p-2 rounded">
                  {group.name}
                </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">{dict.profile.myRecentGames}</h3>
          <ul className="space-y-2">
            {currentUser.games.slice(0, 5).map(game => (
                <li key={game.bggId} className="bg-muted text-muted-foreground p-2 rounded">
                  {dict.profile.bggId}: {game.bggId}, {dict.profile.ownedSince}: {game.dateOwned.toDateString()},
                  {dict.profile.canTeachRules}: {game.canTeachRules ? dict.common.yes : dict.common.no}
                </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/my-games" className="text-blue-500 hover:underline">
              {dict.profile.viewAllGames}
            </Link>
          </div>
          <Button
              variant="default"
              className="mt-4"
              onClick={() => router.push('/')}
          >
            {dict.profile.backToHome}
          </Button>
        </div>
      </div>
  )
}

