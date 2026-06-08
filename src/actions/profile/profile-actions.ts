'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ENDPOINTS } from '@/constants/apiEndpoints'

export interface IUserProfile {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  dni: string | null
  birth_date: string | null
  phone: string | null
  premium: boolean | null
  created_at: string
}

export const getProfile = async (): Promise<IUserProfile> => {
  const session = await getServerSession(authOptions)
  const res = await fetch(ENDPOINTS.PROFILE.SHOW, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('No se pudo obtener el perfil')
  const data = await res.json()
  return data.data
}

export const updateProfile = async (fields: {
  first_name?: string
  last_name?: string
  dni?: string
  birth_date?: string
  phone?: string
}): Promise<IUserProfile> => {
  const session = await getServerSession(authOptions)
  const res = await fetch(ENDPOINTS.PROFILE.UPDATE, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user: fields }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.errors?.join(', ') || 'Error al guardar')
  }
  return data.data
}
