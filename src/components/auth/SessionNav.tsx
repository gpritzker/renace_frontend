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
import { LogOut, KeyRound, Pill, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const routes = [
  {
    link: '/route1',
    title: 'Mi cuenta'
  },
  {
    link: '/my-capsules',
    title: 'Mis Cápsulas'
  },
]

export const SessionNav = () => {
  const router = useRouter()
  return (
    <>
      {true ? (
        <>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/how-it-works'>
              <Settings className={'size-6'} />
              Cómo funciona
            </Link>
          </Button>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/create-capsule'>
              <Pill className={'size-6'} />
              Crear cápsula
            </Link>
          </Button>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/register'>
              <KeyRound className={'size-6'} />
              Registro
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className={
                  'hidden md:flex space-x-1 items-center px-1 py-2 hover:bg-transparent cursor-pointer focus-visible:ring-0'
                }
              >
                <FiUser className={'size-6'} />
                <div className='flex flex-col gap-y-0.5 text-left'>
                  <span className='text-purple-500 font-semibold'>
                    Hola User
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuGroup>
                {routes.map((route, i) => (
                  <DropdownMenuItem
                    key={i}
                    asChild
                    className={'cursor-pointer hover:bg-gray-100!'}
                  >
                    <Link href={route.link}>{route.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push('/')
                }}
                className={'cursor-pointer hover:bg-gray-100!'}
              >
                <LogOut />
                <span>Salir</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/how-it-works'>
              <Settings className={'size-6'} />
              Cómo funciona
            </Link>
          </Button>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/create-capsule'>
              <Pill className={'size-6'} />
              Crear cápsula
            </Link>
          </Button>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/login'>
              <FiUser className={'size-6'} />
              Iniciar sesión
            </Link>
          </Button>
          <Button
            className='hidden md:flex'
            variant={'ghost'}
            type='button'
            asChild
          >
            <Link href='/register'>
              <KeyRound className={'size-6'} />
              Registro
            </Link>
          </Button>
        </>
      )}
    </>
  )
}
