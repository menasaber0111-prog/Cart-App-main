// src/app/api/cart/route.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the token from the secure cookie
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if user is authenticated
  if (!token?.token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Make authenticated request to your backend
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: {
      token: token.token as string,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}