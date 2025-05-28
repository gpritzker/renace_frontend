import { Nav } from '@/components/header/nav/Nav'

export const Header = () => {
  return (
    <header className='w-full bg-white py-1'>
      <div className='max-w-7xl mx-auto h-full flex flex-col'>
        <Nav />
      </div>
    </header>
  )
}
