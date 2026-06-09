'use client'

import { useState, useRef, useTransition } from 'react'
import { toast } from 'sonner'
import { Trash2, Loader2, FileImage, FileVideo, Music, Upload } from 'lucide-react'
import { deleteMemory } from '@/actions/memories/memory-actions'
import type { IMemory } from '@/interface/IMemory'

interface Props {
  capsuleId: number
  initialMemories: IMemory[]
}

const MEDIA_ICON = { image: FileImage, video: FileVideo, audio: Music }

export const MemoriesManager = ({ capsuleId, initialMemories }: Props) => {
  const [memories, setMemories] = useState(
    initialMemories.filter((m) => m.memory_type !== 'text')
  )
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDelete = (id: number) => {
    startTransition(async () => {
      try {
        await deleteMemory(id, capsuleId)
        setMemories((prev) => prev.filter((m) => m.id !== id))
        toast.success('Eliminado')
      } catch {
        toast.error('No se pudo eliminar')
      }
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    let memoryType: 'image' | 'video' | 'audio' = 'image'
    if (file.type.startsWith('video/')) memoryType = 'video'
    else if (file.type.startsWith('audio/')) memoryType = 'audio'

    const formData = new FormData()
    formData.append('memory[capsule_id]', String(capsuleId))
    formData.append('memory[memory_type]', memoryType)
    formData.append('memory[file]', file)

    setUploading(true)
    try {
      const res = await fetch('/api/memories', { method: 'POST', body: formData })
      if (!res.ok) throw new Error()
      const created: IMemory = await res.json()
      setMemories((prev) => [...prev, created])
      toast.success('Archivo subido')
    } catch {
      toast.error('Error al subir el archivo')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <FileImage className="h-5 w-5 text-cyan-500" />
        <h2 className="font-semibold text-gray-800">Fotos, videos y audios</h2>
      </div>
      <p className="text-xs text-gray-400">
        Se muestran como complemento cuando el destinatario abra la cápsula.
      </p>

      {memories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {memories.map((m) => {
            const Icon = MEDIA_ICON[m.memory_type as keyof typeof MEDIA_ICON] ?? FileImage
            return (
              <div
                key={m.id}
                className="relative group rounded-xl overflow-hidden border border-gray-100 bg-gray-50 aspect-square flex items-center justify-center"
              >
                {m.memory_type === 'image' && m.s3_url ? (
                  <img src={m.s3_url} alt="" className="w-full h-full object-cover" />
                ) : m.memory_type === 'video' && m.s3_url ? (
                  <video src={m.s3_url} className="w-full h-full object-cover" muted />
                ) : (
                  <Icon className="h-10 w-10 text-gray-300" />
                )}
                <button
                  onClick={() => handleDelete(m.id)}
                  disabled={isPending}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <span className="absolute bottom-2 left-2 text-xs bg-black/40 text-white px-1.5 py-0.5 rounded capitalize">
                  {m.memory_type}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {memories.length === 0 && (
        <p className="text-sm text-gray-400 italic py-2">Todavía no subiste ningún archivo.</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,audio/*"
        className="hidden"
        onChange={handleFileUpload}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-sm text-cyan-600 hover:text-cyan-800 transition-colors"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? 'Subiendo...' : 'Subir foto, video o audio'}
      </button>
    </div>
  )
}
