import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Crown } from 'lucide-react'

export default function BillingSuccessPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-purple-100'>
          <Crown className='w-10 h-10 text-white' />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>¡Bienvenido a Premium!</h1>
          <p className='text-gray-500'>
            Tu suscripción está activa. Todas tus cápsulas pendientes ya fueron aprobadas y podés crear nuevas sin límite.
          </p>
        </div>
        <div className='bg-white border border-purple-100 rounded-2xl p-5 text-left space-y-3'>
          <div className='flex items-center gap-2 text-sm text-gray-700'>
            <CheckCircle className='w-4 h-4 text-green-500' />
            Cápsulas ilimitadas activadas
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-700'>
            <CheckCircle className='w-4 h-4 text-green-500' />
            Notificaciones automáticas habilitadas
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-700'>
            <CheckCircle className='w-4 h-4 text-green-500' />
            Cápsulas pendientes aprobadas
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Button asChild className='bg-gradient-to-r from-purple-600 to-purple-700 text-white'>
            <Link href='/create-capsule'>Crear mi primera cápsula Premium</Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/my-capsules'>Ver mis cápsulas</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
