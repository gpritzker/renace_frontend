'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search, FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 bg-gray-50 px-4 py-12'>
      <div className='w-full max-w-md mx-auto text-center'>
        <div className='flex justify-center mb-8'>
          <FileQuestion
            className='h-24 w-24 text-primary/80'
            strokeWidth={1.5}
          />
        </div>

        <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl mb-4'>
          Página no encontrada
        </h1>

        <p className='text-base text-gray-600 mb-8'>
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild variant='default' size='lg' className='gap-2'>
            <Link href='/'>
              <Home className='h-4 w-4' />
              Ir al inicio
            </Link>
          </Button>

          <Button asChild variant='outline' size='lg' className='gap-2'>
            <Link href='/catalog'>
              <Search className='h-4 w-4' />
              Explorar productos
            </Link>
          </Button>
        </div>

        <Button
          variant='link'
          className='mt-8 text-gray-500 hover:text-gray-700'
          onClick={() => window.history.back()}
        >
          <ArrowLeft className='h-4 w-4 mr-2' />
          Volver a la página anterior
        </Button>
      </div>
    </div>
  )
}
