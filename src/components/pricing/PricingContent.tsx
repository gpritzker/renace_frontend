'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, Zap, Heart, Users, Crown, ShieldCheck } from 'lucide-react'
import { cancelSubscription } from '@/actions/billing/billing-actions'
import { toast } from 'sonner'
import { useLanguage } from '@/contexts/LanguageContext'

const PLAN_URLS = {
  personal: process.env.NEXT_PUBLIC_MP_URL_PERSONAL ?? '',
  familia: process.env.NEXT_PUBLIC_MP_URL_FAMILIA ?? '',
}

const planPrices = ['$0', 'USD 6', 'USD 12']
const planIds = [null, PLAN_URLS.personal, PLAN_URLS.familia]
const planHighlighted = [false, true, true]
const planBadgeIndex = 1
const planIcons = [
  <Heart key='heart' className='w-5 h-5 text-gray-400' />,
  <Zap key='zap' className='w-5 h-5 text-purple-500' />,
  <Users key='users' className='w-5 h-5 text-cyan-500' />,
]

interface Props {
  isLoggedIn: boolean
  isPremium: boolean
  userEmail?: string | null
}

export const PricingContent = ({ isLoggedIn, isPremium, userEmail }: Props) => {
  const router = useRouter()
  const { t } = useLanguage()
  const p = t.pricing
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = (planIndex: number) => {
    if (!isLoggedIn) {
      router.push('/register')
      return
    }
    const planId = planIds[planIndex]
    if (!planId) return
    const url = userEmail
      ? `${planId}&payer_email=${encodeURIComponent(userEmail)}`
      : planId
    window.location.href = url
  }

  const handleCancel = async () => {
    if (!confirm(p.cancelConfirm)) return
    setLoading('cancel')
    try {
      await cancelSubscription()
      toast.success(p.cancel)
      router.refresh()
    } catch (e: any) {
      toast.error(e.message || 'Error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 py-20 px-6 text-center text-white'>
        <span className='inline-block text-xs font-semibold tracking-widest uppercase mb-4 bg-white/10 border border-white/20 px-3 py-1 rounded-full'>
          {p.badge}
        </span>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          {p.heroTitle}<br />
          <span className='text-purple-100'>{p.heroTitleSub}</span>
        </h1>
        <p className='text-purple-100 max-w-xl mx-auto text-lg'>{p.heroText}</p>
        {isPremium && (
          <div className='mt-6 inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-medium'>
            <Crown className='w-4 h-4 text-amber-300' />
            {p.alreadyPremium}
          </div>
        )}
      </section>

      {/* Planes */}
      <section className='py-16 px-6'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          {p.plans.map((plan, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl border-2 shadow-sm p-7 flex flex-col transition-shadow hover:shadow-md
                ${planHighlighted[i] ? 'border-purple-400 ring-2 ring-purple-400 ring-offset-2' : 'border-gray-200'}`}
            >
              {i === planBadgeIndex && (
                <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap'>
                  {p.popular}
                </span>
              )}

              <div className='flex items-center gap-3 mb-4'>
                <div className='w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center'>
                  {planIcons[i]}
                </div>
                <h2 className='text-lg font-bold text-gray-800'>{plan.name}</h2>
              </div>

              <div className='mb-1'>
                <span className='text-4xl font-extrabold text-gray-900'>{planPrices[i]}</span>
                <span className='text-gray-400 text-sm ml-1'>/ {plan.period}</span>
              </div>
              <p className='text-gray-500 text-sm mb-6'>{plan.description}</p>

              <ul className='space-y-3 mb-8 flex-1'>
                {plan.features.map((f, j) => (
                  <li key={j} className='flex items-center gap-2.5 text-sm'>
                    {f.ok
                      ? <Check className='w-4 h-4 text-green-500 flex-shrink-0' />
                      : <X className='w-4 h-4 text-gray-200 flex-shrink-0' />}
                    <span className={f.ok ? 'text-gray-700' : 'text-gray-300'}>{f.text}</span>
                  </li>
                ))}
              </ul>

              {i === 0 ? (
                <Button asChild variant='outline' className='w-full'>
                  <Link href={isLoggedIn ? '/create-capsule' : '/register'}>
                    {isLoggedIn ? p.createCapsuleBtn : p.startFree}
                  </Link>
                </Button>
              ) : isPremium ? (
                <Button
                  variant='outline'
                  className='w-full border-red-200 text-red-500 hover:bg-red-50'
                  onClick={handleCancel}
                  disabled={loading === 'cancel'}
                >
                  {loading === 'cancel' ? p.canceling : p.cancel}
                </Button>
              ) : (
                <Button
                  className={`w-full text-white font-semibold
                    ${i === 1
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-100'
                      : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700'}`}
                  onClick={() => handleSubscribe(i)}
                >
                  {`${p.subscribeTo} · ${planPrices[i]}/${plan.period}`}
                </Button>
              )}
            </div>
          ))}
        </div>

        <p className='text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1'>
          <ShieldCheck className='w-3.5 h-3.5' />
          {p.securePayments}
        </p>
      </section>

      {/* FAQ */}
      <section className='max-w-2xl mx-auto px-6 pb-20'>
        <h2 className='text-xl font-bold text-gray-800 mb-6 text-center'>{p.faqTitle}</h2>
        <div className='space-y-3'>
          {p.faq.map((item, i) => (
            <details key={i} className='group bg-white border border-gray-100 rounded-xl shadow-sm'>
              <summary className='flex justify-between items-center p-5 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none text-sm'>
                {item.q}
                <span className='text-gray-400 group-open:rotate-180 transition-transform ml-3'>↓</span>
              </summary>
              <div className='px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4'>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
