// 'use client'

// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
// import { Mic, Lock, Bot } from 'lucide-react'

// export const HowItWorks = () => {
//   const router = useRouter()

//   return (
//     <div className='min-h-screen bg-gradient-to-br from-pink-50 via-indigo-50 to-sky-100 px-6 py-16 text-gray-800'>
//       <section className='text-center max-w-3xl mx-auto mb-12'>
//         <h1 className='text-4xl font-bold mb-4'>¿Cómo funciona?</h1>
//         <p className='text-lg text-gray-600'>
//           Te contamos cómo crear tu cápsula digital paso a paso. Es más fácil de lo que imaginás ✨
//         </p>
//       </section>

//       <section className='grid md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
//         <StepCard
//           icon={<Mic className='w-8 h-8 text-blue-500' />}
//           title='Grabá tu mensaje'
//           description='Con voz, video o texto. Podés contar tu historia, compartir consejos o simplemente dejar cariño.'
//         />
//         <StepCard
//           icon={<Lock className='w-8 h-8 text-pink-500' />}
//           title='Guardalo seguro'
//           description='Todo queda protegido y encriptado. Solo se abre en la fecha que vos elijas.'
//         />
//         <StepCard
//           icon={<Bot className='w-8 h-8 text-purple-500' />}
//           title='Entrená tu IA'
//           description='Una IA personalizada que hable como vos y siga charlando con quienes amás.'
//         />
//       </section>

//       <div className='text-center mt-20 max-w-2xl mx-auto'>
//         <p className='text-md text-gray-700 mb-6'>
//           Cada cápsula es única y está hecha con amor. Animate a crear la tuya hoy mismo 💜
//         </p>
//         <Button
//           size='lg'
//           className='bg-[#6A52F5] text-white hover:cursor-pointer'
//           onClick={() => router.push('/create_capsule')}
//         >
//           Crear mi cápsula
//         </Button>
//       </div>
//     </div>
//   )
// }

// function StepCard({
//   icon,
//   title,
//   description
// }: {
//   icon: React.ReactNode
//   title: string
//   description: string
// }) {
//   return (
//     <div className='rounded-2xl bg-white/70 p-6 text-left shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] backdrop-blur hover:cursor-pointer'>
//       <div className='mb-4'>{icon}</div>
//       <h3 className='text-lg font-semibold mb-2'>{title}</h3>
//       <p className='text-sm text-gray-700'>{description}</p>
//     </div>
//   )
// }

// 'use client'

// import { Bot, Heart, Mic, Sparkles } from 'lucide-react'

// export const HowItWorks = () => {
//   return (
//     <section className='max-w-6xl mx-auto px-6 py-24'>
//       <h2 className='text-4xl font-bold text-center mb-12 text-gray-800'>
//         ¿Qué podés hacer?
//       </h2>
//       <div className='grid grid-cols-6 gap-4'>
//         {/* Caja A */}
//         <BentoBox
//           className='hover:cursor-pointer col-span-4 bg-gradient-to-br from-indigo-200 to-blue-100'
//           icon={<Mic className='w-6 h-6 text-indigo-700' />}
//           title='Grabá un mensaje'
//           description='De voz, video o texto, lo que quieras transmitir a futuro.'
//         />

//         {/* Caja B */}
//         <BentoBox
//           className='hover:cursor-pointer col-span-2 bg-white'
//           icon={<Heart className='w-6 h-6 text-pink-500' />}
//           title='Guardalo con amor'
//           description='Cápsulas privadas, cifradas y listas para ser entregadas.'
//         />

//         {/* Caja C */}
//         <BentoBox
//           className='hover:cursor-pointer col-span-2 bg-white'
//           icon={<Sparkles className='w-6 h-6 text-yellow-500' />}
//           title='Programá su entrega'
//           description='Elegí fecha y destinatarios. Nosotros nos encargamos del resto.'
//         />

//         {/* Caja D */}
//         <BentoBox
//           className='hover:cursor-pointer col-span-4 bg-gradient-to-br from-purple-200 to-pink-100'
//           icon={<Bot className='w-6 h-6 text-purple-700' />}
//           title='Creá tu IA personalizada'
//           description='Entrená una IA que hable como vos y siga compartiendo ideas.'
//         />
//       </div>
//     </section>
//   )
// }

// function BentoBox({
//   className,
//   icon,
//   title,
//   description
// }: {
//   className: string
//   icon: React.ReactNode
//   title: string
//   description: string
// }) {
//   return (
//     <div
//       className={`p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm ${className}`}
//     >
//       <div className='mb-4'>{icon}</div>
//       <h3 className='text-xl font-semibold mb-2'>{title}</h3>
//       <p className='text-gray-700 text-sm'>{description}</p>
//     </div>
//   )
// }

'use client'

import { Bot, Heart, Mic, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export const HowItWorks = () => {
  const router = useRouter()

  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">¿Cómo funciona?</h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Nuestra plataforma te permite dejar recuerdos, pensamientos y mensajes para el futuro.
        Ya sea que quieras dejar palabras sabias, una carta de amor o simplemente tu voz.
      </p>

      <div className="grid grid-cols-6 gap-6">
        {/* Caja A */}
        <BentoBox
          className="col-span-4 bg-gradient-to-br from-indigo-200 to-blue-100"
          icon={<Mic className="w-6 h-6 text-indigo-700" />}
          title="Grabá un mensaje"
          description="De voz, video o texto, lo que quieras transmitir a futuro."
        />

        {/* Caja B */}
        <BentoBox
          className="col-span-2 bg-white"
          icon={<Heart className="w-6 h-6 text-pink-500" />}
          title="Guardalo con amor"
          description="Cápsulas privadas, cifradas y listas para ser entregadas."
        />

        {/* Caja C */}
        <BentoBox
          className="col-span-2 bg-white"
          icon={<Sparkles className="w-6 h-6 text-yellow-500" />}
          title="Programá su entrega"
          description="Elegí fecha y destinatarios. Nosotros nos encargamos del resto."
        />

        {/* Caja D */}
        <BentoBox
          className="col-span-4 bg-gradient-to-br from-purple-200 to-pink-100"
          icon={<Bot className="w-6 h-6 text-purple-700" />}
          title="Creá tu IA personalizada"
          description="Entrená una IA que hable como vos y siga compartiendo ideas."
        />
      </div>

      <p className="text-center text-gray-600 mt-12 max-w-2xl mx-auto">
        ¡Es simple y mágico! Todo lo que necesitás es un poco de inspiración y tu voz.
      </p>

      <div className="text-center mt-8">
        <Button
          size="lg"
          className="bg-[#6A52F5] text-white hover:cursor-pointer"
          onClick={() => router.push('/create_capsule')}
        >
          Crear mi cápsula
        </Button>
      </div>
    </section>
  )
}

function BentoBox({
  className,
  icon,
  title,
  description
}: {
  className: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md transition-all hover:shadow-xl hover:scale-[1.02] backdrop-blur-sm cursor-pointer ${className}`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  )
}
