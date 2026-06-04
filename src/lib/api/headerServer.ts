import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface HeaderServer {
  Accept: string
  'Content-Type': string
  Authorization?: string
}

export const getHeader = async (): Promise<HeaderServer> => {
  const session = await getServerSession(authOptions)
  const headers: HeaderServer = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`
  }
  return headers
}
