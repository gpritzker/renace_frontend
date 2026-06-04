import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        const loginUrl = `${process.env.BASE_URL}/login`
        console.log('[AUTH] BASE_URL:', process.env.BASE_URL)
        console.log('[AUTH] Login URL:', loginUrl)
        try {
          const res = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: { email: credentials?.email, password: credentials?.password }
            })
          })
          console.log('[AUTH] Response status:', res.status)
          const data = await res.json()
          console.log('[AUTH] Response keys:', Object.keys(data))
          console.log('[AUTH] Has token:', !!data.token, '| res.ok:', res.ok)
          if (res.ok && data.token) {
            return { id: String(data.data.id), email: data.data.email, accessToken: data.token }
          }
          console.error('[AUTH] Login failed - data:', JSON.stringify(data))
          return null
        } catch (e) {
          console.error('[AUTH] Exception:', e)
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.accessToken = (user as any).accessToken
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}
