import { Button } from '@/components/ui/button'
import { Mic, Heart, Bot, FlaskConical, ChevronRight, Play, Shield, Clock, Share2 } from 'lucide-react'
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

const useCases = [
  { emoji: '👨‍👧', title: 'Para tus hijos', description: 'Que te escuchen y te conozcan, sin importar el tiempo.' },
  { emoji: '👵', title: 'Para tus nietos', description: 'Historias de familia en tu propia voz, para siempre.' },
  { emoji: '💑', title: 'Para tu pareja', description: 'Una carta programada para el aniversario número 50.' },
  { emoji: '🎓', title: 'Para tus alumnos', description: 'Tu conocimiento y pasión, disponibles cuando te necesiten.' },
]

const features = [
  { icon: <Mic className='w-5 h-5 text-purple-500' />, title: 'Voz clonada con IA', description: 'Solo 1 minuto de grabación para clonar tu voz con tecnología ElevenLabs.' },
  { icon: <Bot className='w-5 h-5 text-cyan-500' />, title: 'IA conversacional', description: 'Tus seres queridos pueden hacerle preguntas y la IA responde como vos.' },
  { icon: <Shield className='w-5 h-5 text-green-500' />, title: 'Privado y seguro', description: 'Solo quien tenga el link puede ver tu cápsula. Vos controlás el acceso.' },
  { icon: <Clock className='w-5 h-5 text-amber-500' />, title: 'Programá la apertura', description: 'Elegí que se abra en una fecha especial o compartila ahora mismo.' },
  { icon: <Share2 className='w-5 h-5 text-rose-500' />, title: 'Compartí con un link', description: 'Sin apps, sin registro. Solo un link y tu voz.' },
  { icon: <Heart className='w-5 h-5 text-pink-500' />, title: 'Primera cápsula gratis', description: 'Empezá sin pagar nada. Sin tarjeta de crédito.' },
]

export const HomeSteps = () => {
  return (
    <div className='min-h-screen flex flex-col'>

      {/* Hero */}
      <section className='relative flex-1 flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-cyan-50'>
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

      {/* Video */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-3'>Mirá cómo funciona</h2>
          <p className='text-gray-500 mb-8'>En 2 minutos entendés todo.</p>
          <div className='relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900 to-cyan-900 aspect-video flex items-center justify-center shadow-2xl'>
            <div className='text-center text-white space-y-4 relative z-10'>
              <div className='w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto backdrop-blur-sm border border-white/30 cursor-pointer hover:bg-white/30 transition-colors'>
                <Play className='w-8 h-8 text-white ml-1' />
              </div>
              <p className='text-lg font-medium opacity-90'>Demo de Renace</p>
              <p className='text-sm opacity-60'>2 minutos · En español</p>
            </div>
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]' />
          </div>
        </div>
      </section>

      {/* Para quién es */}
      <section className='bg-gray-50 py-20 px-6'>
        <div className='max-w-5xl mx-auto'>
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>¿Para quién es Renace?</h2>
          <p className='text-center text-gray-500 mb-12 max-w-lg mx-auto'>Para cualquiera que quiera que su voz y sus recuerdos perduren.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {useCases.map((uc, i) => (
              <div key={i} className='bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow'>
                <span className='text-4xl mb-3 block'>{uc.emoji}</span>
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
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>Todo lo que incluye</h2>
          <p className='text-center text-gray-500 mb-12 max-w-lg mx-auto'>Tecnología de punta, pensada para que sea simple.</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {features.map((f, i) => (
              <div key={i} className='flex gap-4 p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow'>
                <div className='flex-shrink-0 w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center'>
                  {f.icon}
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
          <h2 className='text-center text-2xl md:text-3xl font-bold text-gray-800 mb-3'>Empezá ahora</h2>
          <p className='text-center text-gray-500 mb-12 max-w-xl mx-auto'>Tu primera cápsula es gratis.</p>
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
                  <h3 className='text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors'>{step.title}</h3>
                  <p className='text-gray-500 text-sm leading-relaxed'>{step.description}</p>
                </div>
                <div className='mt-auto flex items-center text-sm font-medium text-purple-500'>
                  Ir <ChevronRight className='size-4 ml-1' />
                </div>
                <span className='absolute top-4 right-5 text-6xl font-black text-gray-50 select-none group-hover:text-purple-50 transition-colors'>
                  {step.id}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className='bg-gradient-to-r from-purple-600 to-cyan-500 py-20 px-6 text-center text-white'>
        <Heart className='w-10 h-10 text-white/60 mx-auto mb-6' />
        <h2 className='text-2xl md:text-4xl font-bold mb-4'>¿Qué le dejarías a las personas que querés?</h2>
        <p className='text-purple-100 mb-10 max-w-lg mx-auto text-lg'>
          Tu primera cápsula es gratis. En 10 minutos podés tener tu voz clonada y tu primer recuerdo guardado para siempre.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg' className='bg-white text-purple-700 hover:bg-purple-50 font-semibold shadow-lg px-8'>
            <Link href='/register'>
              Crear mi cuenta gratis
            </Link>
          </Button>
          <Button asChild size='lg' variant='outline' className='border-white/40 text-white hover:bg-white/10'>
            <Link href='/how-it-works'>
              Ver cómo funciona
              <ChevronRight className='size-4 ml-1' />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
