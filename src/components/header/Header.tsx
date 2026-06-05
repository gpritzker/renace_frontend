import { Nav } from '@/components/header/nav/Nav'

export const Header = () => {
  return (
    <header className='w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto h-full flex flex-col'>
        <Nav />
      </div>
    </header>
  )
}
