import { Header } from '@/components/header/Header'
import { PrimaryFont } from './fonts'
import './globals.css'
import { Toaster } from 'sonner'

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang='es-AR'>
        <body
          className={`${PrimaryFont.className} antialiased flex flex-col min-h-screen bg-[#f7f7f7]`}
        >
          <Header />
          <main className='flex-1 flex flex-col w-full max-w-7xl mx-auto'>
            {children}
          </main>
          <Toaster richColors />
        </body>
      </html>
  )
}
