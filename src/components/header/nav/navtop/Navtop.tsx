import { SidebarMenu } from '@/components/header/sidebarMenu/SibebarMenu'
import { SessionNav } from '@/components/auth/SessionNav'
import { LanguageToggle } from '@/components/header/LanguageToggle'
import Link from 'next/link'

export const Navtop = () => {
  return (
    <div className='flex justify-between items-center py-3 px-4'>
      <SidebarMenu />
      <Link href='/' className='flex items-center gap-2 select-none'>
        <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500'>
          <svg viewBox='0 0 24 24' fill='none' className='w-5 h-5 text-white' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6l4 2M12 2a10 10 0 100 20A10 10 0 0012 2z' />
          </svg>
        </div>
        <span className='text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent tracking-tight'>
          Renace
        </span>
      </Link>
      <div className='flex items-center gap-1'>
        <LanguageToggle />
        <SessionNav />
      </div>
    </div>
  )
}
