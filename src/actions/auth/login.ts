'use server'

import { ENDPOINTS } from '@/constants/apiEndpoints'
import { getHeader } from '@/lib/api/headerServer'

export const notifyBackendLogout = async () => {
  try {
    const headers = await getHeader()
    await fetch(ENDPOINTS.AUTH.LOGOUT, { method: 'DELETE', headers })
  } catch {
    // logout best-effort: si falla no bloqueamos al usuario
  }
}
