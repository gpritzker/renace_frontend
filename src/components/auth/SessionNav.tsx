'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { FiUser } from 'react-icons/fi'
import { LogOut, KeyRound, Pill, Settings, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { notifyBackendLogout } from '@/actions/auth/login'
import { useLanguage } from '@/contexts/LanguageContext'

export const SessionNav = () => {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const isLoggedIn = !!session

  const accountRoutes = [
    { link: '/my-capsules', title: t.nav.myCapsules },
    { link: '/my-voice', title: t.nav.myVoice },
    { link: '/my-profile', title: t.nav.myProfile },
  ]

  const handleLogout = async () => {
    await notifyBackendLogout()
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <Button className='hidden md:flex' variant='ghost' type='button' asChild>
        <Link href='/how-it-works'>
          <Settings className='size-6' />
          {t.nav.howItWorks}
        </Link>
      </Button>

      <Button className='hidden md:flex' variant='ghost' type='button' asChild>
        <Link href='/pricing'>
          <Crown className='size-5' />
          {t.nav.plans}
        </Link>
      </Button>

      {isLoggedIn ? (
        <>
          <Button className='hidden md:flex' variant='ghost' type='button' asChild>
            <Link href='/create-capsule'>
              <Pill className='size-6' />
              {t.nav.createCapsule}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='hidden md:flex space-x-1 items-center px-1 py-2 hover:bg-transparent cursor-pointer focus-visible:ring-0'
              >
                <FiUser className='size-6' />
                <div className='flex flex-col gap-y-0.5 text-left'>
                  <span className='text-purple-500 font-semibold'>
                    {session.user?.email?.split('@')[0] ?? 'Mi cuenta'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                {accountRoutes.map((route, i) => (
                  <DropdownMenuItem key={i} asChild className='cursor-pointer hover:bg-gray-100!'>
                    <Link href={route.link}>{route.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className='cursor-pointer hover:bg-gray-100!'>
                <LogOut />
                <span>{t.nav.logout}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button className='hidden md:flex' variant='ghost' type='button' asChild>
            <Link href='/login'>
              <FiUser className='size-6' />
              {t.nav.login}
            </Link>
          </Button>
          <Button className='hidden md:flex' variant='ghost' type='button' asChild>
            <Link href='/register'>
              <KeyRound className='size-6' />
              {t.nav.register}
            </Link>
          </Button>
        </>
      )}
    </>
  )
}
