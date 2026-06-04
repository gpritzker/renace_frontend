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
        try {
          const res = await fetch(`${process.env.BASE_URL}/login`, {
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
