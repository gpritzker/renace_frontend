'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Crown, Loader2 } from 'lucide-react'
import { getProfile } from '@/actions/profile/profile-actions'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BillingSuccessPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const b = t.billing
  const [isPremium, setIsPremium] = useState(false)
  const [checking, setChecking] = useState(true)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    const MAX_ATTEMPTS = 10
    const INTERVAL = 2000

    const check = async () => {
      try {
        const profile = await getProfile()
        if (profile.premium) {
          setIsPremium(true)
          setChecking(false)
          router.refresh()
          return
        }
      } catch {}

      setAttempts((prev) => {
        const next = prev + 1
        if (next >= MAX_ATTEMPTS) setChecking(false)
        return next
      })
    }

    check()
    const interval = setInterval(() => {
      setAttempts((prev) => {
        if (prev >= MAX_ATTEMPTS) {
          clearInterval(interval)
          return prev
        }
        return prev
      })
      check()
    }, INTERVAL)

    return () => clearInterval(interval)
  }, [])

  if (checking) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
        <div className='max-w-md w-full text-center space-y-6'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-purple-100 animate-pulse'>
            <Crown className='w-10 h-10 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>{b.paymentReceived}</h1>
            <p className='text-gray-500'>{b.activating}</p>
          </div>
          <Loader2 className='w-6 h-6 text-purple-500 animate-spin mx-auto' />
          <p className='text-xs text-gray-400'>{b.takingSeconds}</p>
        </div>
      </div>
    )
  }

  if (isPremium) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
        <div className='max-w-md w-full text-center space-y-6'>
          <div className='w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-purple-100'>
            <Crown className='w-10 h-10 text-white' />
          </div>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{b.welcomePremium}</h1>
            <p className='text-gray-500'>{b.subscriptionActive}</p>
          </div>
          <div className='bg-white border border-purple-100 rounded-2xl p-5 text-left space-y-3'>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              {b.unlimitedCapsules}
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              {b.autoNotifications}
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700'>
              <CheckCircle className='w-4 h-4 text-green-500' />
              {b.pendingApproved}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <Button asChild className='bg-gradient-to-r from-purple-600 to-purple-700 text-white'>
              <Link href='/create-capsule'>{b.createFirstPremium}</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/my-capsules'>{b.viewCapsules}</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-6'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto'>
          <Crown className='w-10 h-10 text-amber-500' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>{b.paymentProcessed}</h1>
          <p className='text-gray-500'>{b.paymentProcessedSubtitle}</p>
        </div>
        <div className='flex flex-col gap-3'>
          <Button onClick={() => window.location.reload()} className='bg-gradient-to-r from-purple-600 to-purple-700 text-white'>
            {b.reload}
          </Button>
          <Button asChild variant='outline'>
            <Link href='/my-capsules'>{b.goToCapsules}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
