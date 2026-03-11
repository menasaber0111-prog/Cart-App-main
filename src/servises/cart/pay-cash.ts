'use server'
import { shipping } from "@/types/cart-response"
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function payCashOrder(req: NextRequest, cartId: string, shippingAddress: shipping) {
  // جلب التوكن من NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return { error: 'Unauthorized: User not logged in' }
  }

  try {
    const resp = await fetch(`${process.env.API}/orders/${cartId}`, {
      method: 'POST',
      headers: {
        token: token.token as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shippingAddress }),
      cache: 'no-store'
    })

    const payload = await resp.json()

    if (!resp.ok) {
      return { error: payload.message || 'Failed to place cash order' }
    }

    console.log('Pay cash order response:', payload)
    return payload

  } catch (error: any) {
    console.error('Error placing cash order:', error.message)
    return { error: error.message || 'Something went wrong while placing cash order' }
  }
}