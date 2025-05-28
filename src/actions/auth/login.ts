'use server'

import { cookies } from 'next/headers'
import { ENDPOINTS } from '@/constants/apiEndpoints'
import { httpServer } from '@/lib/api/httpServer'

export const login = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  try {
    const data = await httpServer(`${ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    const store = await cookies()
    store.set('accessToken', data.token)
    return data
  } catch (e) {
    throw new Error('Error al iniciar sesión')
  }
}

export const logout = async () => {
  try {
    await httpServer(ENDPOINTS.AUTH.LOGOUT, {
      method: 'GET'
    })
    const store = await cookies()
    store.delete('accessToken')
  } catch (e) {
    throw new Error('Error al cerrar sesión')
  }
}
