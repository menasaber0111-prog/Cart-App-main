'use server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function deleteCartItem(req: NextRequest, productId: string) {
  // جلب التوكن من NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return { error: 'Unauthorized: User not logged in' }
  }

  try {
    const resp = await fetch(`${process.env.API}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        token: token.token as string,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    const data = await resp.json()

    if (!resp.ok) {
      return { error: data.message || 'Failed to delete cart item' }
    }

    console.log('Delete cart item response:', data)
    return data

  } catch (error: any) {
    console.error('Error deleting cart item:', error.message)
    return { error: error.message || 'Something went wrong while deleting cart item' }
  }
}