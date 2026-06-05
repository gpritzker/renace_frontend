import { Button } from '@/components/ui/button'
import { Mic, Heart, Bot, FlaskConical } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    id: 1,
    title: 'Grabá tu mensaje',
    description: 'De voz, video o texto, lo que quieras dejarles.',
    icon: <Mic className='size-6 text-gray-800' />,
    href: '/create-capsule'
  },
  {
    id: 2,
    title: 'Guardalo en tu cápsula',
    description: 'Privado, seguro y solo accesible cuando vos lo decidás.',
    icon: <Heart className='size-6 text-red-800' />,
    href: '/my-capsules'
  },
  {
    id: 3,
    title: 'Tu voz, tu IA',
    description: 'Entrená una IA personalizada para que puedan seguir charlando con vos.',
    icon: <Bot className='size-6 text-blue-800' />,
    href: '/my-voice'
  }
]

export const HomeSteps = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-[oklch(0.99_0.01_342.35)] via-indigo-100 to-sky-100 text-neutral-800 px-6 pt-12 pb-24'>
      <section className='text-center max-w-3xl mx-auto'>
        <h2 className='text-5xl text-black leading-tight mb-6'>
          Renace <br /> tus recuerdos
        </h2>
        <Button
          asChild
          size='lg'
          className='mx-auto bg-[#6A52F5] text-white hover:cursor-pointer'
        >
          <Link href='/create-capsule'>
            <FlaskConical className='size-6' />
            Crear cápsula
          </Link>
        </Button>
      </section>

      <div className='w-full px-4 py-8 md:py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-4xl mx-auto'>
          {steps.map((step) => (
            <Link
              key={step.id}
              href={step.href}
              className='bg-white/70 flex flex-col items-center p-8 rounded-2xl w-8/12 md:w-full mx-auto shadow-md transition-transform hover:scale-105 duration-100 ease-in-out cursor-pointer hover:shadow-lg'
            >
              <div className='flex items-center justify-center w-14 h-14 rounded-full bg-white mb-4'>
                {step.icon}
              </div>
              <h3 className='text-xl font-semibold text-center text-gray-800 mb-2'>
                {step.title}
              </h3>
              <p className='text-center text-gray-600 text-sm'>
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
