import LoginForm from '@/components/auth/login/LoginForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ confirmed?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { confirmed } = await searchParams

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        {confirmed === 'true' && (
          <div className='bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 text-center'>
            ✓ Email confirmado. Ya podés iniciar sesión.
          </div>
        )}
        {confirmed === 'false' && (
          <div className='bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 text-center'>
            El link de confirmación es inválido o ya fue usado.
          </div>
        )}

        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            ¡Bienvenido/a de vuelta!
          </h2>
          <p className='text-gray-600'>Ingresá tus datos para acceder.</p>
        </div>

        <LoginForm />

        <div className='text-center space-y-4'>
          <p className='text-sm text-gray-600'>¿Aún no tenés cuenta?</p>
          <Button asChild type='button' variant='outline' className='w-full'>
            <Link href='/register'>Crear una cuenta</Link>
          </Button>
          <Link
            href='/forgot-password'
            className='inline-block text-sm text-purple-600 hover:text-purple-800 hover:underline'
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </section>
  )
}
