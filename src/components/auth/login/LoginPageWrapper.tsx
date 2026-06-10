'use client'

import LoginForm from './LoginForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface Props {
  confirmed?: string
}

export const LoginPageWrapper = ({ confirmed }: Props) => {
  const { t } = useLanguage()

  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6'>
        {confirmed === 'true' && (
          <div className='bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 text-center'>
            {t.auth.emailConfirmed}
          </div>
        )}
        {confirmed === 'false' && (
          <div className='bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 text-center'>
            {t.auth.invalidConfirmLink}
          </div>
        )}

        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>{t.auth.welcomeBack}</h2>
          <p className='text-gray-600'>{t.auth.loginSubtitle}</p>
        </div>

        <LoginForm />

        <div className='text-center space-y-4'>
          <p className='text-sm text-gray-600'>{t.auth.noAccountYet}</p>
          <Button asChild type='button' variant='outline' className='w-full'>
            <Link href='/register'>{t.auth.createAccount}</Link>
          </Button>
          <Link
            href='/forgot-password'
            className='inline-block text-sm text-purple-600 hover:text-purple-800 hover:underline'
          >
            {t.auth.forgotPassword}
          </Link>
        </div>
      </div>
    </section>
  )
}
