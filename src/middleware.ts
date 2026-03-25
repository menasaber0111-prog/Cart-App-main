// src/middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/login' || pathname === '/register'

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/brands', '/categories', '/login', '/register'],
}