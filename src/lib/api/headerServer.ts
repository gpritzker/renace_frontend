import { cookies } from 'next/headers'
interface HeaderServer {
  Accept: string
  'Content-Type': string
  'Api-Key': string
  'Auth-Token'?: string
}
export const getHeader = async (): Promise<HeaderServer> => {
  const store = await cookies()
  const accessToken = store.get('accessToken')?.value
  const headers: HeaderServer = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Api-Key': process.env.API_KEY || ''
  }
  if (accessToken) {
    headers['Auth-Token'] = accessToken
  }
  return headers
}
