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

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'API request failed')
  }

  return data
}
