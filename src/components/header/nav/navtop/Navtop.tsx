import { Button } from '@/components/ui/button'
import { SidebarMenu } from '@/components/header/sidebarMenu/SibebarMenu'
import { SessionNav } from '@/components/auth/SessionNav'
import Link from 'next/link'

export const Navtop = async () => {
  return (
    <div className='flex justify-between items-center  py-2 px-4'>
      {/*Menu lateral mobile*/}
      <SidebarMenu />
      <>
        <Button
          className='hidden md:flex'
          variant={'ghost'}
          type='button'
          asChild
        >
          <Link href='/'>Renacer</Link>
        </Button>
      </>
      <div className='flex space-x-3 order-3 md:order-4'>
        <SessionNav />
      </div>
    </div>
  )
}
