'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export const MyVoicePageHeader = () => {
  const { t } = useLanguage()
  return (
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-gray-800'>{t.voice.pageTitle}</h1>
      <p className='mt-2 text-gray-600'>{t.voice.pageSubtitle}</p>
    </div>
  )
}
