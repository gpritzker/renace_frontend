import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mic, FlaskConical, Share2, Bot, Lock, Heart, ChevronDown } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: <Mic className='w-7 h-7 text-purple-500' />,
    title: 'Cloná tu voz',
    description:
      'Grabá 1 minuto de audio hablando con naturalidad — contá una anécdota, leé un texto. Nuestra IA aprende tu tono, tu ritmo, tu manera de hablar.',
    detail: 'Solo necesitás el micrófono de tu celular o computadora. No hace falta equipo especial.',
    color: 'from-purple-50 to-purple-100',
    border: 'border-purple-200'
  },
  {
    number: '02',
    icon: <FlaskConical className='w-7 h-7 text-cyan-500' />,
    title: 'Creá tu cápsula',
    description:
      'Escribí recuerdos, cartas, reflexiones o mensajes para tus seres queridos. Podés agregar texto, imágenes, audio y video.',
    detail: 'Podés programar cuándo se abre — en un cumpleaños, en 10 años, o ahora mismo.',
    color: 'from-cyan-50 to-cyan-100',
    border: 'border-cyan-200'
  },
  {
    number: '03',
    icon: <Share2 className='w-7 h-7 text-rose-500' />,
    title: 'Compartí el link',
    description:
      'Mandá el link a quien quieras. Esa persona va a poder escuchar tus recuerdos narrados con tu propia voz, cuando quiera.',
    detail: 'Sin apps, sin registro. Solo un link y tu voz.',
    color: 'from-rose-50 to-rose-100',
    border: 'border-rose-200'
  },
  {
    number: '04',
    icon: <Bot className='w-7 h-7 text-amber-500' />,
    title: 'Charlá con la IA',
    description:
      'Quienes acceden a tu cápsula pueden hacerle preguntas. La IA responde como vos, con tu voz, basándose en tus recuerdos.',
    detail: 'Como si pudieras seguir hablando con las personas que amás, para siempre.',
    color: 'from-amber-50 to-amber-100',
    border: 'border-amber-200'
  }
]

const useCases = [
  {
    emoji: '👨‍👧',
    title: 'Un padre para sus hijos',
    description: 'Dejá consejos, historias y el sonido de tu voz para que tus hijos te conozcan, sin importar el tiempo.'
  },
  {
    emoji: '👵',
    title: 'Un abuelo para sus nietos',
    description: 'Los nietos que aún no nacieron van a poder escuchar las historias de familia en tu propia voz.'
  },
  {
    emoji: '💑',
    title: 'Una pareja en el tiempo',
    description: 'Una carta de amor programada para abrirse en el aniversario número 50, leída con tu voz de hoy.'
  },
  {
    emoji: '🎓',
    title: 'Un maestro para sus alumnos',
    description: 'Dejá el conocimiento y la pasión que te hicieron quien sos, para que otros puedan aprender de vos.'
  }
]

const faqs = [
  {
    q: '¿Necesito algún equipo especial para grabar mi voz?',
    a: 'No. Con el micrófono de tu celular o computadora alcanza. Cuanto más silencioso sea el ambiente, mejor va a quedar el clon.'
  },
  {
    q: '¿Qué tan parecida va a sonar la voz clonada?',
    a: 'ElevenLabs, la tecnología que usamos, es la más avanzada del mundo en clonación de voz. Con 1 minuto de audio el resultado es muy bueno. Con más minutos, mejor todavía.'
  },
  {
    q: '¿Es seguro? ¿Quién puede ver mis cápsulas?',
    a: 'Nadie puede ver tu cápsula si no tenés el link. Vos decidís con quién compartirlo y cuándo. Tus datos están encriptados y almacenados de forma segura.'
  },
  {
    q: '¿La primera cápsula es realmente gratis?',
    a: 'Sí. Podés crear una cápsula completa, clonar tu voz y compartir el link sin pagar nada. Para cápsulas ilimitadas existe el plan premium.'
  },
  {
    q: '¿Qué pasa si quiero borrar mi información?',
    a: 'Podés eliminar tus cápsulas y tu voz clonada en cualquier momento desde tu perfil. Todo se borra de forma permanente.'
  }
]

export const HowItWorks = () => {
  return (
    <div className='min-h-screen flex flex-col'>

      {/* Hero */}
      <section className='bg-gradient-to-br from-purple-50 via-white to-cyan-50 py-20 px-6 text-center'>
        <span className='inline-block text-xs font-semibold tracking-widest text-purple-500 uppercase mb-4 bg-purple-50 border border-purple-100 px-3 py-1 rounded-full'>
          Cómo funciona
        </span>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
          Cuatro pasos para{' '}
          <span className='bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent'>
            vivir para siempre
          </span>
        </h1>
        <p className='text-lg text-gray-500 max-w-xl mx-auto mb-10'>
          Sin tecnicismos. Sin complicaciones. Solo vos, tus recuerdos y las personas que querés.
        </p>
        <Button asChild size='lg' className='bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-200 px-8'>
          <Link href='/register'>Empezar gratis</Link>
        </Button>
      </section>

      {/* Video placeholder */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black'>
            <video
              className='w-full h-full object-cover'
              controls
              playsInline
            >
              <source src='/videos/demo.mp4' type='video/mp4' />
            </video>
          </div>
          <p className='text-center text-sm text-gray-400 mt-4'>Mirá cómo Gonzalo creó su primera cápsula para su hijo Milo</p>
        </div>
      </section>

      {/* Pasos */}
      <section className='bg-gray-50 py-20 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>Paso a paso</h2>
          <p className='text-center text-gray-500 mb-14 max-w-lg mx-auto'>De cero a tu primera cápsula en menos de 10 minutos.</p>
          <div className='space-y-6'>
            {steps.map((step, i) => (
              <div key={i} className={`flex gap-6 bg-gradient-to-r ${step.color} border ${step.border} rounded-2xl p-6 md:p-8`}>
                <div className='flex-shrink-0'>
                  <div className='w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center'>
                    {step.icon}
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
          <h2 className='text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4'>¿Para quién es Renace?</h2>
          <p className='text-center text-gray-500 mb-14 max-w-lg mx-auto'>Para cualquiera que quiera que su voz y sus recuerdos perduren.</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {useCases.map((uc, i) => (
              <div key={i} className='bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow'>
                <span className='text-4xl mb-4 block'>{uc.emoji}</span>
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
              <p className='text-xs text-purple-100'>Clonación de voz</p>
            </div>
            <div className='bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm'>
              <p className='text-2xl font-bold'>GPT-4o</p>
              <p className='text-xs text-purple-100'>IA conversacional</p>
            </div>
            <div className='bg-white/10 border border-white/20 rounded-xl px-5 py-3 backdrop-blur-sm'>
              <p className='text-2xl font-bold'>AWS S3</p>
              <p className='text-xs text-purple-100'>Almacenamiento seguro</p>
            </div>
          </div>
          <h2 className='text-2xl md:text-3xl font-bold mb-3'>Tecnología de primer nivel</h2>
          <p className='text-purple-100 max-w-xl mx-auto'>
            Usamos las mismas herramientas de IA que las empresas más grandes del mundo para darte la mejor experiencia posible.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className='bg-white py-20 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-12'>Preguntas frecuentes</h2>
          <div className='space-y-4'>
            {faqs.map((faq, i) => (
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
        <h2 className='text-3xl md:text-4xl font-bold mb-4'>Tu primera cápsula es gratis</h2>
        <p className='text-gray-400 mb-10 max-w-md mx-auto'>
          No hace falta tarjeta de crédito. En 10 minutos podés tener tu voz clonada y tu primer recuerdo guardado para siempre.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg' className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white border-0 px-8 shadow-lg'>
            <Link href='/register'>Crear mi cuenta gratis</Link>
          </Button>
          <Button asChild size='lg' variant='outline' className='border-gray-700 text-gray-300 hover:bg-gray-800'>
            <Link href='/create-capsule'>Ver demo</Link>
          </Button>
        </div>
      </section>

    </div>
  )
}
