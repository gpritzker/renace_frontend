import { Button } from '@/components/ui/button'
import { Mic, Heart, Bot, FlaskConical, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    id: 1,
    title: 'Grabá tu mensaje',
    description: 'Creá una cápsula con un mensaje para que tus seres queridos lo escuchen con tu voz de IA.',
    icon: <Mic className='size-6 text-white' />,
    gradient: 'from-purple-500 to-purple-700',
    href: '/create-capsule'
  },
  {
    id: 2,
    title: 'Mis cápsulas',
    description: 'Revisá y administrá todas tus cápsulas guardadas.',
    icon: <Heart className='size-6 text-white' />,
    gradient: 'from-rose-400 to-pink-600',
    href: '/my-capsules'
  },
  {
    id: 3,
    title: 'Tu voz, tu IA',
    description: 'Entrená una IA personalizada para que puedan seguir charlando con vos.',
    icon: <Bot className='size-6 text-white' />,
    gradient: 'from-cyan-400 to-cyan-600',
    href: '/my-voice'
  }
]

export const HomeSteps = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Hero */}
      <section className='relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-cyan-50'>
        {/* Círculos decorativos */}
        <div className='absolute top-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full opacity-20 blur-3xl -translate-y-1/2' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200 rounded-full opacity-20 blur-3xl translate-y-1/2' />

        <div className='relative z-10 max-w-3xl mx-auto'>
          <span className='inline-block text-xs font-semibold tracking-widest text-purple-500 uppercase mb-4 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full'>
            Tu legado digital
          </span>
          <h1 className='text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6'>
            Renace{' '}
            <span className='bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'>
              tus recuerdos
            </span>
          </h1>
          <p className='text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed'>
            Dejá mensajes, historias y recuerdos para tus seres queridos. Contados con tu propia voz, para siempre.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-200 px-8'>
              <Link href='/create-capsule'>
                <FlaskConical className='size-5 mr-2' />
                Crear mi primera cápsula
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline' className='border-gray-200 text-gray-600 hover:bg-gray-50'>
              <Link href='/how-it-works'>
                Cómo funciona
                <ChevronRight className='size-4 ml-1' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className='bg-white py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>
            Todo en un solo lugar
          </h2>
          <p className='text-center text-gray-500 mb-12 max-w-xl mx-auto'>
            Tres pasos para crear un recuerdo que dure para siempre.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {steps.map((step) => (
              <Link
                key={step.id}
                href={step.href}
                className='group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 overflow-hidden'
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className='text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors'>
                    {step.title}
                  </h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>
                    {step.description}
                  </p>
                </div>
                <div className='mt-auto flex items-center text-sm font-medium text-purple-500 group-hover:gap-2 transition-all'>
                  Ir <ChevronRight className='size-4 ml-1' />
                </div>
                {/* Número decorativo */}
                <span className='absolute top-4 right-5 text-6xl font-black text-gray-50 select-none group-hover:text-purple-50 transition-colors'>
                  {step.id}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section className='bg-gradient-to-r from-purple-600 to-cyan-500 py-16 px-6 text-center text-white'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>¿Qué le dejarías a las personas que querés?</h2>
        <p className='text-purple-100 mb-8 max-w-lg mx-auto'>
          Tu primera cápsula es gratis. Empezá hoy.
        </p>
        <Button asChild size='lg' className='bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg'>
          <Link href='/create-capsule'>
            <FlaskConical className='size-5 mr-2' />
            Crear mi cápsula gratis
          </Link>
        </Button>
      </section>
    </div>
  )
}
