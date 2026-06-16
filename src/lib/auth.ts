import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

if (!process.env.BASE_URL) {
  throw new Error('BASE_URL env var is required')
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET env var is required')
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        const loginUrl = `${process.env.BASE_URL}/login`
        try {
          const res = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user: { email: credentials?.email, password: credentials?.password }
            })
          })
          const data = await res.json()
          if (res.ok && data.token) {
            return { id: String(data.data.id), email: data.data.email, accessToken: data.token }
          }
          return null
        } catch {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.accessToken = (user as { accessToken?: string }).accessToken
      return token
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60  // 24h — mismo TTL que el JWT de Rails
  }
}
