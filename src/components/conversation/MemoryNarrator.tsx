'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Square, Loader2 } from 'lucide-react'

interface Props {
  capsuleId: number
  text: string
}

export const MemoryNarrator = ({ capsuleId, text }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = async () => {
    // Si ya hay audio cargado, play/pause
    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        audio.play()
        setIsPlaying(true)
      }
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`/api/capsule/${capsuleId}/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error('Error al generar audio')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const newAudio = new Audio(url)
      newAudio.onended = () => setIsPlaying(false)
      newAudio.play()
      setAudio(newAudio)
      setIsPlaying(true)
    } catch {
      // silently fail
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handlePlay}
      disabled={isLoading}
      className='h-8 w-8 p-0 text-purple-400 hover:text-purple-600 hover:bg-purple-50 flex-shrink-0'
      title='Escuchar con la voz del autor'
    >
      {isLoading
        ? <Loader2 className='h-4 w-4 animate-spin' />
        : isPlaying
          ? <Square className='h-4 w-4 fill-current' />
          : <Play className='h-4 w-4 fill-current' />}
    </Button>
  )
}
