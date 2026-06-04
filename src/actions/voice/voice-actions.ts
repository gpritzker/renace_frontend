'use server'

import { getHeader } from '@/lib/api/headerServer'

const BASE = `${process.env.BASE_URL}/api/v1`

export const fetchVoiceProfile = async () => {
  const headers = await getHeader()
  const res = await fetch(`${BASE}/voice_profile`, { headers })
  if (!res.ok) throw new Error('No se pudo obtener el perfil de voz')
  return res.json() as Promise<{
    has_voice: boolean
    voice_clone_status: 'none' | 'pending' | 'ready' | 'error'
    samples_count: number
  }>
}

export const uploadVoiceSample = async (formData: FormData) => {
  const headers = await getHeader()
  // Content-Type lo pone el browser automáticamente para multipart
  const { 'Content-Type': _, ...headersWithoutContentType } = headers as any
  const res = await fetch(`${BASE}/voice_samples`, {
    method: 'POST',
    headers: headersWithoutContentType,
    body: formData
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.errors?.join(', ') || 'Error al subir la muestra')
  }
  return res.json()
}

export const deleteVoiceSample = async (id: number) => {
  const headers = await getHeader()
  const res = await fetch(`${BASE}/voice_samples/${id}`, { method: 'DELETE', headers })
  if (!res.ok) throw new Error('Error al eliminar la muestra')
}

export const startVoiceCloning = async () => {
  const headers = await getHeader()
  const res = await fetch(`${BASE}/voice_profile/clone`, { method: 'POST', headers })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error al iniciar la clonación')
  }
  return res.json()
}

