import { RegisterForm } from '@/components/auth/register/RegisterForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Crear cuenta</h2>
          <p className='text-gray-600'>Completá tus datos para registrarte.</p>
        </div>

        <RegisterForm />

        <div className='text-center'>
          <p className='text-sm text-gray-600'>¿Ya tenés cuenta?</p>
          <Button asChild type='button' variant='link'>
            <Link href='/login'>Iniciar sesión</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
