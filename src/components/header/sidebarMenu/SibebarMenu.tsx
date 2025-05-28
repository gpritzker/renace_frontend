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

const mobileMenuItems = [
  {
    slug: null,
    title: 'Cómo funciona',
    url: '/login',
    order: 0,
    childs: []
  },
  {
    slug: null,
    title: 'Crear cápsula',
    url: '/login',
    order: 1,
    childs: []
  },
  {
    slug: null,
    title: 'Iniciar sesión',
    url: '/login',
    order: 2,
    childs: []
  },
  {
    slug: null,
    title: 'Registro',
    url: '/register',
    order: 3,
    childs: []
  }
]


export const SidebarMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='flex md:hidden order-1'
          variant={'ghost'}
          size={'icon'}
        >
          <FiMenu className='size-6' />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className={'px-0'}>
        <SheetHeader className={'hidden'}>
          <SheetTitle>CAPSULES</SheetTitle>
          <SheetDescription>MENU DE NAVAGACION</SheetDescription>
        </SheetHeader>
        <NavMobile menu={mobileMenuItems} />
      </SheetContent>
    </Sheet>
  )
}
