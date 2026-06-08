'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const API_URL = process.env.BASE_URL

export const createCheckoutSession = async (planId: string): Promise<string> => {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${API_URL}/api/v1/billing/checkout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ plan_id: planId }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error al iniciar el pago')
  return data.url
}

export const cancelSubscription = async (): Promise<void> => {
  const session = await getServerSession(authOptions)
  const res = await fetch(`${API_URL}/api/v1/billing/cancel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error al cancelar')
}
