'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Upload, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { uploadVoiceSample } from '@/actions/voice/voice-actions'

interface Props {
  onUploaded: () => void
}

export const VoiceRecorder = ({ onUploaded }: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    chunksRef.current = []
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      setAudioBlob(blob)
      setAudioUrl(URL.createObjectURL(blob))
      stream.getTracks().forEach((t) => t.stop())
    }
    recorder.start()
    mediaRecorderRef.current = recorder
    setIsRecording(true)
    setSeconds(0)
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    setIsRecording(false)
  }

  const handleUpload = async () => {
    if (!audioBlob) return
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob, `muestra_${Date.now()}.webm`)
      await uploadVoiceSample(formData)
      toast.success('Muestra guardada correctamente')
      setAudioBlob(null)
      setAudioUrl(null)
      setSeconds(0)
      onUploaded()
    } catch (e: any) {
      toast.error(e.message || 'Error al subir la muestra')
    } finally {
      setIsUploading(false)
    }
  }

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className='space-y-4'>
      {!audioBlob ? (
        <div className='flex flex-col items-center gap-4 py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300'>
          {isRecording ? (
            <>
              <div className='flex items-center gap-3'>
                <span className='h-3 w-3 rounded-full bg-red-500 animate-pulse' />
                <span className='text-red-600 font-mono text-xl'>{formatTime(seconds)}</span>
              </div>
              <p className='text-sm text-gray-500'>Hablá con naturalidad — contá recuerdos, historias, cómo sos</p>
              <Button
                onClick={stopRecording}
                variant='destructive'
                className='gap-2'
              >
                <Square className='h-4 w-4' />
                Detener grabación
              </Button>
            </>
          ) : (
            <>
              <Mic className='h-12 w-12 text-purple-400' />
              <div className='text-center'>
                <p className='font-medium text-gray-700'>Grabá una muestra de tu voz</p>
                <p className='text-sm text-gray-500 mt-1'>Recomendado: mínimo 1 minuto. Más es mejor.</p>
              </div>
              <Button onClick={startRecording} className='bg-purple-500 hover:bg-purple-600 gap-2'>
                <Mic className='h-4 w-4' />
                Iniciar grabación
              </Button>
            </>
          )}
        </div>
      ) : (
        <div className='bg-white border border-gray-200 rounded-xl p-4 space-y-3'>
          <p className='text-sm font-medium text-gray-700'>
            Grabación de {formatTime(seconds)} — escuchala antes de guardar:
          </p>
          <audio controls src={audioUrl!} className='w-full' />
          <div className='flex gap-2'>
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className='flex-1 bg-[#00a0c6] hover:bg-[#0088a9] gap-2'
            >
              <Upload className='h-4 w-4' />
              {isUploading ? 'Guardando...' : 'Guardar muestra'}
            </Button>
            <Button
              onClick={() => { setAudioBlob(null); setAudioUrl(null) }}
              variant='outline'
              className='gap-2'
            >
              <Trash2 className='h-4 w-4' />
              Descartar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
