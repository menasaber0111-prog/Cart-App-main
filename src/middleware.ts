// src/middleware.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {

  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === '/login' || pathname === '/register'

  // لو المستخدم عامل login وفتح login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  // لو مش عامل login وحاول يدخل صفحة محمية
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products', '/brands', '/categories', '/login', '/register'],
}