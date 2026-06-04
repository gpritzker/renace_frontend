'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2, Volume2, Bot, User } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
}

interface Props {
  capsuleId: number
  ownerName: string
}

export const CapsuleChat = ({ capsuleId, ownerName }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `¡Hola! Soy ${ownerName}. Podés preguntarme lo que quieras sobre mis recuerdos.`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const message = input.trim()
    if (!message || isLoading) return

    const userMsg: Message = { role: 'user', content: message }
    const history = messages.map(({ role, content }) => ({ role, content }))

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)
    // Throttle: 4s entre mensajes
    setCooldown(4)
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) { clearInterval(cooldownRef.current!); return 0 }
        return c - 1
      })
    }, 1000)

    try {
      const res = await fetch(`/api/capsule/${capsuleId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al obtener respuesta')
      }

      const botText: string = data.text || '...'
      let audioUrl: string | undefined

      if (data.audio_base64) {
        const binary = atob(data.audio_base64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
        const blob = new Blob([bytes], { type: 'audio/mpeg' })
        audioUrl = URL.createObjectURL(blob)
        new Audio(audioUrl).play().catch(() => {})
      }

      const assistantMsg: Message = { role: 'assistant', content: botText, audioUrl }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (e: any) {
      const isRateLimit = e.message?.includes('429')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isRateLimit
            ? 'Muchas consultas al mismo tiempo, esperá unos segundos y volvé a intentarlo.'
            : 'Lo siento, no pude responder ahora. Intentá de nuevo.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col h-[520px] bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-purple-500 to-[#00a0c6] text-white'>
        <div className='h-10 w-10 rounded-full bg-white/20 flex items-center justify-center'>
          <Bot className='h-5 w-5' />
        </div>
        <div>
          <p className='font-semibold'>{ownerName}</p>
          <p className='text-xs text-white/80'>IA conversacional · responde con su voz</p>
        </div>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`h-8 w-8 flex-shrink-0 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-purple-100' : 'bg-gradient-to-br from-purple-400 to-[#00a0c6]'}`}>
              {msg.role === 'user'
                ? <User className='h-4 w-4 text-purple-600' />
                : <Bot className='h-4 w-4 text-white' />}
            </div>
            <div className={`max-w-[75%] space-y-1`}>
              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-500 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                {msg.content}
              </div>
              {msg.audioUrl && (
                <button
                  onClick={() => new Audio(msg.audioUrl!).play()}
                  className='flex items-center gap-1 text-xs text-gray-400 hover:text-purple-500 transition-colors'
                >
                  <Volume2 className='h-3 w-3' />
                  Reproducir de nuevo
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className='flex gap-3'>
            <div className='h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-[#00a0c6] flex items-center justify-center'>
              <Bot className='h-4 w-4 text-white' />
            </div>
            <div className='bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3'>
              <div className='flex gap-1'>
                <span className='h-2 w-2 rounded-full bg-gray-400 animate-bounce' style={{ animationDelay: '0ms' }} />
                <span className='h-2 w-2 rounded-full bg-gray-400 animate-bounce' style={{ animationDelay: '150ms' }} />
                <span className='h-2 w-2 rounded-full bg-gray-400 animate-bounce' style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className='px-4 py-3 border-t border-gray-100'>
        <div className='flex gap-2'>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Preguntale algo a ${ownerName}...`}
            className='flex-1 rounded-full border-gray-200 focus-visible:ring-purple-400'
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || cooldown > 0}
            size='icon'
            className='rounded-full bg-purple-500 hover:bg-purple-600 flex-shrink-0'
            title={cooldown > 0 ? `Esperá ${cooldown}s` : ''}
          >
            {isLoading
              ? <Loader2 className='h-4 w-4 animate-spin' />
              : cooldown > 0
                ? <span className='text-xs font-bold'>{cooldown}</span>
                : <Send className='h-4 w-4' />}
          </Button>
        </div>
      </div>
    </div>
  )
}
