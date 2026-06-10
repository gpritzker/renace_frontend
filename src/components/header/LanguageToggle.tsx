'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export const LanguageToggle = () => {
  const { locale, setLocale } = useLanguage()

  return (
    <button
      onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
      className='hidden md:flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors px-2 py-1 rounded-md hover:bg-gray-100'
      title={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className={locale === 'es' ? 'text-gray-800 font-semibold' : 'text-gray-400'}>ES</span>
      <span className='text-gray-300'>|</span>
      <span className={locale === 'en' ? 'text-gray-800 font-semibold' : 'text-gray-400'}>EN</span>
    </button>
  )
}
