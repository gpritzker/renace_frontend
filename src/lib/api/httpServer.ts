import { getHeader } from '@/lib/api/headerServer'

export const httpServer = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const authHeaders = await getHeader()

  const headers = {
    ...authHeaders,
    ...options.headers
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : {}

  if (!response.ok) {
    const message =
      data.error ||
      (Array.isArray(data.errors) ? data.errors.join(', ') : data.errors) ||
      'API request failed'
    throw new Error(message)
  }

  return data
}
