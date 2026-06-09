'use server'

import { revalidatePath } from 'next/cache'
import { ENDPOINTS } from '@/constants/apiEndpoints'
import { httpServer } from '@/lib/api/httpServer'
import type { IMemory } from '@/interface/IMemory'

export const fetchMemories = async (capsuleId: number): Promise<IMemory[]> => {
  const all = await httpServer(`${ENDPOINTS.MEMORIES.LIST}?capsule_id=${capsuleId}`, { method: 'GET' })
  return (all as IMemory[]).filter((m) => m.memory_type !== 'text')
}

export const deleteMemory = async (id: number, capsuleId?: number): Promise<void> => {
  await httpServer(ENDPOINTS.MEMORIES.DELETE(id), { method: 'DELETE' })
  if (capsuleId) revalidatePath(`/capsule/${capsuleId}`)
}
