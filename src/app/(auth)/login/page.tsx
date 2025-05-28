import LoginForm from '@/components/auth/login/LoginForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function LoginPage() {

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            ¡Bienvenido/a de vuelta!
          </h2>
          <p className='text-gray-600'>Ingresa tus datos para acceder.</p>
        </div>

        <LoginForm />

        <div className='text-center space-y-4'>
          <p className='text-sm text-gray-600'>¿Aún no tienes cuenta?</p>
          <Button asChild type='button' variant='outline' className='w-full'>
            <Link href='/register'>Crear una cuenta</Link>
          </Button>
          <Link
            href='/recover-password'
            className='inline-block text-sm text-purple-600 hover:text-purple-800 hover:underline'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </section>
  )
}
