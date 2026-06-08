'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, Zap, Heart, Users, Crown, ShieldCheck } from 'lucide-react'
import { cancelSubscription } from '@/actions/billing/billing-actions'
import { toast } from 'sonner'

const PLAN_URLS = {
  personal: process.env.NEXT_PUBLIC_MP_URL_PERSONAL ?? '',
  familia: process.env.NEXT_PUBLIC_MP_URL_FAMILIA ?? '',
}

const plans = [
  {
    id: 'free',
    planId: null,
    name: 'Gratis',
    price: '$0',
    period: 'para siempre',
    description: 'Para empezar y conocer Renace.',
    icon: <Heart className='w-5 h-5 text-gray-400' />,
    highlighted: false,
    badge: null,
    features: [
      { text: '1 cápsula del tiempo', ok: true },
      { text: 'Clonación de voz con IA', ok: true },
      { text: 'Compartir con link', ok: true },
      { text: 'Fecha de apertura programada', ok: false },
      { text: 'Email automático al destinatario', ok: false },
      { text: 'Múltiples cápsulas', ok: false },
    ],
  },
  {
    id: 'personal',
    planId: PLAN_URLS.personal,
    name: 'Personal',
    price: 'USD 6',
    period: 'por mes',
    description: 'Para quienes quieren dejar más recuerdos.',
    icon: <Zap className='w-5 h-5 text-purple-500' />,
    highlighted: true,
    badge: 'Más popular',
    features: [
      { text: 'Hasta 10 cápsulas', ok: true },
      { text: 'Clonación de voz con IA', ok: true },
      { text: 'Compartir con link', ok: true },
      { text: 'Fecha de apertura programada', ok: true },
      { text: 'Email automático al destinatario', ok: true },
      { text: 'Múltiples cápsulas', ok: true },
    ],
  },
  {
    id: 'familia',
    planId: PLAN_URLS.familia,
    name: 'Familia',
    price: 'USD 12',
    period: 'por mes',
    description: 'Un legado completo para toda la familia.',
    icon: <Users className='w-5 h-5 text-cyan-500' />,
    highlighted: false,
    badge: null,
    features: [
      { text: 'Cápsulas ilimitadas', ok: true },
      { text: 'Clonación de voz con IA', ok: true },
      { text: 'Compartir con link', ok: true },
      { text: 'Fecha de apertura programada', ok: true },
      { text: 'Email automático al destinatario', ok: true },
      { text: 'Múltiples destinatarios por cápsula', ok: true },
    ],
  },
]

interface Props {
  isLoggedIn: boolean
  isPremium: boolean
}

export const PricingContent = ({ isLoggedIn, isPremium }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = (plan: typeof plans[0]) => {
    if (!isLoggedIn) {
      router.push('/register')
      return
    }
    if (!plan.planId) return
    window.location.href = plan.planId
  }

  const handleCancel = async () => {
    if (!confirm('¿Seguro que querés cancelar tu suscripción?')) return
    setLoading('cancel')
    try {
      await cancelSubscription()
      toast.success('Suscripción cancelada')
      router.refresh()
    } catch (e: any) {
      toast.error(e.message || 'Error al cancelar')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 py-20 px-6 text-center text-white'>
        <span className='inline-block text-xs font-semibold tracking-widest uppercase mb-4 bg-white/10 border border-white/20 px-3 py-1 rounded-full'>
          Planes y precios
        </span>
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>
          Tu legado no tiene precio.<br />
          <span className='text-purple-100'>Pero nuestros planes sí.</span>
        </h1>
        <p className='text-purple-100 max-w-xl mx-auto text-lg'>
          Empezá gratis. Cuando quieras dejar más recuerdos, elegí el plan que mejor te quede.
        </p>
        {isPremium && (
          <div className='mt-6 inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-5 py-2 text-sm font-medium'>
            <Crown className='w-4 h-4 text-amber-300' />
            Ya sos usuario Premium
          </div>
        )}
      </section>

      {/* Planes */}
      <section className='py-16 px-6'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 shadow-sm p-7 flex flex-col transition-shadow hover:shadow-md
                ${plan.highlighted ? 'border-purple-400 ring-2 ring-purple-400 ring-offset-2' : 'border-gray-200'}`}
            >
              {plan.badge && (
                <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap'>
                  {plan.badge}
                </span>
              )}

              <div className='flex items-center gap-3 mb-4'>
                <div className='w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center'>
                  {plan.icon}
                </div>
                <h2 className='text-lg font-bold text-gray-800'>{plan.name}</h2>
              </div>

              <div className='mb-1'>
                <span className='text-4xl font-extrabold text-gray-900'>{plan.price}</span>
                <span className='text-gray-400 text-sm ml-1'>/ {plan.period}</span>
              </div>
              <p className='text-gray-500 text-sm mb-6'>{plan.description}</p>

              <ul className='space-y-3 mb-8 flex-1'>
                {plan.features.map((f, i) => (
                  <li key={i} className='flex items-center gap-2.5 text-sm'>
                    {f.ok
                      ? <Check className='w-4 h-4 text-green-500 flex-shrink-0' />
                      : <X className='w-4 h-4 text-gray-200 flex-shrink-0' />}
                    <span className={f.ok ? 'text-gray-700' : 'text-gray-300'}>{f.text}</span>
                  </li>
                ))}
              </ul>

              {plan.id === 'free' ? (
                <Button asChild variant='outline' className='w-full'>
                  <Link href={isLoggedIn ? '/create-capsule' : '/register'}>
                    {isLoggedIn ? 'Crear cápsula' : 'Empezar gratis'}
                  </Link>
                </Button>
              ) : isPremium ? (
                <Button
                  variant='outline'
                  className='w-full border-red-200 text-red-500 hover:bg-red-50'
                  onClick={handleCancel}
                  disabled={loading === 'cancel'}
                >
                  {loading === 'cancel' ? 'Cancelando...' : 'Cancelar suscripción'}
                </Button>
              ) : (
                <Button
                  className={`w-full text-white font-semibold
                    ${plan.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-100'
                      : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700'}`}
                  onClick={() => handleSubscribe(plan)}
                >
                  {`Suscribirse · ${plan.price}/mes`}
                </Button>
              )}
            </div>
          ))}
        </div>

        <p className='text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1'>
          <ShieldCheck className='w-3.5 h-3.5' />
          Pagos procesados de forma segura por MercadoPago. Cancelá cuando quieras.
        </p>
      </section>

      {/* FAQ */}
      <section className='max-w-2xl mx-auto px-6 pb-20'>
        <h2 className='text-xl font-bold text-gray-800 mb-6 text-center'>Preguntas frecuentes</h2>
        <div className='space-y-3'>
          {[
            { q: '¿Puedo cancelar cuando quiero?', a: 'Sí. Podés cancelar desde esta página en cualquier momento. No hay permanencia ni penalidades.' },
            { q: '¿Qué pasa con mis cápsulas si cancelo?', a: 'Tus cápsulas existentes y tu voz clonada quedan guardadas. Las nuevas cápsulas requerirán aprobación.' },
            { q: '¿Cómo pago? ¿Qué métodos acepta?', a: 'Pagás con MercadoPago: tarjeta de crédito, débito, Mercado Crédito o saldo de MP. Sin complicaciones.' },
            { q: '¿Cuándo se activa mi plan?', a: 'Apenas MercadoPago confirma el pago, tu cuenta se activa automáticamente y tus cápsulas pendientes se aprueban.' },
            { q: '¿Puedo cambiar de plan?', a: 'Por ahora cancelás uno y suscribís al otro. Próximamente habrá upgrade directo.' },
          ].map((item, i) => (
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
