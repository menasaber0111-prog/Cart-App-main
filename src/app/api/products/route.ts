// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // This runs on the server - user can't see this URL
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const products = await res.json();

  // Return the data to the client
  return NextResponse.json(products);
}