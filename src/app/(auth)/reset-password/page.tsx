'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorAlert } from '@/components/error-alert/ErrorAlert'
import { resetPassword } from '@/actions/auth/password'
import Link from 'next/link'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('reset_password_token') ?? ''

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden')
      return
    }
    setIsSubmitting(true)
    setError(null)
    try {
      await resetPassword({ token, password, passwordConfirmation })
      router.push('/login?reset=ok')
    } catch (err: any) {
      setError(err.message || 'Error al restablecer la contraseña')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <div className='text-center space-y-4'>
        <p className='text-red-600'>Token inválido o expirado.</p>
        <Button asChild variant='link'>
          <Link href='/forgot-password'>Solicitar nuevo link</Link>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <Label htmlFor='password'>Nueva contraseña</Label>
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(null) }}
          className='mt-1.5 w-full'
          required
          minLength={6}
        />
      </div>
      <div>
        <Label htmlFor='passwordConfirmation'>Confirmar contraseña</Label>
        <Input
          id='passwordConfirmation'
          type='password'
          value={passwordConfirmation}
          onChange={(e) => { setPasswordConfirmation(e.target.value); setError(null) }}
          className='mt-1.5 w-full'
          required
        />
      </div>
      <ErrorAlert error={error} />
      <Button type='submit' disabled={isSubmitting} className='w-full'>
        {isSubmitting ? 'Guardando...' : 'Restablecer contraseña'}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Nueva contraseña</h2>
          <p className='text-gray-600'>Ingresá tu nueva contraseña.</p>
        </div>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  )
}
