'use server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function clearCart(req: NextRequest) {
  // جلب التوكن من NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return { error: 'Unauthorized: User not logged in' }
  }

  try {
    const resp = await fetch(`${process.env.API}/cart`, {
      method: 'DELETE',
      headers: {
        token: token.token as string,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const data = await resp.json()

    if (!resp.ok) {
      return { error: data.message || 'Failed to clear cart' }
    }

    console.log('Clear cart response:', data)
    return data

  } catch (error: any) {
    console.error('Error clearing cart:', error.message)
    return { error: error.message || 'Something went wrong while clearing cart' }
  }
}