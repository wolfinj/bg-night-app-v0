'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, ChevronDown, ChevronRight, LogOut, Settings, User, Pin, PinOff, Home, Users, Calendar, FileText, LinkIcon, Dices } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { groups } from '@/lib/data'
import { Group } from '@/lib/types'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/context/AuthContext'
import { LanguageSelector } from './LanguageSelector'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAllGroups, setShowAllGroups] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([])
  const router = useRouter()
  const { dict } = useLanguage()
  const { currentUser, isLoggedIn, logout } = useAuth()
  const [userGroups, setUserGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (currentUser) {
      const filteredGroups = groups.filter(group => group.members.some(member => member.userId === currentUser.id));
      setUserGroups(filteredGroups);
    }
  }, [currentUser]);

  const togglePin = (groupId: string, subItem?: string) => {
    setUserGroups(prevGroups => prevGroups.map(group => {
      if (group.id === groupId && currentUser) {
        return {
          ...group,
          members: group.members.map(member =>
              member.userId === currentUser.id
                  ? {
                    ...member,
                    isPinned: subItem ? member.isPinned : !member.isPinned,
                    pinnedItems: subItem
                        ? member.pinnedItems
                            ? member.pinnedItems.includes(subItem)
                                ? member.pinnedItems.filter(item => item !== subItem)
                                : [...member.pinnedItems, subItem]
                            : [subItem]
                        : member.pinnedItems
                  }
                  : member
          )
        };
      }
      return group;
    }));
  };

  const toggleCollapse = (groupId: string) => {
    setExpandedGroups(prev =>
        prev.includes(groupId)
            ? prev.filter(id => id !== groupId)
            : [...prev, groupId]
    );
  }

  const pinnedGroups = userGroups.filter(group => group.members.some(member => member.userId === currentUser?.id && member.isPinned));
  const unpinnedGroups = userGroups.filter(group => group.members.some(member => member.userId === currentUser?.id && !member.isPinned));

  const visibleGroups = showAllGroups
      ? userGroups
      : [...pinnedGroups, ...unpinnedGroups.slice(0, Math.max(0, 4 - pinnedGroups.length))];

  return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 p-2">
            <Menu className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background text-foreground flex flex-col h-full">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-foreground">{dict.navigation.home}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-4 overflow-y-auto flex-grow scrollbar-hide">
            {isLoggedIn && currentUser ? (
                <div className="flex items-center space-x-4 p-4 bg-card text-card-foreground rounded-lg shadow-md">
                  <Image
                      src={currentUser.profileImage}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="rounded-full"
                  />
                  <div className="flex flex-col space-y-2">
                    <span className="font-bold text-lg">{`${currentUser.name} ${currentUser.surname}`}</span>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsOpen(false); router.push('/profile'); }}>
                      <Settings className="h-4 w-4 mr-2" />
                      {dict.navigation.profile}
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { logout(); setIsOpen(false); router.push('/'); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {dict.auth.logout}
                    </Button>
                  </div>
                </div>
            ) : (
                <Link href="/login" passHref>
                  <Button variant="default" className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setIsOpen(false)}>
                    <User className="h-5 w-5 mr-2" />
                    {dict.auth.login}
                  </Button>
                </Link>
            )}
            <div className="space-y-2">
              <Link href="/" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
                <Home className="h-5 w-5 mr-2" />
                {dict.navigation.home}
              </Link>
              <Link href="/public-groups" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
                <Users className="h-5 w-5 mr-2" />
                {dict.navigation.publicGroups}
              </Link>
            </div>
            {isLoggedIn && (
                <Collapsible defaultOpen={true} className="space-y-2">
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  {dict.navigation.myGroups}
                </span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pl-4">
                    {visibleGroups.map((group) => (
                        <Collapsible key={group.id} open={expandedGroups.includes(group.id)}>
                          <CollapsibleTrigger
                              className="flex items-center justify-between w-full py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground group"
                              onClick={() => toggleCollapse(group.id)}
                          >
                            <span>{group.name}</span>
                            <div className="flex items-center">
                              <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePin(group.id);
                                  }}
                                  className="relative w-6 h-6 flex items-center justify-center group/pin"
                              >
                                {group.members.find(m => m.userId === currentUser?.id)?.isPinned ? (
                                    <Pin className="h-4 w-4 text-muted-foreground/50 absolute transition-all group-hover/pin:text-primary" />
                                ) : (
                                    <Pin className="h-4 w-4 text-muted-foreground/30 absolute transition-all opacity-0 group-hover:opacity-100 group-hover/pin:text-primary" />
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {['games', 'events', 'members'].map((item) => {
                              const isPinned = group.members.find(m => m.userId === currentUser?.id)?.pinnedItems?.includes(item);
                              return (
                                  <div key={item} className={`relative group/item ${isPinned || expandedGroups.includes(group.id) ? 'block' : 'hidden'}`}>
                                    <Link
                                        href={`/groups/${group.id}/${item}`}
                                        className="block py-2 pl-12 rounded-md hover:bg-secondary hover:text-secondary-foreground"
                                        onClick={() => setIsOpen(false)}
                                    >
                                      {dict.navigation[`group${item.charAt(0).toUpperCase() + item.slice(1)}` as keyof typeof dict.navigation]}
                                    </Link>
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100">
                                      <Pin
                                          className={`h-4 w-4 cursor-pointer ${isPinned ? 'text-primary' : 'text-muted-foreground/30 hover:text-primary'}`}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            togglePin(group.id, item);
                                          }}
                                      />
                                    </div>
                                  </div>
                              );
                            })}
                          </CollapsibleContent>
                        </Collapsible>
                    ))}
                    {userGroups.length > 4 && (
                        <Button
                            variant="link"
                            className="w-full text-left pl-4 py-2 text-muted-foreground"
                            onClick={() => setShowAllGroups(!showAllGroups)}
                        >
                          {showAllGroups ? dict.navigation.showLess : dict.navigation.showAllGroups}
                        </Button>
                    )}
                  </CollapsibleContent>
                </Collapsible>
            )}
            <Link href="/my-games" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
              <Dices className="h-5 w-5 mr-2" />
              {dict.navigation.myGames}
            </Link>
            <div className="space-y-2">
              <Link href="/calendar" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
                <Calendar className="h-5 w-5 mr-2" />
                {dict.navigation.calendar}
              </Link>
              <Link href="/events" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
                <FileText className="h-5 w-5 mr-2" />
                {dict.navigation.events}
              </Link>
              <Link href="/links" className="flex items-center py-2 px-4 rounded-md bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground" onClick={() => setIsOpen(false)}>
                <LinkIcon className="h-5 w-5 mr-2" />
                {dict.navigation.links}
              </Link>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-foreground">{dict.language.label}</span>
                <LanguageSelector />
              </div>
              {isLoggedIn && (
                  <div className="flex justify-between items-center">
                    <span className="text-foreground">{dict.theme.label}</span>
                    <ThemeSwitcher />
                  </div>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
  )
}

