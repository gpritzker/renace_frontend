import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const getHeader = async (): Promise<Record<string, string>> => {
  const session = await getServerSession(authOptions)
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (session?.accessToken) {
    headers['Authorization'] = `Bearer ${session.accessToken}`
  }
  return headers
}
