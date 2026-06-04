'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { ErrorAlert } from '@/components/error-alert/ErrorAlert'
import { register } from '@/actions/auth/register'

const FormSchema = z
  .object({
    email: z.string().email({ message: 'Ingrese un email válido.' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
    passwordConfirmation: z.string()
  })
  .refine((d) => d.password === d.passwordConfirmation, {
    message: 'Las contraseñas no coinciden.',
    path: ['passwordConfirmation']
  })

type FormData = z.infer<typeof FormSchema>

export const RegisterForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '', passwordConfirmation: '' }
  })

  const handleSubmit = async (data: FormData) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation
      })
      setSuccess(true)
    } catch (e: any) {
      setError(e.message || 'Error al registrarse')
    }
  }

  if (success) {
    return (
      <div className='text-center space-y-2'>
        <p className='text-green-700 font-medium'>¡Cuenta creada!</p>
        <p className='text-gray-600 text-sm'>
          Revisá tu email para confirmar tu cuenta antes de iniciar sesión.
        </p>
        <Button variant='link' onClick={() => router.push('/login')}>
          Ir al login
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col items-center justify-center text-gray-900 w-full gap-y-6'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setError(null)}
                  className='text-black w-full'
                  type='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setError(null)}
                  className='text-black'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='passwordConfirmation'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setError(null)}
                  className='text-black'
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ErrorAlert error={error} />
        <Button
          type='submit'
          className='hover:bg-purple-300 w-full cursor-pointer'
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? 'Registrando...' : 'Crear cuenta'}
        </Button>
      </form>
    </Form>
  )
}
