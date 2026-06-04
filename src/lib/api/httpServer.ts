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
    throw new Error(data.error || 'API request failed')
  }

  return data
}
