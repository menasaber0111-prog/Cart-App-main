'use server'
import { shipping } from "@/types/cart-response"
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function payOnlineOrder(req: NextRequest, cartId: string, shippingAddress: shipping) {
  // جلب التوكن من NextAuth
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return { error: 'Unauthorized: User not logged in' }
  }

  try {
    const resp = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: 'POST',
        headers: {
          token: token.token as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shippingAddress }),
        cache: 'no-store'
      }
    )

    const payload = await resp.json()

    if (!resp.ok) {
      return { error: payload.message || 'Failed to create checkout session' }
    }

    console.log('Pay online order response:', payload)
    return payload

  } catch (error: any) {
    console.error('Error creating online order:', error.message)
    return { error: error.message || 'Something went wrong while creating online order' }
  }
}