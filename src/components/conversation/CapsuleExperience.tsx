'use client'

import { useState, useRef } from 'react'
import { CapsuleChat } from './CapsuleChat'
import { Play, Square, Loader2, MessageCircle } from 'lucide-react'

interface Memory { id: number; content: string }
interface Capsule {
  id: number
  title: string
  description: string
  has_voice: boolean
  owner_name: string
  memories: Memory[]
}

export const CapsuleExperience = ({ capsule }: { capsule: Capsule }) => {
  const [audioState, setAudioState] = useState<'idle' | 'loading' | 'playing'>('idle')
  const [showChat, setShowChat] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const chatRef = useRef<HTMLDivElement>(null)

  // Arma el texto completo: descripción + memorias
  const fullText = [
    capsule.description,
    ...capsule.memories.map((m) => m.content)
  ].filter(Boolean).join('. ')

  const handlePlay = async () => {
    if (audioState === 'playing') {
      audioRef.current?.pause()
      setAudioState('idle')
      return
    }

    setAudioState('loading')
    try {
      const res = await fetch(`/api/capsule/${capsule.id}/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fullText })
      })
      if (!res.ok) throw new Error()

      const blob = await res.blob()
      const audio = new Audio(URL.createObjectURL(blob))
      audioRef.current = audio
      audio.onended = () => {
        setAudioState('idle')
        setShowChat(true)
        setTimeout(() => chatRef.current?.scrollIntoView({ behavior: 'smooth' }), 150)
      }
      audio.play()
      setAudioState('playing')
    } catch {
      setAudioState('idle')
    }
  }

  return (
    <div className='space-y-8'>

      {/* Tarjeta del recuerdo con botón de voz */}
      <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm'>
        {/* Descripción / contenido */}
        <div className='p-6'>
          <p className='text-gray-700 leading-relaxed text-base'>{capsule.description}</p>
          {capsule.memories.map((m) => (
            <p key={m.id} className='mt-3 text-gray-700 leading-relaxed text-base'>{m.content}</p>
          ))}
        </div>

        {/* Barra inferior con botón de escuchar */}
        {capsule.has_voice && (
          <div className='border-t border-gray-100 px-6 py-4 bg-purple-50 flex items-center gap-4'>
            <button
              onClick={handlePlay}
              disabled={audioState === 'loading'}
              className='flex items-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors'
            >
              {audioState === 'loading' && <Loader2 className='h-4 w-4 animate-spin' />}
              {audioState === 'playing' && <Square className='h-4 w-4 fill-current' />}
              {audioState === 'idle' && <Play className='h-4 w-4 fill-current' />}
              {audioState === 'loading' ? 'Cargando...' : audioState === 'playing' ? 'Detener' : `Escuchar a ${capsule.owner_name}`}
            </button>
            {audioState === 'playing' && (
              <span className='text-xs text-purple-500 animate-pulse'>Reproduciendo...</span>
            )}
          </div>
        )}
      </div>

      {/* Chat — aparece después de escuchar o con botón para saltear */}
      {!showChat && capsule.has_voice && (
        <div className='text-center'>
          <button
            onClick={() => setShowChat(true)}
            className='text-sm text-gray-400 hover:text-purple-500 transition-colors underline underline-offset-2'
          >
            Hablá con {capsule.owner_name} →
          </button>
        </div>
      )}

      {showChat && (
        <section ref={chatRef} className='space-y-3'>
          <div className='flex items-center gap-2'>
            <MessageCircle className='h-5 w-5 text-[#00a0c6]' />
            <h2 className='text-xl font-semibold text-gray-800'>Hablá con {capsule.owner_name}</h2>
          </div>
          <CapsuleChat capsuleId={capsule.id} ownerName={capsule.owner_name} />
        </section>
      )}
    </div>
  )
}
