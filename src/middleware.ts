import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PROTECTED_ROUTES = ['/account', '/my-capsules', '/create-capsule', '/my-voice']

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })
    const isProtected = PROTECTED_ROUTES.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    )
    if (!token && isProtected) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch {
    // Si NEXTAUTH_SECRET no está, dejamos pasar — el server action fallará con 401
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/my-capsules/:path*', '/create-capsule/:path*', '/my-voice/:path*']
}
