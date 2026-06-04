'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Play, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export const VoicePreview = () => {
  const [text, setText] = useState('Hola, soy yo hablando desde mis recuerdos en Renace. ¡Qué lindo que estés acá!')
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setAudioUrl(null)
    try {
      const res = await fetch('/api/voice/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Error al generar el audio')
      }
      const blob = await res.blob()
      setAudioUrl(URL.createObjectURL(blob))
    } catch (e: any) {
      toast.error(e.message || 'Error al generar la voz')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='space-y-4 bg-purple-50 rounded-xl p-6 border border-purple-100'>
      <h3 className='font-semibold text-purple-800'>Probá tu voz clonada</h3>
      <div>
        <Label className='text-sm text-gray-600'>Texto para generar</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='mt-1.5 min-h-[80px]'
          placeholder='Escribí algo que quieras escuchar con tu voz...'
        />
      </div>
      <Button
        onClick={handleGenerate}
        disabled={isLoading || !text.trim()}
        className='bg-purple-500 hover:bg-purple-600 gap-2'
      >
        {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Play className='h-4 w-4' />}
        {isLoading ? 'Generando...' : 'Escuchar con mi voz'}
      </Button>
      {audioUrl && (
        <div>
          <p className='text-xs text-gray-500 mb-1'>Resultado:</p>
          <audio controls autoPlay src={audioUrl} className='w-full' />
        </div>
      )}
    </div>
  )
}
