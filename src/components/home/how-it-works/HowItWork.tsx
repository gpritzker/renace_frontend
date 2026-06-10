'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mic, FlaskConical, Share2, Bot, Lock, Heart, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const stepColors = [
  { color: 'from-purple-50 to-purple-100', border: 'border-purple-200', icon: <Mic className='w-7 h-7 text-purple-500' /> },
  { color: 'from-cyan-50 to-cyan-100', border: 'border-cyan-200', icon: <FlaskConical className='w-7 h-7 text-cyan-500' /> },
  { color: 'from-rose-50 to-rose-100', border: 'border-rose-200', icon: <Share2 className='w-7 h-7 text-rose-500' /> },
  { color: 'from-amber-50 to-amber-100', border: 'border-amber-200', icon: <Bot className='w-7 h-7 text-amber-500' /> },
]

const useCaseEmojis = ['👨‍👧', '👵', '💑', '🎓']

export const HowItWorks = () => {
  const { t } = useLanguage()
  const h = t.howItWorks

  return (
    <div className='min-h-screen flex flex-col'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-purple-50 via-white to-cyan-50 py-20 px-6 text-center'>
        <span className='inline-block text-xs font-semibold tracking-widest text-purple-500 uppercase mb-4 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full'>
          {h.hero.badge}
        </span>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
          {h.hero.title}{' '}
          <span className='bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'>
            {h.hero.titleHighlight}
          </span>
        </h1>
        <p className='text-lg text-gray-500 max-w-xl mx-auto mb-10'>{h.hero.subtitle}</p>
        <Button asChild size='lg' className='bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-200 px-8'>
          <Link href='/register'>{h.hero.cta}</Link>
        </Button>
      </section>

      {/* Video */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black'>
            <video className='w-full h-full object-cover' controls playsInline>
              <source src='/videos/demo.mp4' type='video/mp4' />
            </video>
          </div>
          <p className='text-center text-sm text-gray-400 mt-4'>{h.videoCaption}</p>
        </div>
      </section>

      {/* Pasos */}
      <section className='bg-gray-50 py-20 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>{h.steps.title}</h2>
          <p className='text-center text-gray-500 mb-14 max-w-lg mx-auto'>{h.steps.subtitle}</p>
          <div className='space-y-6'>
            {h.steps.items.map((step, i) => (
              <div key={i} className={`flex gap-6 bg-gradient-to-r ${stepColors[i].color} border ${stepColors[i].border} rounded-2xl p-6 md:p-8`}>
                <div className='flex-shrink-0'>
                  <div className='w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center'>
                    {stepColors[i].icon}
                  </div>
                </div>
                <div>
                  <span className='text-xs font-bold tracking-widest text-gray-400 uppercase'>{step.number}</span>
                  <h3 className='text-xl font-bold text-gray-800 mt-1 mb-2'>{step.title}</h3>
                  <p className='text-gray-600 mb-2'>{step.description}</p>
                  <p className='text-sm text-gray-400'>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className='bg-white py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>{h.forWho.title}</h2>
          <p className='text-center text-gray-500 mb-14 max-w-lg mx-auto'>{h.forWho.subtitle}</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {h.forWho.cases.map((uc, i) => (
              <div key={i} className='bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow'>
                <span className='text-4xl mb-4 block'>{useCaseEmojis[i]}</span>
                <h3 className='text-lg font-bold text-gray-800 mb-2'>{uc.title}</h3>
                <p className='text-gray-500 text-sm leading-relaxed'>{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnología */}
      <section className='bg-gradient-to-br from-purple-600 to-cyan-600 py-16 px-6 text-white text-center'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex justify-center gap-6 mb-8 flex-wrap'>
            <div className='bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm'>
              <p className='text-2xl font-bold'>ElevenLabs</p>
              <p className='text-xs text-purple-100'>{h.tech.voiceCloning}</p>
            </div>
            <div className='bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm'>
              <p className='text-2xl font-bold'>GPT-4o</p>
              <p className='text-xs text-purple-100'>{h.tech.conversationalAI}</p>
            </div>
            <div className='bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm'>
              <p className='text-2xl font-bold'>AWS S3</p>
              <p className='text-xs text-purple-100'>{h.tech.secureStorage}</p>
            </div>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>{h.tech.title}</h2>
          <p className='text-purple-100 max-w-xl mx-auto'>{h.tech.subtitle}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className='bg-white py-20 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>{h.faq.title}</h2>
          <div className='space-y-4'>
            {h.faq.items.map((faq, i) => (
              <details key={i} className='group border border-gray-200 rounded-xl overflow-hidden'>
                <summary className='flex justify-between items-center p-5 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 transition-colors list-none'>
                  {faq.q}
                  <ChevronDown className='w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3' />
                </summary>
                <div className='px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4'>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className='bg-gray-900 py-20 px-6 text-center text-white'>
        <Heart className='w-10 h-10 text-rose-400 mx-auto mb-6' />
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>{h.cta.title}</h2>
        <p className='text-gray-400 mb-10 max-w-md mx-auto'>{h.cta.subtitle}</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg' className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 px-8 shadow-lg'>
            <Link href='/register'>{h.cta.primary}</Link>
          </Button>
          <Button asChild size='lg' variant='outline' className='border-gray-700 text-gray-300 hover:bg-gray-800'>
            <Link href='/create-capsule'>{h.cta.secondary}</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
