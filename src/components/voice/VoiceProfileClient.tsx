'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { VoiceRecorder } from './VoiceRecorder'
import { VoicePreview } from './VoicePreview'
import { Mic, Cpu, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { startVoiceCloning, deleteVoiceSample, fetchVoiceProfile } from '@/actions/voice/voice-actions'

interface Profile {
  has_voice: boolean
  voice_clone_status: 'none' | 'pending' | 'ready' | 'error'
  samples_count: number
}

export const VoiceProfileClient = ({ initialProfile }: { initialProfile: Profile }) => {
  const [profile, setProfile] = useState(initialProfile)
  const [isPending, startTransition] = useTransition()

  const refresh = async () => {
    const updated = await fetchVoiceProfile()
    setProfile(updated)
  }

  const handleClone = () => {
    startTransition(async () => {
      try {
        await startVoiceCloning()
        toast.success('Clonación iniciada. Puede tardar unos minutos.')
        await refresh()
      } catch (e: any) {
        toast.error(e.message)
      }
    })
  }

  const statusInfo = {
    none: { icon: <Mic className='h-5 w-5 text-gray-400' />, text: 'Sin voz clonada', color: 'text-gray-500' },
    pending: { icon: <Clock className='h-5 w-5 text-amber-500 animate-pulse' />, text: 'Clonando tu voz...', color: 'text-amber-600' },
    ready: { icon: <CheckCircle className='h-5 w-5 text-green-500' />, text: '¡Voz lista!', color: 'text-green-600' },
    error: { icon: <AlertCircle className='h-5 w-5 text-red-500' />, text: 'Error en la clonación', color: 'text-red-600' },
  }[profile.voice_clone_status]

  return (
    <div className='space-y-8'>
      {/* Estado actual */}
      <div className='bg-white rounded-xl border border-gray-200 p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            {statusInfo.icon}
            <div>
              <p className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</p>
              <p className='text-sm text-gray-500'>{profile.samples_count} muestra{profile.samples_count !== 1 ? 's' : ''} guardada{profile.samples_count !== 1 ? 's' : ''}</p>
            </div>
          </div>
          {profile.samples_count > 0 && profile.voice_clone_status !== 'pending' && (
            <Button
              onClick={handleClone}
              disabled={isPending}
              className='bg-purple-500 hover:bg-purple-600 gap-2'
            >
              <Cpu className='h-4 w-4' />
              {profile.has_voice ? 'Re-clonar voz' : 'Clonar mi voz'}
            </Button>
          )}
        </div>
        {profile.voice_clone_status === 'pending' && (
          <p className='mt-3 text-sm text-amber-600 bg-amber-50 rounded-lg p-3'>
            ElevenLabs está procesando tus muestras. Actualizá la página en unos minutos para ver el resultado.
          </p>
        )}
      </div>

      {/* Grabación de muestras */}
      {profile.voice_clone_status !== 'pending' && (
        <div className='space-y-3'>
          <h2 className='font-semibold text-gray-800'>Muestras de voz</h2>
          <p className='text-sm text-gray-500'>
            Grabá al menos 1 minuto de audio. Cuanto más natural y variado sea, mejor será el clon.
            Ideal: contá anécdotas, describí recuerdos, hablá de temas que te gusten.
          </p>
          <VoiceRecorder onUploaded={refresh} />
        </div>
      )}

      {/* Preview (solo si hay voz lista) */}
      {profile.voice_clone_status === 'ready' && (
        <VoicePreview />
      )}
    </div>
  )
}
