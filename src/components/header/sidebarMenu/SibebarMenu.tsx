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
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const guestMenu = [
  { slug: null, title: 'Cómo funciona', url: '/how-it-works', order: 0, childs: [] },
  { slug: null, title: 'Iniciar sesión', url: '/login', order: 1, childs: [] },
  { slug: null, title: 'Registro', url: '/register', order: 2, childs: [] }
]

const authMenu = [
  { slug: null, title: 'Cómo funciona', url: '/how-it-works', order: 0, childs: [] },
  { slug: null, title: 'Crear cápsula', url: '/create-capsule', order: 1, childs: [] },
  { slug: null, title: 'Mis cápsulas', url: '/my-capsules', order: 2, childs: [] },
  { slug: null, title: 'Mi voz', url: '/my-voice', order: 3, childs: [] },
  { slug: null, title: 'Mi perfil', url: '/my-profile', order: 4, childs: [] },
]

export const SidebarMenu = async () => {
  const session = await getServerSession(authOptions)
  const menu = session ? authMenu : guestMenu

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='flex md:hidden order-1' variant={'ghost'} size={'icon'}>
          <FiMenu className='size-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className={'px-0'}>
        <SheetHeader className={'hidden'}>
          <SheetTitle>Renace</SheetTitle>
          <SheetDescription>Menú de navegación</SheetDescription>
        </SheetHeader>
        <NavMobile menu={menu} />
      </SheetContent>
    </Sheet>
  )
}
