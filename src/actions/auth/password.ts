'use server'

import { ENDPOINTS } from '@/constants/apiEndpoints'

export const sendPasswordReset = async (email: string) => {
  const res = await fetch(`${ENDPOINTS.AUTH.LOGIN.replace('/login', '/password')}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ user: { email } })
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.errors?.join(', ') || 'Error al enviar el email')
  }
  return data
}

export const resetPassword = async ({
  token,
  password,
  passwordConfirmation,
}: {
  token: string
  password: string
  passwordConfirmation: string
}) => {
  const res = await fetch(`${ENDPOINTS.AUTH.LOGIN.replace('/login', '/password')}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      user: {
        reset_password_token: token,
        password,
        password_confirmation: passwordConfirmation
      }
    })
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.errors?.join(', ') || 'Error al restablecer la contraseña')
  }
  return data
}
