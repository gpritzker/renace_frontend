'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ErrorAlert } from '@/components/error-alert/ErrorAlert'
import { sendPasswordReset } from '@/actions/auth/password'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      await sendPasswordReset(email)
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Error al enviar el email')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Recuperar contraseña</h2>
          <p className='text-gray-600'>Ingresá tu email y te enviaremos las instrucciones.</p>
        </div>

        {sent ? (
          <div className='text-center space-y-4'>
            <p className='text-green-700 font-medium'>¡Email enviado!</p>
            <p className='text-gray-600 text-sm'>
              Revisá tu bandeja de entrada y seguí las instrucciones para restablecer tu contraseña.
            </p>
            <Button asChild variant='link'>
              <Link href='/login'>Volver al login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                className='mt-1.5 w-full'
                required
              />
            </div>
            <ErrorAlert error={error} />
            <Button type='submit' disabled={isSubmitting} className='w-full'>
              {isSubmitting ? 'Enviando...' : 'Enviar instrucciones'}
            </Button>
            <div className='text-center'>
              <Button asChild variant='link'>
                <Link href='/login'>Volver al login</Link>
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
