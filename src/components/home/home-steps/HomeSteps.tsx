'use client'

import { Button } from '@/components/ui/button'
import { Mic, Heart, Bot, FlaskConical, ChevronRight, Shield, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const useCaseEmojis = ['👨‍👧', '👵', '💑', '🎓']

const featureIcons = [
  <Mic key='mic' className='w-5 h-5 text-purple-500' />,
  <Bot key='bot' className='w-5 h-5 text-cyan-500' />,
  <Shield key='shield' className='w-5 h-5 text-green-500' />,
  <Clock key='clock' className='w-5 h-5 text-amber-500' />,
  <Share2 key='share' className='w-5 h-5 text-rose-500' />,
  <Heart key='heart' className='w-5 h-5 text-pink-500' />,
]

const stepConfig = [
  { icon: <Mic className='size-6 text-white' />, gradient: 'from-purple-500 to-purple-700', href: '/create-capsule' },
  { icon: <Heart className='size-6 text-white' />, gradient: 'from-rose-400 to-pink-600', href: '/my-capsules' },
  { icon: <Bot className='size-6 text-white' />, gradient: 'from-cyan-400 to-cyan-600', href: '/my-voice' },
]

export const HomeSteps = () => {
  const { t } = useLanguage()
  const h = t.home

  return (
    <div className='min-h-screen flex flex-col'>

      {/* Hero */}
      <section className='relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-cyan-50'>
        <div className='absolute top-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl -translate-y-1/2' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full opacity-20 blur-3xl translate-y-1/2' />
        <div className='relative z-10 max-w-3xl mx-auto'>
          <span className='inline-block text-xs font-semibold tracking-widest text-purple-500 uppercase mb-4 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full'>
            {h.hero.badge}
          </span>
          <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6'>
            {h.hero.title}{' '}
            <span className='bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'>
              {h.hero.titleHighlight}
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed'>
            {h.hero.subtitle}
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-200 px-8'>
              <Link href='/create-capsule'>
                <FlaskConical className='size-5 mr-2' />
                {h.hero.cta}
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline' className='border-gray-200 text-gray-600 hover:bg-gray-50'>
              <Link href='/how-it-works'>
                {h.hero.ctaSecondary}
                <ChevronRight className='size-4 ml-1' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{h.video.title}</h2>
          <p className='text-gray-500 mb-8'>{h.video.subtitle}</p>
          <div className='relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black'>
            <video className='w-full h-full object-cover' controls playsInline poster='/videos/demo.mp4'>
              <source src='/videos/demo.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className='bg-gray-50 py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{h.forWho.title}</h2>
          <p className='text-center text-gray-500 mb-12 max-w-lg mx-auto'>{h.forWho.subtitle}</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {h.forWho.cases.map((uc, i) => (
              <div key={i} className='bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                <span className='text-4xl mb-3 block'>{useCaseEmojis[i]}</span>
                <h3 className='font-bold text-gray-800 mb-1'>{uc.title}</h3>
                <p className='text-gray-500 text-sm'>{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='bg-white py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{h.features.title}</h2>
          <p className='text-center text-gray-500 mb-12 max-w-lg mx-auto'>{h.features.subtitle}</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {h.features.items.map((f, i) => (
              <div key={i} className='flex gap-4 p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow'>
                <div className='flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center'>
                  {featureIcons[i]}
                </div>
                <div>
                  <h3 className='font-semibold text-gray-800 mb-1'>{f.title}</h3>
                  <p className='text-gray-500 text-sm'>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards accesos rápidos */}
      <section className='bg-gray-50 py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>{h.getStarted.title}</h2>
          <p className='text-center text-gray-500 mb-12 max-w-xl mx-auto'>{h.getStarted.subtitle}</p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {h.getStarted.steps.map((step, i) => (
              <Link
                key={i}
                href={stepConfig[i].href}
                className='group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 overflow-hidden'
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stepConfig[i].gradient} flex items-center justify-center shadow-md`}>
                  {stepConfig[i].icon}
                </div>
                <div>
                  <h3 className='text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors'>{step.title}</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{step.description}</p>
                </div>
                <div className='mt-auto flex items-center text-sm font-medium text-purple-500'>
                  {h.getStarted.goLink} <ChevronRight className='size-4 ml-1' />
                </div>
                <span className='absolute top-4 right-5 text-6xl font-black text-gray-50 select-none group-hover:text-purple-50 transition-colors'>
                  {i + 1}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className='bg-gradient-to-r from-purple-600 to-cyan-500 py-20 px-6 text-center text-white'>
        <Heart className='w-10 h-10 text-white/60 mx-auto mb-6' />
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>{h.cta.title}</h2>
        <p className='text-purple-100 mb-10 max-w-lg mx-auto text-lg'>{h.cta.subtitle}</p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg' className='bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg px-8'>
            <Link href='/register'>{h.cta.primary}</Link>
          </Button>
          <Button asChild size='lg' variant='outline' className='border-white/40 text-white hover:bg-white/10'>
            <Link href='/how-it-works'>
              {h.cta.secondary}
              <ChevronRight className='size-4 ml-1' />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
