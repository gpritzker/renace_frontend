'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { VoiceRecorder } from './VoiceRecorder'
import { VoicePreview } from './VoicePreview'
import { Mic, Cpu, CheckCircle, AlertCircle, Clock, } from 'lucide-react'
import { toast } from 'sonner'
import { startVoiceCloning, fetchVoiceProfile } from '@/actions/voice/voice-actions'
import { useLanguage } from '@/contexts/LanguageContext'

interface Profile {
  has_voice: boolean
  voice_clone_status: 'none' | 'pending' | 'ready' | 'error'
  samples_count: number
}

export const VoiceProfileClient = ({ initialProfile }: { initialProfile: Profile }) => {
  const [profile, setProfile] = useState(initialProfile)
  const [isPending, startTransition] = useTransition()
  const { t } = useLanguage()
  const v = t.voice

  const refresh = async () => {
    const updated = await fetchVoiceProfile()
    setProfile(updated)
  }

  const handleClone = () => {
    startTransition(async () => {
      try {
        await startVoiceCloning()
        toast.success(v.cloningStarted)
        await refresh()
      } catch (e: any) {
        toast.error(e.message)
      }
    })
  }

  const statusInfo = {
    none: { icon: <Mic className='h-5 w-5 text-gray-400' />, text: v.statusNone, color: 'text-gray-500' },
    pending: { icon: <Clock className='h-5 w-5 text-amber-500 animate-pulse' />, text: v.statusPending, color: 'text-amber-600' },
    ready: { icon: <CheckCircle className='h-5 w-5 text-green-500' />, text: v.statusReady, color: 'text-green-600' },
    error: { icon: <AlertCircle className='h-5 w-5 text-red-500' />, text: v.statusError, color: 'text-red-600' },
  }[profile.voice_clone_status]

  const samplesText = profile.samples_count === 1
    ? `1 ${v.samples} ${v.saved}`
    : `${profile.samples_count} ${v.samplesPlural} ${v.savedPlural}`

  return (
    <div className='space-y-8'>
      <div className='bg-white rounded-xl border border-gray-200 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {statusInfo.icon}
            <div>
              <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</p>
              <p className='text-sm text-gray-500'>{samplesText}</p>
            </div>
          </div>
          {profile.samples_count > 0 && profile.voice_clone_status !== 'pending' && (
            <Button
              onClick={handleClone}
              disabled={isPending}
              className='bg-purple-500 hover:bg-purple-600 gap-2'
            >
              <Cpu className='h-4 w-4' />
              {profile.has_voice ? v.reclone : v.clone}
            </Button>
          )}
        </div>
        {profile.voice_clone_status === 'pending' && (
          <p className='mt-3 text-sm text-amber-600 bg-amber-50 rounded-lg p-3'>{v.pendingNote}</p>
        )}
      </div>

      {profile.voice_clone_status !== 'pending' && (
        <div className='space-y-3'>
          <h2 className='font-semibold text-gray-800'>{v.samplesTitle}</h2>
          <p className='text-sm text-gray-500'>{v.samplesHint}</p>
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900 leading-relaxed'>
            <p className='font-semibold mb-2 text-amber-700'>{v.suggestedTextTitle}</p>
            <p>
              "Cuando yo tenía seis años vi en un libro sobre la selva virgen que se llamaba 'Historias vividas', una magnífica lámina. Representaba una serpiente boa que se tragaba a una fiera. En el libro se afirmaba: 'Las serpientes boas se tragan su presa entera, sin masticarla. Luego ya no pueden moverse y duermen los seis meses que dura su digestión'.
              Reflexioné mucho en ese entonces sobre las aventuras de la jungla y logré trazar, con un lápiz de colores, mi primer dibujo. Mi dibujo número 1. Era así. Mostré mi obra de arte a las personas mayores y les pregunté si mi dibujo les daba miedo. Me contestaron: '¿Por qué habría de asustar un sombrero?' Mi dibujo no representaba un sombrero. Representaba una serpiente boa que digería un elefante."
            </p>
          </div>
          <VoiceRecorder onUploaded={refresh} />
        </div>
      )}

      {profile.voice_clone_status === 'ready' && <VoicePreview />}
    </div>
  )
}
