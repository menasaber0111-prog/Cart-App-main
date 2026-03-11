// src/app/api/cart/route.ts
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function addToCart(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token?.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const res = await fetch(`${process.env.API}/cart`, {
      method: 'POST',
      headers: {
        token: token.token as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: body.productId,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to add product' },
        { status: res.status }
      )
    }

    return NextResponse.json(data)

  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}