'use server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

interface UpdateCartItemParams {
  productId: string
  count: number
}

export async function updateCartItem(
  req: NextRequest,
  { productId, count }: UpdateCartItemParams
) {
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
      method: 'PUT',
      headers: {
        token: token.token as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ count }),
      cache: 'no-store'
    })

    const payload = await resp.json()

    if (!resp.ok) {
      return { error: payload.message || 'Failed to update cart item' }
    }

    console.log('Update cart item response:', payload)
    return payload

  } catch (error: any) {
    console.error('Error updating cart item:', error.message)
    return { error: error.message || 'Something went wrong while updating cart item' }
  }
}