'use server'

import { ENDPOINTS } from '@/constants/apiEndpoints'

export const register = async ({
  email,
  password,
  passwordConfirmation,
  firstName,
  lastName,
  dni,
  birthDate,
  phone,
}: {
  email: string
  password: string
  passwordConfirmation: string
  firstName: string
  lastName: string
  dni?: string
  birthDate?: string
  phone?: string
}) => {
  const res = await fetch(ENDPOINTS.AUTH.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName,
        dni,
        birth_date: birthDate,
        phone,
      }
    })
  })

  const data = await res.json()

  if (!res.ok) {
    const message =
      data.errors?.join(', ') ||
      data.error ||
      data.status?.errors?.join(', ') ||
      'Error al registrarse'
    throw new Error(message)
  }

  return data
}
