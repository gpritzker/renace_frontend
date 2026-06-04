'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Square, Loader2, ChevronDown } from 'lucide-react'

interface Props {
  capsuleId: number
  ownerName: string
  onFinished: () => void
}

type State = 'idle' | 'loading' | 'playing' | 'done'

export const StoryPlayer = ({ capsuleId, ownerName, onFinished }: Props) => {
  const [state, setState] = useState<State>('idle')
  const [storyText, setStoryText] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = async () => {
    if (state === 'playing') {
      audioRef.current?.pause()
      setState('done')
      return
    }

    setState('loading')
    try {
      const res = await fetch(`/api/capsule/${capsuleId}/narrate-story`, { method: 'POST' })
      if (!res.ok) throw new Error('No se pudo generar el relato')

      const text = decodeURIComponent(res.headers.get('X-Story-Text') || '')
      setStoryText(text)

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audioRef.current = audio

      audio.onended = () => {
        setState('done')
        onFinished()
      }
      audio.play()
      setState('playing')
    } catch {
      setState('idle')
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 py-10'>
      {/* Botón principal */}
      <div className='relative'>
        {state === 'playing' && (
          <span className='absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-30' />
        )}
        <button
          onClick={handlePlay}
          disabled={state === 'loading'}
          className='relative h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-[#00a0c6] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center disabled:opacity-60'
        >
          {state === 'loading'
            ? <Loader2 className='h-10 w-10 animate-spin' />
            : state === 'playing'
              ? <Square className='h-10 w-10 fill-current' />
              : <Play className='h-10 w-10 fill-current translate-x-1' />}
        </button>
      </div>

      <div className='text-center space-y-1'>
        {state === 'idle' && (
          <>
            <p className='font-semibold text-gray-700'>Escuchar el relato de {ownerName}</p>
            <p className='text-sm text-gray-400'>Contado con su propia voz</p>
          </>
        )}
        {state === 'loading' && <p className='text-sm text-gray-500'>Generando el relato...</p>}
        {state === 'playing' && <p className='text-sm text-purple-600 animate-pulse'>Reproduciendo...</p>}
        {state === 'done' && <p className='text-sm text-green-600'>Relato terminado</p>}
      </div>

      {/* Texto del relato generado */}
      {storyText && (
        <div className='max-w-lg bg-white/80 rounded-2xl border border-purple-100 px-6 py-4 text-gray-700 text-sm leading-relaxed italic text-center shadow-sm'>
          &ldquo;{storyText}&rdquo;
        </div>
      )}

      {/* Botón para ir al chat */}
      {state === 'done' && (
        <button
          onClick={onFinished}
          className='flex items-center gap-1 text-sm text-purple-500 hover:text-purple-700 transition-colors'
        >
          Hablar con {ownerName}
          <ChevronDown className='h-4 w-4' />
        </button>
      )}
    </div>
  )
}
