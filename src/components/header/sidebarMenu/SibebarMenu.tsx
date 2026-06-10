'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { FiMenu } from 'react-icons/fi'
import { NavMobile } from '@/components/header/nav/navMobile/NavMobile'
import { useSession } from 'next-auth/react'
import { useLanguage } from '@/contexts/LanguageContext'

export const SidebarMenu = () => {
  const { data: session } = useSession()
  const { t } = useLanguage()
  const n = t.nav

  const guestMenu = [
    { slug: null, title: n.howItWorks, url: '/how-it-works', order: 0, childs: [] },
    { slug: null, title: n.plans, url: '/pricing', order: 1, childs: [] },
    { slug: null, title: n.login, url: '/login', order: 2, childs: [] },
    { slug: null, title: n.register, url: '/register', order: 3, childs: [] },
  ]

  const authMenu = [
    { slug: null, title: n.howItWorks, url: '/how-it-works', order: 0, childs: [] },
    { slug: null, title: n.createCapsule, url: '/create-capsule', order: 1, childs: [] },
    { slug: null, title: n.myCapsules, url: '/my-capsules', order: 2, childs: [] },
    { slug: null, title: n.myVoice, url: '/my-voice', order: 3, childs: [] },
    { slug: null, title: n.myProfile, url: '/my-profile', order: 4, childs: [] },
    { slug: null, title: n.plans, url: '/pricing', order: 5, childs: [] },
  ]

  const menu = session ? authMenu : guestMenu

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='flex md:hidden order-1' variant='ghost' size='icon'>
          <FiMenu className='size-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-0'>
        <SheetHeader className='hidden'>
          <SheetTitle>Renace</SheetTitle>
          <SheetDescription>Menú de navegación</SheetDescription>
        </SheetHeader>
        <NavMobile menu={menu} isLoggedIn={!!session} />
      </SheetContent>
    </Sheet>
  )
}
