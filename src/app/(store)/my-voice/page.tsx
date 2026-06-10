export const dynamic = 'force-dynamic'

import { VoiceProfileClient } from '@/components/voice/VoiceProfileClient'
import { fetchVoiceProfile } from '@/actions/voice/voice-actions'
import { MyVoicePageHeader } from '@/components/voice/MyVoicePageHeader'

export default async function MyVoicePage() {
  const profile = await fetchVoiceProfile().catch(() => ({
    has_voice: false,
    voice_clone_status: 'none' as const,
    samples_count: 0
  }))

  return (
    <div className='max-w-2xl mx-auto py-12 px-4'>
      <MyVoicePageHeader />
      <VoiceProfileClient initialProfile={profile} />
    </div>
  )
}
