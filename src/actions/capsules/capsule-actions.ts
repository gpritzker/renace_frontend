'use server'

import { ENDPOINTS } from '@/constants/apiEndpoints'
import { httpServer } from '@/lib/api/httpServer'
import type { ICapsule } from '@/interface/ICapsule'

export const fetchCapsules = async (): Promise<ICapsule[]> => {
  return httpServer(ENDPOINTS.CAPSULES.LIST, { method: 'GET' })
}

export const createCapsule = async (payload: {
  title: string
  description: string
  open_at?: string
  recipient_email?: string
}): Promise<ICapsule> => {
  return httpServer(ENDPOINTS.CAPSULES.CREATE, {
    method: 'POST',
    body: JSON.stringify({ capsule: payload })
  })
}

export const updateCapsule = async (
  id: number,
  payload: { title?: string; description?: string; open_at?: string }
): Promise<ICapsule> => {
  return httpServer(ENDPOINTS.CAPSULES.UPDATE(id), {
    method: 'PATCH',
    body: JSON.stringify({ capsule: payload })
  })
}

export const deleteCapsule = async (id: number): Promise<void> => {
  return httpServer(ENDPOINTS.CAPSULES.DELETE(id), { method: 'DELETE' })
}
