import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const PROTECTED_ROUTES = ['/account', '/my-capsules', '/create-capsule', '/my-voice']

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isProtected = PROTECTED_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/account/:path*', '/my-capsules/:path*', '/create-capsule/:path*', '/my-voice/:path*']
}
