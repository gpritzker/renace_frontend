'use client'

import { useState, useCallback } from 'react'
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
import { useLanguage } from '@/contexts/LanguageContext'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { verifyRecaptcha } from '@/actions/auth/verifyRecaptcha'

const FormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Mínimo 2 caracteres.' }),
    lastName: z.string().min(2, { message: 'Mínimo 2 caracteres.' }),
    dni: z.string().min(7, { message: 'DNI inválido.' }).optional().or(z.literal('')),
    birthDate: z.string().optional().or(z.literal('')),
    phone: z.string().min(6, { message: 'Teléfono inválido.' }).optional().or(z.literal('')),
    email: z.string().email({ message: 'Email inválido.' }),
    password: z.string().min(10, { message: 'Mínimo 10 caracteres.' }),
    passwordConfirmation: z.string()
  })
  .refine((d) => d.password === d.passwordConfirmation, {
    message: 'Las contraseñas no coinciden.',
    path: ['passwordConfirmation']
  })

type FormData = z.infer<typeof FormSchema>

export const RegisterForm = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '', lastName: '', dni: '', birthDate: '', phone: '',
      email: '', password: '', passwordConfirmation: ''
    }
  })

  const handleSubmit = useCallback(async (data: FormData) => {
    setError(null)

    // Verificar reCAPTCHA antes de crear la cuenta
    if (executeRecaptcha) {
      const token = await executeRecaptcha('register')
      const result = await verifyRecaptcha(token, 'register')
      if (!result.success) {
        setError(result.error ?? 'Verificación de seguridad fallida')
        return
      }
    }

    try {
      await register({
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
        firstName: data.firstName,
        lastName: data.lastName,
        dni: data.dni || undefined,
        birthDate: data.birthDate || undefined,
        phone: data.phone || undefined,
      })
      setSuccess(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al registrarse')
    }
  }, [executeRecaptcha])

  if (success) {
    return (
      <div className='text-center space-y-2'>
        <p className='text-green-700 font-medium'>{t.auth.successTitle}</p>
        <p className='text-gray-600 text-sm'>{t.auth.successSubtitle}</p>
        <Button variant='link' onClick={() => router.push('/login')}>
          {t.auth.goToLogin}
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col items-center justify-center text-gray-900 w-full gap-y-5'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.firstName} *</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} placeholder='Juan' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.lastName} *</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} placeholder='Pérez' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dni'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.dni}</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} placeholder='12345678' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='birthDate'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.birthDate}</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} type='date' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>{t.auth.phone}</FormLabel>
              <FormControl>
                <Input onFocus={() => setError(null)} placeholder='+54 11 1234-5678' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>{t.auth.email} *</FormLabel>
              <FormControl>
                <Input onFocus={() => setError(null)} type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.password} *</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.auth.confirmPassword} *</FormLabel>
                <FormControl>
                  <Input onFocus={() => setError(null)} type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ErrorAlert error={error} />
        <Button
          type='submit'
          className='hover:bg-purple-300 w-full cursor-pointer'
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? t.auth.registering : t.auth.registerSubmit}
        </Button>
      </form>
    </Form>
  )
}
