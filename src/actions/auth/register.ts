'use server'

import { ENDPOINTS } from '@/constants/apiEndpoints'
import { httpServer } from '@/lib/api/httpServer'

export const register = async ({
  email,
  password,
  passwordConfirmation,
}: {
  email: string
  password: string
  passwordConfirmation: string
}) => {
  try {
    return await httpServer(ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({
        user: { email, password, password_confirmation: passwordConfirmation }
      })
    })
  } catch {
    throw new Error('Error al registrarse')
  }
}
