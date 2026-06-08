import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'

export default function BillingCancelPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto'>
          <XCircle className='w-10 h-10 text-gray-400' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Pago cancelado</h1>
          <p className='text-gray-500'>
            No se realizó ningún cobro. Podés suscribirte cuando quieras.
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          <Button asChild className='bg-gradient-to-r from-purple-600 to-purple-700 text-white'>
            <Link href='/pricing'>Ver planes</Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/'>Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
