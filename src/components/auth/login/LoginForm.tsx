'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { ErrorAlert } from '@/components/error-alert/ErrorAlert'

const FormSchema = z.object({
  email: z.string().email({
    message: 'Ingrese un email váildo.'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

type FormData = z.infer<typeof FormSchema>

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const { email, password } = data
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (!res?.ok) {
        setError('El usuario o contraseña son incorrectos')
        return
      }
      router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
                  {...field}
                  type='email'
                />
              </FormControl>
              <FormMessage className={'animate-fade'} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setError(null)}
                  className='text-black'
                  {...field}
                  type='password'
                />
              </FormControl>
              <FormMessage className={'animate-fade'} />
            </FormItem>
          )}
        />
        <ErrorAlert error={error} />
        <Button
          type='submit'
          className='hover:bg-purple-300 w-full cursor-pointer'
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting
            ? 'Iniciando sesión...'
            : 'Iniciar sesión'}
        </Button>
      </form>
    </Form>
  )
}
