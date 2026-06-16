'use client'

import { RegisterForm } from './RegisterForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { RecaptchaProvider } from '@/components/auth/RecaptchaProvider'

export const RegisterPageWrapper = () => {
  const { t } = useLanguage()

  return (
    <RecaptchaProvider>
      <section className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>{t.auth.registerTitle2}</h2>
            <p className='text-gray-600'>{t.auth.registerSubtitle}</p>
          </div>

          <RegisterForm />

          <div className='text-center'>
            <p className='text-sm text-gray-600'>{t.auth.alreadyHaveAccount}</p>
            <Button asChild type='button' variant='link'>
              <Link href='/login'>{t.auth.signIn}</Link>
            </Button>
          </div>
        </div>
      </section>
    </RecaptchaProvider>
  )
}
