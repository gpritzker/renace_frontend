export const dynamic = 'force-dynamic'

import { VoiceProfileClient } from '@/components/voice/VoiceProfileClient'
import { fetchVoiceProfile } from '@/actions/voice/voice-actions'

export default async function MyVoicePage() {
  const profile = await fetchVoiceProfile().catch(() => ({
    has_voice: false,
    voice_clone_status: 'none' as const,
    samples_count: 0
  }))

  return (
    <div className='max-w-2xl mx-auto py-12 px-4'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Tu Voz, Tu IA</h1>
        <p className='mt-2 text-gray-600'>
          Grabá muestras de tu voz para crear un clon. El día de mañana, quienes accedan a tus
          cápsulas podrán escuchar tus recuerdos contados con tu propia voz.
        </p>
      </div>
      <VoiceProfileClient initialProfile={profile} />
    </div>
  )
}
